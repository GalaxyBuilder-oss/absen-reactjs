import ListHead from "../components/ListHead";
import { generateReport } from "../utils/generateReportPdf";
import moment from "moment";
import {PDFDownloadLink} from "@react-pdf/renderer"
import PDFLayout from "../components/PDFLayout";
import { useAppContext } from "../components/provider/useAppContext";

const ReportLayout = () => {
  const {handlePrayerTime, setDormitory, dormitory, data}= useAppContext();
  const date = (value: number) => {
    return (
      new Date().getDate() - (value ? value : 0) + " " + moment().format("MMM")
    );
  };
  return (
    <>
      <ListHead
        dormitory={dormitory}
        onShowTimeClick={handlePrayerTime}
        setDormitory={setDormitory}
      />
      <button onClick={() => generateReport(data)}>Generate Report</button>
      <PDFDownloadLink document={<PDFLayout datas={data} dormitory={dormitory} date={date} />} fileName="contoh.pdf">
      {({ loading }) => (loading ? 'Loading document...' : <button>Download now!</button>)}
      </PDFDownloadLink>
      <table id="report-table">
        <tr className="border p-2">
          <th colSpan={11}>
            REKAPITULASI POIN MINGGUAN {dormitory.toUpperCase()}
          </th>
        </tr>
        <tr className="border p-2">
          <td rowSpan={2} className="border p-2">NO</td>
          <td rowSpan={2} className="border p-2">NAMA</td>
          <td rowSpan={2} className="border p-2">MINUS SEBELUMNYA</td>
          <td colSpan={7} className="border p-2 text-center">MINUS MINGGU INI</td>
          <td rowSpan={2} className="border p-2">TOTAL</td>
        </tr>
        <tr className="border p-2">
          <td className="border p-2">{date(6)}</td>
          <td className="border p-2">{date(5)}</td>
          <td className="border p-2">{date(4)}</td>
          <td className="border p-2">{date(3)}</td>
          <td className="border p-2">{date(2)}</td>
          <td className="border p-2">{date(1)}</td>
          <td className="border p-2">{date(0)}</td>
        </tr>
        {data != null &&
          data
            .filter((item) => item.dormitory === dormitory)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, i) => (
              <tr key={i} className="border p-2">
                <td className="border p-2">{i + 1}</td>
                <td className="text-left border p-2">{item.name}</td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
              </tr>
            ))}
      </table>
    </>
  );
};

export default ReportLayout;
