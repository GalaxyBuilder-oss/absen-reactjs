export enum DORMITORY {
  ASWAN = "Asrama Ikhwan",
  ASTRA = "Asrama Putra",
  ASRI = "Asrama Putri",
  ASBAR = "Asrama Baru",
}

export interface Dormitory {
    id?: number,
    name: string,
    address: string,
    type: 'Akhwat' | 'Ikhwan'
}
