import { XIcon, MenuIcon } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "./provider/useAppContext";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const { showIsAdmin } = useAppContext();
  const [show, setShow] = useState(false);

  return (
    <>
      <nav className="sm:w-[98vw] mt-2 mx-2 bg-green-600 p-2 sm:p-4 rounded-t-lg text-white transition-all">
        <div className="h-[10vh] flex justify-between items-center align-middle px-4">
          <div className="font-bold text-2xl uppercase text-center sm:text-left">
            <Link to="/">
              <h1
                className="bg-transparent uppercase hover:cursor-pointer hover:underline"
              >
                Absensi PUB
              </h1>
            </Link>
          </div>
          <div className="hidden lg:flex align-middle items-center gap-2 text-sm xl:text-xl flex-nowrap">
            {showIsAdmin && (
              <Link
                to="/add"
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Add
              </Link>
            )}
            {!showIsAdmin && (
              <Link
                to="/login"
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Login
              </Link>
            )}
            <Link
              to={"/history"}
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              History
            </Link>
            <Link
              to="/about"
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              About
            </Link>
          </div>
          <div className="lg:hidden">
            <button
              className="text-white flex items-center"
              onClick={() => setShow(!show)}
            >
              {show ? <XIcon width={24} height={24} /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {/* MobileView */}
        {show && (
          <div className="w-full flex justify-between items-center align-middle bg-green-600 mx-2 py-2 px-4 sm:p-4 animate-fade-in">
            {!showIsAdmin && (
              <Link
                to="/login"
                // onClick={handleShowLogin}
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Login
              </Link>
            )}
            <Link
              to="/about"
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              About
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavigationBar;
