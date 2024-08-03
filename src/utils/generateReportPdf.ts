import jsPDF from "jspdf";
import "jspdf-autotable";
import { MemberPUB } from "../types/types";

const pdf = new jsPDF();

export function generateReport(datas: MemberPUB[]) {

  const tableTitle = "ABSENSI SHOLAT PEMBERDAYAAN UMAT BERKELANJUTAN";
  const tableColumns = ["No", "Name", "Angkatan", "Status", "Closed on"];
  const tableRows: string[][] = [];

  datas.forEach((data, i) => {
    const memberData: string[] = [
      (i + 1).toString(),
      data.name,
      data.generation.name,
      keterangan(data) as string,
    ];
    tableRows.push(memberData);
  });

//   pdf.autoTable(tableColumns, tableRows, { startY: 20 });
  pdf.autoTable({
    html: '#report-table',
    theme: 'striped',
    useCss: true

  })
  const date = Date().split(" ");
  const dateStr = `${date[0]}_${date[1]}_${date[2]}_${date[3]}`;
  pdf.save(`Laporan Absensi Mingguan_${dateStr}.pdf`);
}

const keterangan = (data: MemberPUB) => {
  if (data.alpha) return "Alfa";
  if (data.permit) return "Izin";
  if (data.late) return "Masbuk";
};
