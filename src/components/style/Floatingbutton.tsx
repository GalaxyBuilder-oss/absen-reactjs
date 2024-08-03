import { CopyIcon, HelpCircleIcon, PlusIcon, SaveIcon } from "lucide-react";
import { addHistory, setDBData } from "../../utils/db/connect";
import { toast } from "react-toastify";
import { defaultSettings } from "../../utils/toastConfig";
import { MemberPUB } from "../../types/types";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { useAppContext } from "../provider/useAppContext";

const FloatingButton = () => {
  const { t, data, selectedPrayerTime, dormitory, showIsAdmin, fetchData} = useAppContext()
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
    const history = data.filter(
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
      .then(() => toast.success("Saved To History Success!", defaultSettings))
      .catch((e) => console.error(e));

      data.forEach((item) => {
        if (item.dormitory === dormitory) {
          item.present = true;
          item.permit = false;
          item.alpha = false;
          item.late = false;
        }
      });
      setDBData(data)
      fetchData()
  };

  const filterList = (data: MemberPUB[], property: keyof MemberPUB) => {
    return data
      .filter((item) => item[property] && dormitory === item.dormitory)
      .map((item) => `- ${item.name}`)
      .join("\n");
  };

  const handleCopy = () => {
    const alphaList = filterList(data, "alpha");
    const permitList = filterList(data, "permit");
    const formattedDate = `${DAYS.toUpperCase()}, ${DATE} ${MONTH.toUpperCase()} ${YEAR}`;
    const text = `*SHALAT ${selectedPrayerTime.toUpperCase()} HARI ${formattedDate}*\n\nTidak Hadir:\n${alphaList}\n\nIzin:\n${permitList}\n\n*Catatan:*\n- *Konfirmasi Kehadiran Atau Izin Lewat Wa Div Kerohanian Yang Mencatat*\n- *Jika Poin Izin Habis Maka Tidak Bisa Izin Lagi, poin izin akan di reset setelah pembinaan*`;
    navigator.clipboard.writeText(text);
    document.querySelectorAll<HTMLInputElement>("#dormy").forEach((e) => {
      e.checked = false;
    });
    toast.success("Copied Success!", defaultSettings);
  };

  if (showIsAdmin)
    return (
  <>
      <div className="lg:hidden">
        <Fab
          icon={<PlusIcon />}
          alwaysShowTitle={false}
          style={{
            bottom: 16 + "vh",
            right: 4 + "vw",
          }}
          mainButtonStyles={{
            backgroundColor: "rgb(22 163 74)",
          }}
        >
          <Action
            text="Help"
            style={{
              backgroundColor: "rgb(22 163 74)",
            }}
          >
            <HelpCircleIcon />
          </Action>
          <Action
            text="Copy To Clipboard"
            style={{
              backgroundColor: "rgb(22 163 74)",
            }}
            onClick={handleCopy}
          >
            <CopyIcon />
          </Action>
          <Action
            text="Save To History"
            onClick={handleSaveHistory}
            style={{
              backgroundColor: "rgb(22 163 74)",
            }}
          >
            <SaveIcon />
          </Action>
        </Fab>
      </div>
      <div className="absolute">
        <button className="flex" onClick={handleCopy}>
        <CopyIcon />{" "}Save To Clipboard
        </button>
      </div>
      </>
    );

  return <></>;
};

export default FloatingButton;
