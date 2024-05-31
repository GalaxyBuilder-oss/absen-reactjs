import { useState } from "react";
import FormAdd from "./components/FormAdd";
import { getData } from "./components/db/connect";
import { useEffect } from "react";
import FloatingButton from "./components/style/Floatingbutton";
import AboutView from "./components/AboutView";
import ListAbsen from "./components/ListAbsen";
import ListHead from "./components/ListHead";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

const App = () => {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedPrayerTime, setSelectedPrayerTime] = useState("Shubuh");

  const days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
  const months = [
    "Januari",
    "Ferbuari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // declaration object
  const date = new Date();

  const handlePrayerTime = (time) => {
    setSelectedPrayerTime(time.target.value);
  };

  const handlePrint = () => {
    const absentList = data
      .filter((item) => !item.checked && item.id !== 0)
      .map((item) => `- ${item.name}`)
      .join("\n");
    const formattedDate = `${days[
      date.getUTCDay()
    ].toUpperCase()}, ${date.getDate()} ${months[
      date.getMonth()
    ].toUpperCase()} ${date.getUTCFullYear()}`;
    let text = `*SHALAT ${selectedPrayerTime.toUpperCase()} HARI ${formattedDate}*\n\nTidak Hadir:\n${absentList}\n\nIzin:\n\n*Catatan:*\n- *Konfirmasi Kehadiran Atau Izin Lewat Grup*\n- *Jika Poin Izin Habis Maka Tidak Bisa Izin Lagi, poin izin akan di reset setelah pembinaan*`;
    navigator.clipboard.writeText(text);
    alert("Copied Success!");
  };

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleAddWindow = () => {
    setShowAdd(!showAdd);
  };

  const handleAboutWindow = () => {
    setShowAbout(!showAbout);
  };

  const fetchData = () =>
    getData()
      .then((response) => {
        if (response.hasChildren()) setData(response.val());
      })
      .catch((e) => {
        console.error(e);
      });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavigationBar
        onShowAbout={handleAboutWindow}
        onShowAdd={handleAddWindow}
      />
      <main className="mx-2 bg-green-600 px-4 border-green-600">
        <div className="rounded-lg bg-white">
          <ListHead
            newData={fetchData}
            showTime={["Shubuh", "Dzuhur", "Ashar", "Maghrib", "Isya"]}
            onShowTimeClick={handlePrayerTime}
          />
          <ListAbsen
            data={data}
            newData={fetchData}
            onEditShow={handleShowEdit}
            setData={setData}
          />
          <FloatingButton handleClick={handlePrint} />
        </div>
        {showAdd && (
          <FormAdd
            handleAddWindow={handleAddWindow}
            setData={setData}
            data={data}
            newData={fetchData}
          />
        )}
        {showAbout && <AboutView handleClick={handleAboutWindow} />}
      </main>
      <Footer date={date} />
    </>
  );
};

export default App;
