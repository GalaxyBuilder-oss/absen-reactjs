import { CopyIcon, Files, HistoryIcon, Plus, PlusIcon, SaveIcon } from "lucide-react";
import { addHistory, setDBData } from "../utils/db/connect";
import { toast } from "react-toastify";
import { defaultSettings } from "../utils/toastConfig";
import { MemberPUB } from "../types";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { useAppContext } from "./provider/useAppContext";
import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const { t, datas, selectedPrayerTime, dormitory, isAdmin, fetchData } =
    useAppContext();
    const navigate = useNavigate()
  const DATE = t.getDate();
  const MONTH_NUM = t.getMonth() + 1;
  const YEAR = t.getFullYear();
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
  const MONTH = dateProperties.months[t.getMonth()];

  const handleSaveHistory = () => {

    if (!confirm("Anda Yakin Ingin Menyimpan Ini?")) return;

    const history = datas.filter(
      (item) => !item.present && item.dormitory === dormitory
    );

    // const date = 12
    // const month = 7

    addHistory(
      history,
      encodeURIComponent(dormitory),
      selectedPrayerTime,
      YEAR,
      MONTH_NUM,
      DATE
    )
      .then(() => toast.success("Berhasil Simpan Ke Riwayat!", defaultSettings))
      .catch((e) => console.error(e));

    datas.forEach((item) => {
      if (item.dormitory === dormitory) {
        item.present = true;
        item.permit = false;
        item.alpha = false;
        item.late = false;
      }
    });
    setDBData(datas);
    fetchData();
  };

  const filterList = (property: keyof MemberPUB) => {
    return datas
      .filter((item) => item[property] && dormitory === item.dormitory)
      .map((item) => `- ${item.name}`)
      .join("\n");
  };

  const handleCopy = () => {
    const alphaList = filterList("alpha");
    const permitList = filterList("permit");
    const formattedDate = `${DAYS.toUpperCase()}, ${DATE} ${MONTH.toUpperCase()} ${YEAR}`;
    const text = `*SHALAT ${selectedPrayerTime.toUpperCase()} HARI ${formattedDate}*\n\nTidak Hadir:\n${alphaList}\n\nIzin:\n${permitList}\n\n*Catatan:*\n- *Konfirmasi Kehadiran Atau Izin Lewat Wa Div Kerohanian Yang Mencatat*\n- *Jika Poin Izin Habis Maka Tidak Bisa Izin Lagi, poin izin akan di reset setelah pembinaan*`;
    navigator.clipboard.writeText(text);
    document.querySelectorAll<HTMLInputElement>("#dormy").forEach((e) => {
      e.checked = false;
    });
    toast.success("Salin Berhasil!", defaultSettings);
  };

  if (isAdmin)
    return (
      <>
        <div className="lg:hidden p-0">
          <Fab
            icon={<PlusIcon />}
            alwaysShowTitle={false}
            style={{
              bottom: 20 + "vh",
              right: 8 + "vw",
            }}
            mainButtonStyles={{
              backgroundColor: "rgb(22 163 74)",
            }}
          >
            <Action
              onClick={() => {
                navigate("/add");
              }}
              text="Tambah"
              style={{
                backgroundColor: "rgb(22 163 74)",
              }}
            >
              <Plus />
            </Action>
            <Action
              text="Lihat Riwayat"
              onClick={() => {
                navigate("/history");
              }}
              style={{
                backgroundColor: "rgb(22 163 74)",
              }}
            >
              <HistoryIcon />
            </Action>
            <Action
              text="Salin Ke Papan Klip"
              style={{
                backgroundColor: "rgb(22 163 74)",
              }}
              onClick={handleCopy}
            >
              <CopyIcon />
            </Action>
            <Action
              text="Simpan Ke Riwayat"
              onClick={handleSaveHistory}
              style={{
                backgroundColor: "rgb(22 163 74)",
              }}
            >
              <SaveIcon />
            </Action>
            <Action
              text="Buat Laporan"
              onClick={()=>navigate("/report")}
              style={{
                backgroundColor: "rgb(22 163 74)",
              }}
            >
              <Files />
            </Action>
          </Fab>
        </div>
        <div className="absolute hidden bottom-36 right-0 lg:flex flex-col gap-4 bg-white bg-opacity-75 p-4">
          <button onClick={handleCopy} title="Salin Ke Papan Klip" className="hover:bg-slate-100 p-3 rounded-full">
             <CopyIcon />
          </button>
          <button onClick={handleSaveHistory} title="Simpan Ke Riwayat" className="hover:bg-slate-100 p-3 rounded-full">
             <SaveIcon />
          </button>
        </div>
      </>
    );

  return <></>;
};

export default FloatingButton;
