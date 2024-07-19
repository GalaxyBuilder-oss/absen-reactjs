import { ChangeEventHandler } from "react";
import { MemberPUB } from "./MemberPUB";

export type OutletContextType = [
  // Add the correct types for each context value if needed
  ChangeEventHandler<HTMLSelectElement>,
  () => void,
  string,
  MemberPUB[],
  MemberPUB[],
  () => void,
  () => void,
  boolean, // showIsAdmin
  boolean,
  number,
  (value: string) => void,
  (value: string) => void,
  (value: string) => void,
  MemberPUB[],
  string,
  string[],
  Date
];
