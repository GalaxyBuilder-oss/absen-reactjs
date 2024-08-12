import { XIcon, MenuIcon } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "./provider/useAppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../utils/db/connect";
import Cookies from "universal-cookie";

const NavigationBar = () => {
  const { isAdmin } = useAppContext();
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const cookies = new Cookies();

  // Helper function to determine if the current page is active
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      cookies.remove("loggedIn");
      cookies.remove("currentUser");
      navigate(0)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="sm:w-[98vw] mt-2 mx-2 bg-green-600 p-2 sm:p-4 rounded-t-lg text-white transition-all">
        <div className="h-[10vh] flex justify-between items-center align-middle px-4">
          <div className="font-bold text-2xl uppercase text-center sm:text-left">
            <Link to="/">
              <h1 className="bg-transparent uppercase hover:cursor-pointer hover:underline">
                Absensi PUB
              </h1>
            </Link>
          </div>
          <div className="hidden lg:flex align-middle items-center gap-2 text-sm xl:text-xl flex-nowrap">
            {isAdmin && (
              <>
                {!isActive('/add') && (
                  <Link
                    to="/add"
                    className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
                  >
                    Tambah
                  </Link>
                )}
                {!isActive('/report') && (
                  <Link
                    to="/report"
                    className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
                  >
                    Laporan
                  </Link>
                )}
              </>
            )}
            {!isAdmin && !isActive('/login') && (
              <Link
                to="/login"
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Masuk Sebagai Admin
              </Link>
            )}
            {!isActive('/history') && (
              <Link
                to="/history"
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Riwayat Absen
              </Link>
            )}
            {!isActive('/about') && (
              <Link
                to="/about"
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Tentang
              </Link>
            )}
            {isAdmin && (
              <button
              onClick={handleLogout}
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              Keluar
            </button>
            )}
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
            {!isAdmin ? !isActive('/login') && (
              <Link
                to="/login"
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Masuk
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Keluar
              </button>
            )}
            {!isActive('/about') && (
              <Link
                to="/about"
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Tentang
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavigationBar;
