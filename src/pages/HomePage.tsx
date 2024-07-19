import { useOutletContext } from "react-router-dom";
import ListHead from "../components/ListHead";
import ListAbsen from "../components/ListAbsen";
import ListHeadHistory from "../components/ListHeadHistory";
import HistoryList from "../components/HistoryList";
import FloatingButton from "../components/style/Floatingbutton";
import { OutletContextType } from "../types/OutletContextType";

const HomePage = () => {
  const [
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
  ]: OutletContextType = useOutletContext();
  return (
    <main className="w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
      <div className="h-[72vh] rounded-lg bg-white relative py-2">
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
            <FloatingButton
              data={data}
              selectedPrayerTime={selectedPrayerTime}
              dormitory={dormitory}
              isAdmin={showIsAdmin}
            />
          </>
        ) : menu === 1 ? (
          <>
            <ListHeadHistory
              dormitory={dormitory}
              setDormitory={setDormitory}
              onShowTimeClick={handlePrayerTime}
              fetchDataHistory={fecthDataHistory}
              setDate={setDate}
              setMonth={setMonth}
              setYear={setYear}
            />
            <HistoryList histories={histories} isLoading={isLoading} />
          </>
        ) : (
          <>Menu Tidak Tersedia</>
        )}
      </div>
    </main>
  );
};

export default HomePage;
