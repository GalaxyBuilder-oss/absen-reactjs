import { Document, Page, View } from "@react-pdf/renderer";
import { MemberPUB } from "../types/MemberPUB";
import { ReactNode } from "react";
import { Html } from "react-pdf-html"
import ReactDOMServer from "react-dom/server"

interface PDFLayoutProps {
  datas: MemberPUB[],
  dormitory: string,
  date: (value: number) => ReactNode
}

const PDFLayout: React.FC<PDFLayoutProps> = ({ datas, dormitory, date }) => {
  const html = (
    <table id="report-table" className="text-xs">
      <tr className="border">
        <th colSpan={11}>
          REKAPITULASI POIN MINGGUAN {dormitory.toUpperCase()}
        </th>
      </tr>
      <tr className="border">
        <td rowSpan={2} className="border">
          NO
        </td>
        <td rowSpan={2} className="border">
          NAMA
        </td>
        <td rowSpan={2} className="border">
          MINUS SEBELUMNYA
        </td>
        <td colSpan={7} className="border">
          MINUS MINGGU INI
        </td>
        <td rowSpan={2} className="border">
          TOTAL
        </td>
      </tr>
      <tr className="border">
        <td className="border">{date(6)}</td>
        <td className="border">{date(5)}</td>
        <td className="border">{date(4)}</td>
        <td className="border">{date(3)}</td>
        <td className="border">{date(2)}</td>
        <td className="border">{date(1)}</td>
        <td className="border">{date(0)}</td>
      </tr>
      {datas != null &&
        datas
          .filter((data) => data.dormitory === dormitory)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((data, i) => (
            <tr key={i} className="border">
              <td className="border">{i + 1}</td>
              <td className="text-left border">{data.name}</td>
              <td className="border">0</td>
              <td className="border">0</td>
              <td className="border">0</td>
              <td className="border">0</td>
              <td className="border">0</td>
              <td className="border">0</td>
              <td className="border">0</td>
              <td className="border">0</td>
              <td className="border">0</td>
            </tr>
          ))}
    </table>
  );

  return (
    <Document>
      <Page size={"A4"}>
        <View>
          <Html>
            {ReactDOMServer.renderToStaticMarkup(html)}
          </Html>
        </View>
      </Page>
    </Document>
  );
};

export default PDFLayout;
