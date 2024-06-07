import { useState } from "react";
import FormAdd from "./components/FormAdd";
import { deleteData, getData, setDBData } from "./components/db/connect";
import { useEffect } from "react";
import FloatingButton from "./components/style/Floatingbutton";
import AboutView from "./components/AboutView";
import ListAbsen from "./components/ListAbsen";
import ListHead from "./components/ListHead";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import EditView from "./components/EditView";

const App = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [editData, setEditData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedPrayerTime, setSelectedPrayerTime] = useState("Shubuh");
  const [dormitory, setDormitory] = useState("Asrama Ikhwan");

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Ahad"];
  const prayerTimeList = ["Shubuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];
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

  document.title=import.meta.env.VITE_APP_NAME

  const handlePrayerTime = (time) => {
    setSelectedPrayerTime(time.target.value);
  };

  const handlePresent = (event, id) => {
    const updatedData = data.map((item) => {
      if (item.id === id)
        return { ...item, present: true, permit: false, alpha: false };
      return item;
    });

    setDBData(updatedData); // Memperbarui data asli
    fetchData();
  };
  const handleAlpha = (event, id) => {
    const updatedData = data.map((item) => {
      if (item.id === id)
        return { ...item, present: false, permit: false, alpha: true };
      return item;
    });

    setDBData(updatedData); // Memperbarui data asli
    fetchData();
  };
  const handlePermit = (event, id) => {
    const updatedData = data.map((item) => {
      if (item.id === id)
        return { ...item, present: false, permit: true, alpha: false };
      return item;
    });

    setDBData(updatedData); // Memperbarui data asli
    fetchData();
  };

  const handleDelete = (id) => {
    deleteData(id)
      .then(() => {
        console.log("Data di tengah array berhasil dihapus.");
        fetchData();
      })
      .catch((error) => {
        console.error("Gagal menghapus data di tengah array:", error);
      });
  };

  const handlePrint = () => {
    const alphaList = data
      .filter(
        (item) => item.alpha && item.id !== 0 && item.dormitory === dormitory
      )
      .map((item) => `- ${item.name.split(" ")[0]}`)
      .join("\n");
    const permitList = data
      .filter(
        (item) => item.permit && item.id !== 0 && item.dormitory === dormitory
      )
      .map((item) => `- ${item.name.split(" ")[0]}`)
      .join("\n");
    const formattedDate = `${days[
      date.getUTCDay()
    ].toUpperCase()}, ${date.getDate()} ${months[
      date.getMonth()
    ].toUpperCase()} ${date.getUTCFullYear()}`;
    let text = `*SHALAT ${selectedPrayerTime.toUpperCase()} HARI ${formattedDate}*\n\nTidak Hadir:\n${alphaList}\n\nIzin:\n${permitList}\n\n*Catatan:*\n- *Konfirmasi Kehadiran Atau Izin Lewat Wa Div Kerohanian Yang Mencatat*\n- *Jika Poin Izin Habis Maka Tidak Bisa Izin Lagi, poin izin akan di reset setelah pembinaan*`;
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

  const saveData = (editedData) => {
    const temp = data.map((item) => {
      if (item.id === editData.id)
        return {
          id: editData.id,
          name: editedData.name,
          generation: editedData.generation,
          dormitory: editedData.dormitory,
          present: editedData.present,
          permit: editedData.permit,
          alpha: editedData.alpha,
        };
      return item;
    });
    temp ? setDBData(temp): console.error("Data Kosong");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let dataFiltered = data.filter((item) => item.dormitory === dormitory);
    setFilteredData(dataFiltered);
  }, [data, dormitory]);

  return (
    <>
      <NavigationBar
        onShowAbout={handleAboutWindow}
        onShowAdd={handleAddWindow}
        setDormitory={setDormitory}
      />
      <main className="h-[76vh] mx-2 bg-green-600 px-4 border-green-600">
        <div className="rounded-lg bg-white relative">
          <ListHead
            newData={fetchData}
            showTime={prayerTimeList}
            onShowTimeClick={handlePrayerTime}
          />
          <ListAbsen
            data={filteredData}
            onEditShow={handleShowEdit}
            setEditData={setEditData}
            handleAlpha={handleAlpha}
            handlePermit={handlePermit}
            handlePresent={handlePresent}
            handleDelete={handleDelete}
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
        {showEdit && (
          <EditView
            handleClick={handleShowEdit}
            data={editData}
            saveData={saveData}
            refreshData={fetchData}
          />
        )}
      </main>
      <Footer date={date} />
    </>
  );
};

export default App;
