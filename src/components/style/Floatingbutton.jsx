import { CopySharp } from "react-ionicons";
import { btn } from "./style";
import PropTypes from "prop-types";
import { addHistory } from "../../utils/db/connect";

const FloatingButton = ({ data, selectedPrayerTime, dormitory, isAdmin }) => {
  // declaration object
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
  const d = new Date();
  const DAYS = dateProperties.days[d.getDay()];
  const DATE = d.getDate();
  const MONTH_NUM = d.getMonth() + 1;
  const MONTH = dateProperties.months[d.getMonth()];
  const YEAR = d.getFullYear();

  // helper method
  const filterList = (data, property) => {
    return data
      .filter((item) => item[property] && item.dormitory === dormitory)
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

    const history = data.filter((item) => !item.present && item.dormitory === dormitory);

    // const date = "19"
    
    // add to history
    addHistory(
      history,
      encodeURIComponent(dormitory),
      selectedPrayerTime,
      YEAR,
      MONTH_NUM,
      DATE
    )
      .then((response) => console.log(response))
      .catch((e) => console.error(e));

    alert("Copied Success!");
  };

  return (
    <div className={`${!isAdmin && "hidden "}w-auto inline absolute bottom-10 lg:bottom-18 right-5 lg:right-14`}>
      <button className={btn} onClick={handleClick}>
        <CopySharp color={"#fff"} />
      </button>
    </div>
  );
};

export default FloatingButton;

FloatingButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPrayerTime: PropTypes.string.isRequired,
  dormitory: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
