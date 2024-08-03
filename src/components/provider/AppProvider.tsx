/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useEffect, useState } from "react";
import { MemberPUB } from "../../types/types";
import Cookies from "universal-cookie";
import { getData, getHistory } from "../../utils/db/connect";
import { toast } from "react-toastify";
import { defaultSettings } from "../../utils/toastConfig";

// Define the shape of the context
export interface AppContextType {
  t: Date;
  data: MemberPUB[];
  filteredData: MemberPUB[];
  handlePrayerTime: (time: React.ChangeEvent<HTMLSelectElement>) => void;
  setDormitory: (dormitory: string) => void;
  dormitory: string;
  fetchData: () => void;
  fetchDataHistory: () => void;
  showIsAdmin: boolean;
  isLoading: boolean;
  setMenu: (value: number) => void;
  menu: number;
  setDate: (date: number) => void;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  histories: MemberPUB[];
  selectedPrayerTime: string;
  dormitories: string[];
  prayerTimeList: string[];
  isOnline: boolean;
}

// Create context with default values
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Define provider component
const AppProvider = ({ children }: { children: ReactNode }) => {
  const t = new Date();
  const [data, setData] = useState<MemberPUB[]>([]);
  const [filteredData, setFilteredData] = useState<MemberPUB[]>([]);
  const [histories, setHistories] = useState<MemberPUB[]>([]);
  const [date, setDate] = useState<number>(t.getDate());
  const [month, setMonth] = useState<number>(t.getMonth() + 1);
  const [year, setYear] = useState<number>(t.getFullYear());
  const [menu, setMenu] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPrayerTime, setSelectedPrayerTime] =
    useState<string>("Shubuh");
  const [dormitory, setDormitory] = useState<string>("Asrama Ikhwan");
  const prayerTimeList = ["Shubuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];

  const dormitories: string[] = [
    "Asrama Ikhwan",
    "Asrama Putra",
    "Asrama Putri",
    "Asrama Baru",
  ];

  const cookies = new Cookies();
  const showIsAdmin: boolean = JSON.parse(cookies.get("loggedIn") || "false");
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    localStorage.setItem("statusOnOff", JSON.stringify(isOnline));
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handlePrayerTime = (time: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrayerTime(time.target.value);
  };

  const fetchData = () => {
    setIsLoading(true);
    getData()
      .then((response) => {
        if (response.hasChildren()) {
          setData(response.val());
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const fetchDataHistory = async () => {
    setIsLoading(true);
    await getHistory(
      encodeURIComponent(dormitory),
      selectedPrayerTime,
      year,
      month,
      date
    )
      .then((data) => {
        setHistories(data.val());
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (isOnline) fetchData();
    else toast.error("Gagal fetch data", defaultSettings);
  }, [isOnline]);

  useEffect(() => {
    const dataFiltered =
      data &&
      data.filter((item) => {
        if (item.dormitory === dormitory) return item;
      });
    setFilteredData(dataFiltered);
  }, [data, dormitory]);

  useEffect(() => {
    if (isOnline) fetchDataHistory();
    else toast.error("Gagal fetch history", defaultSettings);
  }, [dormitory, date, selectedPrayerTime]);

  // declaration object
  document.title = import.meta.env.VITE_APP_NAME;

  return (
    <AppContext.Provider
      value={{
        t,
        data,
        filteredData,
        handlePrayerTime,
        setDormitory,
        dormitory,
        fetchData,
        fetchDataHistory,
        showIsAdmin,
        isLoading,
        menu,
        setMenu,
        setDate,
        setMonth,
        setYear,
        histories,
        selectedPrayerTime,
        dormitories,
        prayerTimeList,
        isOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
