import { HelpCircleIcon, PlusIcon, SaveIcon } from "lucide-react";
import { addHistory } from "../../utils/db/connect";
import { toast } from "react-toastify";
import { defaultSettings } from "../../utils/toastConfig";
import { MemberPUB } from "../../types/MemberPUB";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

interface FloatingButtonProps {
  data: MemberPUB[];
  selectedPrayerTime: string;
  dormitory: string;
  isAdmin: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  data,
  selectedPrayerTime,
  dormitory,
  isAdmin,
}) => {
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

  const mainButton: React.CSSProperties = {
    backgroundColor: "#000",
    bottom: 40 + "px",
  };
  if (isAdmin)
    return (
      <Fab
        icon={<PlusIcon />}
        alwaysShowTitle={false}
        mainButtonStyles={mainButton}
      >
        <Action text="Help">
          <HelpCircleIcon />
        </Action>
        <Action text="Save To History" onClick={handleSaveHistory}>
          <SaveIcon />
        </Action>
      </Fab>
    );

  return (
    <></>
  )
};

export default FloatingButton;
