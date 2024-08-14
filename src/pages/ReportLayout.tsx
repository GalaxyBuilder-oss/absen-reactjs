import moment from "moment";
import { Authentication, ListHeadReport, useAppContext } from "../components";
import { MemberPUB, WeekDate } from "../types";
import { useCallback, useEffect, useState } from "react";
import { getHistory, setDBData } from "../utils/db/connect";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";

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
  const { dormitory, datas, filteredDatas, prayerTimeList, fetchData } =
    useAppContext();
  const [minus, setMinus] = useState<PoinMinus[]>([]);
  const [startDate, setStartDate] = useState<string>(() =>
    moment().format("YYYY-MM-DD")
  );
  const dateOfWeek = getWeekDates(new Date(startDate));

  const fetchHistory = useCallback(async () => {
    const newMinus: PoinMinus[] = [];

    const requests = dateOfWeek.flatMap((date) =>
      filteredDatas.map(async (item) => {
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
                let temp: PoinMinus | undefined;
                if (data.id === item.id && (data.alpha || data.late)) {
                  if (data.alpha)
                    temp = {
                      idMember: data.id as string,
                      date: date.formattedDate,
                      totalPoint: 2,
                    };
                  if (data.late)
                    temp = {
                      idMember: data.id as string,
                      date: date.formattedDate,
                      totalPoint: 1,
                    };

                  if (
                    !newMinus.some(
                      (entry) =>
                        entry.idMember === data.id &&
                        entry.date === date.formattedDate
                    ) &&
                    temp !== undefined
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
  }, [dateOfWeek, filteredDatas, dormitory, prayerTimeList]);

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

    datas.forEach((item) => {
      if (item.dormitory === dormitory) {
        minus.forEach((data) => {
          if (item.id === data.idMember)
            item.point = (item.point as number) - data.totalPoint;
        });
      }
    });
    setDBData(datas);
    fetchData();
  }

  useEffect(() => {
    const fetchHistoryAsync = async () => {
      await fetchHistory();
    };
    fetchHistoryAsync();
  }, [fetchHistory]);

  useEffect(() => {
    console.log("Minus data:", minus);
  }, [minus]);

  return (
    <Authentication>
      <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
        <div className="h-[72vh] rounded-lg bg-white relative py-2">
          <div className="flex px-2 py-4 gap-4">
            <Link to="/">&lt;- Back</Link>
          </div>
          <ListHeadReport />
          <div className="h-[58vh] bg-gray-50 px-8 py-8 rounded-xl overflow-y-scroll flex flex-col items-center">
            <div className="w-full flex my-4 items-center gap-4 justify-between">
              <div className="flex items-center">
                <label htmlFor="start-date" className="mr-2">
                  Pilih tanggal mulai:
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-10 sm:w-auto border p-2 rounded-lg"
                />
              </div>
              <button
                className="sm:p-4 border rounded-lg bg-white hover:bg-slate-50 hover:scale-95 shadow hover:shadow-none transition-all"
                onClick={() => generateReport()}
              >
                Buat Laporan
              </button>
            </div>
            <h3 className="m-2">
              Pratinjau Laporan Per {dateOfWeek[0].date} s/d{" "}
              {dateOfWeek[dateOfWeek.length - 1].formattedDate}{" "}
              {moment().format("YYYY")} :
            </h3>
            <div className="block lg:hidden text-center font-mono opacity-50">
              Pratinjau Hanya Muncul Di Layar Laptop 1280 px x 720 Keatas.
              Pratinjau Tidak Tersedia Di Tampilan Hp Atau Tablet.
            </div>
            <table id="report-table" className="border hidden lg:block">
              <thead>
                <tr className="border p-2 text-2xl">
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
                {filteredDatas &&
                  filteredDatas.map((item, i) => {
                    const totalPoints = minus
                      .filter((data) => data.idMember === item.id)
                      .reduce((acc, data) => acc + data.totalPoint, 0);

                    return (
                      <tr
                        key={i}
                        className={`border p-2 text-center ${
                          item.point && item.point < 5 && item.point > 1
                            ? "bg-yellow-300"
                            : item.point && item.point < 2
                            ? "bg-red-600 text-white"
                            : "bg-none"
                        }`}
                      >
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
                                date.day === moment().format("dddd")
                                  ? "font-bold text-lg bg-white text-black"
                                  : item.point &&
                                    item.point < 5 &&
                                    item.point > 1
                                  ? "bg-yellow-300"
                                  : item.point && item.point < 2
                                  ? "bg-red-600 text-white"
                                  : "bg-none"
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
