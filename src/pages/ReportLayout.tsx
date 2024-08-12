import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFLayout from "../components/PDFLayout";
import { Authentication, ListHead, useAppContext } from "../components";
import { MemberPUB, WeekDate } from "../types";
import { useEffect, useState } from "react";
import { getHistory } from "../utils/db/connect";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function generateReport() {
  const pdf = new jsPDF({
    orientation: "landscape",
  });
  autoTable(pdf, {
    html: "#report-table",
    theme: "striped",
    useCss: true,
  });

  const date = Date().split(" ");
  const dateStr = `${date[0]}_${date[1]}_${date[2]}_${date[3]}`;
  pdf.save(`Laporan Absensi Mingguan_${dateStr}.pdf`);
}

const getWeekDates = (startDate: Date): WeekDate[] => {
  const fridayOffset =
    startDate.getDay() >= 5
      ? -(startDate.getDay() - 5)
      : -(startDate.getDay() + 2);
  const friday = new Date(startDate);
  friday.setDate(startDate.getDate() + fridayOffset);

  const weekDates: WeekDate[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(friday);
    currentDate.setDate(friday.getDate() + i);
    weekDates.push({
      day: moment(currentDate).format("dddd"),
      date: parseInt(moment(currentDate).format("D")),
      month: parseInt(moment(currentDate).format("M")),
      year: parseInt(moment(currentDate).format("YYYY")),
      formattedDate: moment(currentDate).format("D MMM"),
    });
  }

  return weekDates;
};

interface PoinMinus {
  idMember: string;
  date: string;
  totalPoint: number;
}

const ReportLayout = () => {
  const { dormitory, datas, prayerTimeList } = useAppContext();
  const [minus, setMinus] = useState<PoinMinus[]>([]);
  const [startDate, setStartDate] = useState<string>(() =>
    moment().format("YYYY-MM-DD")
  );
  const dateOfWeek = getWeekDates(new Date(startDate));

  const fetchData = async () => {
    const newMinus: PoinMinus[] = [];

    const requests = dateOfWeek.flatMap((date) =>
      datas.map(async (item) => {
        for (const prayerTime of prayerTimeList) {
          try {
            const res = await getHistory(
              encodeURIComponent(dormitory),
              prayerTime,
              date.year,
              date.month,
              date.date
            );

            const data = res.val();
            if (data) {
              data.forEach((data: MemberPUB) => {
                if (data.id === item.id && data.alpha === true) {
                  const temp: PoinMinus = {
                    idMember: data.id as string,
                    date: date.formattedDate,
                    totalPoint: 2,
                  };

                  if (
                    !newMinus.some(
                      (entry) =>
                        entry.idMember === data.id &&
                        entry.date === date.formattedDate
                    )
                  ) {
                    newMinus.push(temp);
                  }
                }
              });
            }
          } catch (error) {
            console.error("Error fetching history:", error);
          }
        }
      })
    );

    await Promise.all(requests);

    setMinus(newMinus);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, dateOfWeek, datas, dormitory, prayerTimeList]);

  useEffect(() => {
    console.log("Minus data:", minus);
  }, [minus]);

  return (
    <Authentication>
      <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
        <div className="h-[72vh] rounded-lg bg-white relative py-2">
          <ListHead />
          <div className="h-[58vh] bg-gray-50 px-8 py-8 rounded-xl overflow-y-scroll flex flex-col items-center">
            <div className="flex items-center mb-4">
              <label htmlFor="start-date" className="mr-2">
                Pilih tanggal mulai:
              </label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2"
              />
            </div>
            <button onClick={() => generateReport()}>
              Generate Report
            </button>
            <PDFDownloadLink
              document={
                <PDFLayout
                  datas={datas}
                  dormitory={dormitory}
                  dateOfWeek={dateOfWeek}
                  startDate={startDate}
                  prayerTimeList={prayerTimeList}
                />
              }
              fileName="contoh.pdf"
            >
              {({ loading }) =>
                loading ? "Loading document..." : <button>Download now!</button>
              }
            </PDFDownloadLink>
            <table id="report-table" className="border">
              <thead>
                <tr className="border p-2">
                  <th colSpan={11}>
                    REKAPITULASI POIN MINGGUAN {dormitory.toUpperCase()}
                  </th>
                </tr>
                <tr className="border p-2 text-center">
                  <td rowSpan={2} className="border px-2">
                    NO
                  </td>
                  <td rowSpan={2} className="border px-2">
                    NAMA
                  </td>
                  <td rowSpan={2} className="border px-2 w-4">
                    MINUS SEBELUMNYA
                  </td>
                  <td colSpan={7} className="border px-2">
                    MINUS MINGGU INI
                  </td>
                  <td rowSpan={2} className="border px-2">
                    TOTAL
                  </td>
                </tr>
                <tr className="border p-2">
                  {dateOfWeek.map((date, index) => (
                    <td
                      key={index}
                      className={`border p-2 ${
                        date.day === moment().format("dddd") &&
                        "font-bold underline text-lg"
                      }`}
                    >
                      {date.formattedDate}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datas != null &&
                  datas
                    .filter((item) => item.dormitory === dormitory)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item, i) => {
                      const totalPoints = minus
                        .filter((data) => data.idMember === item.id)
                        .reduce((acc, data) => acc + data.totalPoint, 0);

                      return (
                        <tr key={i} className="border p-2 text-center">
                          <td className="border p-2">{i + 1}</td>
                          <td className="text-left border p-2">{item.name}</td>
                          <td className="border p-2">
                            {10 - (item.point as number)}
                          </td>
                          {dateOfWeek.map((date, index) => {
                            const dailyPoints = minus
                              .filter(
                                (data) =>
                                  data.idMember === item.id &&
                                  data.date === date.formattedDate
                              )
                              .reduce((acc, data) => acc + data.totalPoint, 0);

                            return (
                              <td
                                key={index}
                                className={`border p-2 ${
                                  date.day === moment().format("dddd") &&
                                  "font-bold text-lg bg-white"
                                }`}
                              >
                                {dailyPoints || 0}
                              </td>
                            );
                          })}
                          <td className="border p-2">{totalPoints}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Authentication>
  );
};

export default ReportLayout;
