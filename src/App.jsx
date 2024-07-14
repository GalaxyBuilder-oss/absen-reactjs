/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { getData, getHistory } from "./utils/db/connect";
import { useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function App() {
  const t = new Date();
  const [data, setData] = useState([]);
  const [histories, setHistories] = useState([]);
  const [date, setDate] = useState(t.getDate());
  const [month, setMonth] = useState(t.getMonth() + 1);
  const [year, setYear] = useState(t.getFullYear());
  const [filteredData, setFilteredData] = useState([]);
  const [menu, setMenu] = useState(0);
  const showIsAdmin = JSON.parse(localStorage.getItem("loggedIn"));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrayerTime, setSelectedPrayerTime] = useState("Shubuh");
  const [dormitory, setDormitory] = useState("Asrama Ikhwan");

  const dormitories = [
    "Asrama Ikhwan",
    "Asrama Putra",
    "Asrama Putri",
    "Asrama Baru",
  ];

  // declaration object
  document.title = import.meta.env.VITE_APP_NAME;


  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  const handlePrayerTime = (time) => {
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
    let dataFiltered = data.filter((item) => {
      if (item.dormitory === dormitory) return item;
    });
    setFilteredData(dataFiltered);
  }, [data, dormitory]);

  useEffect(() => {
    fecthDataHistory()
  }, [dormitory, date, selectedPrayerTime])

  return (
    <>
      {/* <h1>{isOnline ? "Online" : "Offline"}</h1> */}
      <NavigationBar
        fetchData={fetchData}
        data={data}
        setData={setData}
        isAdmin={showIsAdmin}
        setMenu={setMenu}
        menu={menu}
      />
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
