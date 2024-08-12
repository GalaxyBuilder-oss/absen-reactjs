import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { MemberPUB, WeekDate } from "../types";
import React, { useEffect, useState } from "react";
import { getHistory } from "../utils/db/connect";

interface PDFLayoutProps {
  datas: MemberPUB[];
  dormitory: string;
  dateOfWeek: WeekDate[];
  startDate: string;
  prayerTimeList: string[];
}

interface PoinMinus {
  idMember: string;
  date: string;
  totalPoint: number;
}

// Mendefinisikan objek style
const styles = StyleSheet.create({
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    margin: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 10,
  },
  cell: {
    padding: 4,
    borderRightWidth: 1,
    borderColor: "#000",
    flexGrow: 1,
  },
  headerText: {
    fontWeight: "bold",
  },
  colSpan: {
    flexGrow: 7,
  },
  bold: {
    fontWeight: "bold",
  },
  underline: {
    textDecoration: "underline",
  },
});

const PDFLayout: React.FC<PDFLayoutProps> = ({
  datas,
  dormitory,
  dateOfWeek,
  startDate,
  prayerTimeList,
}) => {
  const [minus, setMinus] = useState<PoinMinus[]>([]);

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

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={{ padding: 10 }}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerText, styles.colSpan]}>
              REKAPITULASI POIN MINGGUAN {dormitory.toUpperCase()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>NO</Text>
            <Text style={styles.cell}>NAMA</Text>
            <Text style={styles.cell}>MINUS SEBELUMNYA</Text>
            <Text style={styles.cell}>MINUS MINGGU INI</Text>
            {dateOfWeek.map((date, index) => (
              <Text key={index}>{date.formattedDate}</Text>
            ))}
            <Text style={styles.cell}>TOTAL</Text>
          </View>
          {datas
            .filter((item) => item.dormitory === dormitory)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, i) => {
              const totalPoints = minus
                .filter((data) => data.idMember === item.id)
                .reduce((acc, data) => acc + data.totalPoint, 0);

              return (
                <View key={i} style={styles.row}>
                  <Text style={styles.cell}>{i + 1}</Text>
                  <Text style={styles.cell}>{item.name}</Text>
                  <Text style={styles.cell}>{10 - (item.point as number)}</Text>
                  {dateOfWeek.map((date, index) => {
                    const dailyPoints = minus
                      .filter(
                        (data) =>
                          data.idMember === item.id &&
                          data.date === date.formattedDate
                      )
                      .reduce((acc, data) => acc + data.totalPoint, 0);

                    return <Text key={index}>{dailyPoints || 0}</Text>;
                  })}
                  <Text style={styles.cell}>{totalPoints}</Text>
                </View>
              );
            })}
        </View>
      </Page>
    </Document>
  );
};

export default PDFLayout;
