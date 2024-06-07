import PropTypes from "prop-types";
import { btnMenu } from "./style/style";
import { CloseSharp, MenuSharp } from "react-ionicons";
import { useState } from "react";

const NavigationBar = ({ onShowAdd, onShowAbout, setDormitory }) => {
  const [show, setShow] = useState(false);

  const handleDormitory = (e) => {
    setDormitory(e.target.value);
  };
  return (
    <>
      <nav className="h-[10vh] flex justify-between items-center align-middle mt-2 mx-2 bg-green-600 py-2 px-4 sm:p-4 rounded-t-lg text-white">
        <div className="font-bold text-2xl uppercase w-1/3 text-center sm:text-left">
          <select
            name="dormitory"
            className="bg-transparent uppercase"
            onChange={(event) => handleDormitory(event)}
          >
            <option value="Asrama Ikhwan" className="bg-green-600">
              Asrama Ikhwan
            </option>
            <option value="Asrama Putra" className="bg-green-600">
              Asrama Putra
            </option>
            <option value="Asrama Putri" className="bg-green-600">
              Asrama Putri
            </option>
            <option value="Asrama Baru" className="bg-green-600">
              Asrama Baru
            </option>
          </select>
        </div>
        <div className="sidebar lg:hidden">
          <button
            className="text-white flex items-center"
            onClick={() => setShow(!show)}
          >
            {show ? <CloseSharp color={'#fff'} /> : <MenuSharp  color={'#fff'} />}
          </button>
        </div>
        <div className="hidden lg:flex align-middle items-center gap-2 text-sm xl:text-xl flex-nowrap h-full">
          <button onClick={onShowAdd} className={btnMenu}>
            Add
          </button>
          <button onClick={onShowAbout} className={btnMenu}>
            About
          </button>
        </div>
      </nav>
      {show && (
        <div className="flex justify-between items-center align-middle mx-2 bg-green-600 py-2 px-4 sm:p-4">
          {/* <div className="flex align-middle justify-around items-center gap-2 text-sm xl:text-xl flex-nowrap h-full"> */}
            <button onClick={onShowAdd} className={btnMenu}>
              Add
            </button>
            <button onClick={onShowAbout} className={btnMenu}>
              About
            </button>
          {/* </div> */}
        </div>
      )}
    </>
  );
};

export default NavigationBar;

NavigationBar.propTypes = {
  onShowAbout: PropTypes.func.isRequired,
  onShowAdd: PropTypes.func.isRequired,
  setDormitory: PropTypes.func
};
