import { toast } from "react-toastify";
import { ChangeEvent, useEffect, useState } from "react";
import { defaultSettings } from "../utils/toastConfig";
import { MemberPUB } from "../types/types";
import { useAppContext } from "../components/provider/useAppContext";

const ClipboardPage = () => {
  const [dormy, setDormy] = useState<string[]>([]);
  const {handlePrayerTime, data, fetchData, selectedPrayerTime, dormitories, t, prayerTimeList} = useAppContext()

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

  const filterList = (data: MemberPUB[], property: keyof MemberPUB) => {
    return data
      .filter((item) => item[property] && dormy.includes(item.dormitory))
      .map((item) => `- ${item.name}`)
      .join("\n");
  };

  const handleClick = () => {
    const alphaList = filterList(data, "alpha");
    const permitList = filterList(data, "permit");
    const formattedDate = `${DAYS.toUpperCase()}, ${DATE} ${MONTH.toUpperCase()} ${YEAR}`;
    const text = `*SHALAT ${selectedPrayerTime.toUpperCase()} HARI ${formattedDate}*\n\nTidak Hadir:\n${alphaList}\n\nIzin:\n${permitList}\n\n*Catatan:*\n- *Konfirmasi Kehadiran Atau Izin Lewat Wa Div Kerohanian Yang Mencatat*\n- *Jika Poin Izin Habis Maka Tidak Bisa Izin Lagi, poin izin akan di reset setelah pembinaan*`;
    navigator.clipboard.writeText(text);

    setDormy([]);
    document.querySelectorAll<HTMLInputElement>("#dormy").forEach((e) => {
      e.checked = false;
    });
    toast.success("Copied Success!", defaultSettings);
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDormy([...dormy, value]);
  };

  useEffect(()=>{
    fetchData()
  })

  return (
    <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
      <div className="h-[72vh] rounded-lg bg-white relative p-4">
        <a href="/">&lt;- Back</a>
        <div>
          Waktu Sholat :
          <select
            name="prayTimes"
            className="border rounded-md p-0 sm:px-4"
            onChange={handlePrayerTime}
          >
            {prayerTimeList.map((time, i) => (
              <option key={i} value={time} className="bg-gray-200 rounded-none">
                {time}
              </option>
            ))}
          </select>
        </div>
        <ul className="my-4">
          {dormitories.map((dormitory: string, i: React.Key) => (
            <li key={i}>
              <input
                type="checkbox"
                name="dormitory"
                id="dormy"
                value={dormitory}
                onChange={handleChecked}
              />
              {" " + dormitory}
            </li>
          ))}
        </ul>
        <button
          className="px-4 border rounded-md hover:bg-slate-200"
          onClick={handleClick}
        >
          Copy
        </button>
      </div>
    </main>
  );
};

export default ClipboardPage;
