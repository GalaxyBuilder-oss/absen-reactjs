import PropTypes from "prop-types";
import { XIcon, MenuIcon } from "lucide-react";
import { useState } from "react";

const NavigationBar = ({ isAdmin, setMenu, menu }) => {
  const [show, setShow] = useState(false);

  function handleShowHistory() {
    setShow(false);
    setMenu(1);
  }

  function handleDashboard() {
    setShow(false);
    setMenu(0);
  }

  return (
    <>
      <nav className="w-[96vw] mt-2 mx-2 bg-green-600 py-2 px-4 sm:p-4 rounded-t-lg text-white transition-all">
        <div className="h-[10vh] flex justify-between items-center align-middle px-4">
          <div className="font-bold text-2xl uppercase text-center sm:text-left">
            <a {...menu === 1 ? { } : { href: '/' }}>
              <h1
                className="bg-transparent uppercase hover:cursor-pointer hover:underline"
                onClick={handleDashboard}
              >
                Absensi PUB
              </h1>
            </a>
          </div>
          <div className="sidebar lg:hidden">
            <button
              className="text-white flex items-center"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <XIcon width={24} height={24} />
              ) : (
                <MenuIcon />
              )}
            </button>
          </div>
          <div className="hidden lg:flex align-middle items-center gap-2 text-sm xl:text-xl flex-nowrap h-full">
            {isAdmin && (
              <a
                href="/add"
                // onClick={handleShowAdd}
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Add
              </a>
            )}
            {!isAdmin && (
              <a
                href="/login"
                // onClick={handleShowLogin}
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Login
              </a>
            )}
            {menu === 0 && (
              <button
                onClick={handleShowHistory}
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                History
              </button>
            )}
            <a
              href="/about"
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              About
            </a>
          </div>
        </div>
        {/* MobileView */}
        {show && (
          <div className="w-full flex justify-between items-center align-middle bg-green-600 mx-2 py-2 px-4 sm:p-4 transition-all">
            {isAdmin && (
              <a
                href="/add"
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Add
              </a>
            )}
            {!isAdmin && (
              <a
                href="/login"
                // onClick={handleShowLogin}
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Login
              </a>
            )}
            {menu === 0 && (
              <button
                onClick={handleShowHistory}
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                History
              </button>
            )}
            <a
              href="/about"
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              About
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavigationBar;

NavigationBar.propTypes = {
  fetchData: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  setData: PropTypes.func,
  isAdmin: PropTypes.bool,
  setMenu: PropTypes.func,
  menu: PropTypes.number,
};
