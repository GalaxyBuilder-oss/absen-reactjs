export interface MemberPUB {
  id?: string | null;
  name: string;
  dormitory: string;
  generation: Generation;
  point?: number;
  alpha: boolean;
  late: boolean;
  permit: boolean;
  present: boolean;
}

export interface Generation {
  no: number;
  name: string;
  count: number;
}

export enum DORMITORY {
  ASWAN = "Asrama Ikhwan",
  ASTRA = "Asrama Putra",
  ASRI = "Asrama Putri",
  ASBAR = "Asrama Baru",
}

export enum PRAYERTIMES {
  SHUBUH = "Shubuh",
  DZUHUR = "Dzuhur",
  ASHAR = "Ashar",
  MAGHRIB = "Maghrib",
  ISYA = "Isya",
}
