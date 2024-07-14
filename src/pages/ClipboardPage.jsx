import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { defaultSettings } from "../utils/toastConfig";

const ClipboardPage = () => {
  const [dormy, setDormy] = useState([]);
  const [
    handlePrayerTime,
    ,
    ,
    data,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    selectedPrayerTime,
    dormitories,
    t,
  ] = useOutletContext();
  const prayerTimeList = ["Shubuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];

  const dateProperties = {
    months: [
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
    ],
    days: ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"],
  };
  const DAYS = dateProperties.days[t.getDay()];
  const DATE = t.getDate();
  const MONTH = dateProperties.months[t.getMonth()];
  const YEAR = t.getFullYear();

  // helper method
  const filterList = (data, property) => {
    return data
      .filter((item) => item[property] && (item.dormitory === dormy[0] || item.dormitory === dormy[1]))
      .map((item) => `- ${item.name}`)
      .join("\n");
  };

  // action method
  const handleClick = () => {
    const alphaList = filterList(data, "alpha");
    const permitList = filterList(data, "permit");
    const formattedDate = `${DAYS.toUpperCase()}, ${DATE} ${MONTH.toUpperCase()} ${YEAR}`;
    let text = `*SHALAT ${selectedPrayerTime.toUpperCase()} HARI ${formattedDate}*\n\nTidak Hadir:\n${alphaList}\n\nIzin:\n${permitList}\n\n*Catatan:*\n- *Konfirmasi Kehadiran Atau Izin Lewat Wa Div Kerohanian Yang Mencatat*\n- *Jika Poin Izin Habis Maka Tidak Bisa Izin Lagi, poin izin akan di reset setelah pembinaan*`;
    navigator.clipboard.writeText(text);

    toast.success("Copied Success!", defaultSettings);
  };

  const handleChecked = (e) => {
    const { value } = e.target;
    setDormy([...dormy, value])
    console.log(dormy);
  };

  return (
    <main className="h-[76vh] mx-2 bg-green-600 px-4 border-green-600">
      <div className="lg:h-[76vh] rounded-lg bg-white relative p-4">

        <a href="/">&lt;- Back</a>
        <div>
          Waktu Sholat :
          <select
            name="prayTimes"
            className="border rounded-md p-0 sm:px-4"
            onChange={handlePrayerTime}
          >{prayerTimeList.map((time, i) => (
            <option key={i} value={time} className="bg-gray-200 rounded-none">
              {time}
            </option>
          ))}
          </select>
        </div>
        <ul>
          {dormitories.map((dormitory, i) => (
            <li key={i}>
              <input
                type="checkbox"
                name="dormitory"
                id=""
                value={dormitory}
                onChange={handleChecked}
              />
              {" " + dormitory}
            </li>
          ))}
        </ul>
        <button onClick={handleClick}>Copy</button>
      </div>
    </main >
  );
};

export default ClipboardPage;
