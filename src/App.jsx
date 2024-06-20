import { useState } from "react";
import { getData, getHistory } from "./utils/db/connect";
import { useEffect } from "react";
import FloatingButton from "./components/style/Floatingbutton";
import ListAbsen from "./components/ListAbsen";
import ListHead from "./components/ListHead";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import HistoryList from "./components/HistoryList";
import ListHeadHistory from "./components/ListHeadHistory";

export default function App() {
  const t = new Date();
  const [data, setData] = useState([]);
  const [histories, setHistories] = useState([]);
  const [date, setDate] = useState(t.getDate());
  const [month, setMonth] = useState(t.getMonth()+1);
  const [year, setYear] = useState(t.getFullYear());
  const [filteredData, setFilteredData] = useState([]);
  const [menu, setMenu] = useState(0);
  const [showIsAdmin, setShowIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrayerTime, setSelectedPrayerTime] = useState("Shubuh");
  const [dormitory, setDormitory] = useState("Asrama Ikhwan");

  // declaration object
  document.title = import.meta.env.VITE_APP_NAME;

  // Method Action
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let dataFiltered = data.filter((item) => {
      if (item.dormitory === dormitory) return item;
    });
    setFilteredData(dataFiltered);
  }, [data, dormitory]);

  const fecthDataHistory = async () => {
    setIsLoading(true);
    await getHistory(encodeURIComponent(dormitory), selectedPrayerTime, year, month, date)
      .then((data) => {
        setHistories(data.val());
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <NavigationBar
        fetchData={fetchData}
        data={data}
        setData={setData}
        setShowIsAdmin={setShowIsAdmin}
        isAdmin={showIsAdmin}
        setMenu={setMenu}
        menu={menu}
      />
      <main className="h-[76vh] mx-2 bg-green-600 px-4 border-green-600">
        <div className="lg:h-[76vh] rounded-lg bg-white relative py-2">
          {menu === 0 ? (
            <>
              <ListHead
                onShowTimeClick={handlePrayerTime}
                setDormitory={setDormitory}
                dormitory={dormitory}
              />
              <ListAbsen
                realData={data}
                filteredData={filteredData}
                refreshData={fetchData}
                isAdmin={showIsAdmin}
                isLoading={isLoading}
              />
            </>
          ) : menu === 1 ? (
            <>
              <ListHeadHistory
                onShowTimeClick={handlePrayerTime}
                setDormitory={setDormitory}
                fetchDataHistory={fecthDataHistory}
                setDate={setDate}
                setMonth={setMonth}
                setYear={setYear}
              />
              <HistoryList
                fetchDataHistory={fecthDataHistory}
                dormitory={dormitory}
                histories={histories}
                isLoading={isLoading}
              />
            </>
          ) : (
            <>
              Menu Tidak Tersedia
            </>
          )}
          <FloatingButton
            data={data}
            selectedPrayerTime={selectedPrayerTime}
            dormitory={dormitory}
            isAdmin={showIsAdmin}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
