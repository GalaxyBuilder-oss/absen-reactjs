import { SaveIcon } from "lucide-react";
import { btn } from "./style";
import PropTypes from "prop-types";
import { addHistory } from "../../utils/db/connect";
import { toast } from "react-toastify";
import { defaultSettings } from "../../utils/toastConfig";

const FloatingButton = ({ data, selectedPrayerTime, dormitory, isAdmin }) => {
  const d = new Date();
  const DATE = d.getDate();
  const MONTH_NUM = d.getMonth() + 1;
  const YEAR = d.getFullYear();

  const handleSaveHistory = () => {
    const history = data.filter(
      (item) => !item.present && item.dormitory === dormitory
    );

    // const date = "13"

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
  };

  return (
    <div
      className={`${
        !isAdmin && "hidden "
      }w-auto inline absolute bottom-10 lg:bottom-18 right-5 lg:right-14`}
    >
      <button className={btn} onClick={handleSaveHistory}>
        <SaveIcon />
      </button>
    </div>
  );
};

export default FloatingButton;

FloatingButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selectedPrayerTime: PropTypes.string,
  dormitory: PropTypes.string,
  isAdmin: PropTypes.bool,
};
