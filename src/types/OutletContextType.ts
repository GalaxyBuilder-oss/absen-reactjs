import { ChangeEventHandler } from "react";
import { MemberPUB } from "./MemberPUB";

export type OutletContextType = [
  ChangeEventHandler<HTMLSelectElement>, // handlePrayerTime
  () => void, // setDormitory
  string, // dormitory
  MemberPUB[], // data
  MemberPUB[], // filteredData
  () => void, // fetchData
  () => void, // fetchDataHistories
  boolean, // showIsAdmin
  boolean, // isLoading
  number, // menu
  (value: string) => void, // setDate
  (value: string) => void, // setMonth
  (value: string) => void, // setYear
  MemberPUB[], // histories
  string, // selectedPrayerTime
  string[], // dormitories
  Date, // t
];
