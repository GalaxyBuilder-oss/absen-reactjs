import PropTypes from "prop-types";
import { btnMenu } from "./style/style";

const NavigationBar = ({ onShowAdd, onShowAbout }) => {
  return (
    <nav className="flex justify-between items-center mt-2 mx-2 bg-green-600 p-2 sm:p-4 rounded-t-lg text-white">
      <div className="font-bold text-2xl xl:text-4xl uppercase animate-skew-anim w-1/2 text-center sm:text-left">
        ASRAMA IKHWAN
      </div>
      <div className="flex align-middle items-center gap-2 text-sm xl:text-xl flex-nowrap h-full">
        <button onClick={onShowAdd} className={btnMenu}>
          Add
        </button>
        <button onClick={onShowAbout} className={btnMenu}>
          About
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;

NavigationBar.propTypes = {
  onShowAbout: PropTypes.func.isRequired,
  onShowAdd: PropTypes.func.isRequired,
};
