/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { getData, getHistory } from "./utils/db/connect";
import { useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Cookies from "universal-cookie";
import { MemberPUB } from "./types/MemberPUB";
import { defaultSettings } from "./utils/toastConfig";

export default function App() {
  const t = new Date();
  const [data, setData] = useState<MemberPUB[]>([]);
  const [histories, setHistories] = useState<MemberPUB[]>([]);
  const [date, setDate] = useState<number>(t.getDate());
  const [month, setMonth] = useState<number>(t.getMonth() + 1);
  const [year, setYear] = useState<number>(t.getFullYear());
  const [filteredData, setFilteredData] = useState<MemberPUB[]>([]);
  const [menu, setMenu] = useState<number>(0);
  const cookies = new Cookies();
  const showIsAdmin : boolean = JSON.parse(cookies.get("loggedIn") || "false");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPrayerTime, setSelectedPrayerTime] =
    useState<string>("Shubuh");
  const [dormitory, setDormitory] = useState<string>("Asrama Ikhwan");

  const dormitories: string[] = [
    "Asrama Ikhwan",
    "Asrama Putra",
    "Asrama Putri",
    "Asrama Baru",
  ];

  // declaration object
  document.title = import.meta.env.VITE_APP_NAME;

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

  const fecthDataHistory = async () => {
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
    fetchData();
  }, [isOnline]);

  useEffect(() => {
    const dataFiltered = data.filter((item) => {
      if (item.dormitory === dormitory) return item;
    });
    setFilteredData(dataFiltered);
  }, [data, dormitory]);

  useEffect(() => {
    fecthDataHistory();
  }, [dormitory, date, selectedPrayerTime]);

  useEffect(()=>{
    !isOnline && toast.error("Anda Offline", defaultSettings)
  })

  return (
    <>
      {/* <h1>{isOnline ? "Online" : "Offline"}</h1> */}
      <NavigationBar isAdmin={showIsAdmin} setMenu={setMenu} menu={menu} />
      <Outlet
        context={[
          handlePrayerTime,
          setDormitory,
          dormitory,
          data,
          filteredData,
          fetchData,
          fecthDataHistory,
          showIsAdmin,
          isLoading,
          menu,
          setDate,
          setMonth,
          setYear,
          histories,
          selectedPrayerTime,
          dormitories,
          t,
        ]}
      />
      <Footer />
      <ToastContainer />
    </>
  );
}
