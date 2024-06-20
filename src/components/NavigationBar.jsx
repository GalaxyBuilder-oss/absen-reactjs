import PropTypes from "prop-types";
import { btnMenu } from "./style/style";
import { CloseSharp, MenuSharp } from "react-ionicons";
import { useState } from "react";
import { Transition } from "react-transition-group";
import FormAdd from "./FormAdd";
import AboutView from "./AboutView";
import LoginView from "./LoginView";

const NavigationBar = ({
  fetchData,
  data,
  setData,
  setShowIsAdmin,
  isAdmin,
  setMenu,
  menu
}) => {
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  function handleShowAbout() {
    setShow(false);
    setShowAbout(!showAbout);
  }

  function handleShowAdd() {
    setShow(false);
    setShowAdd(!showAdd);
  }

  function handleShowLogin() {
    setShow(false);
    setShowLogin(!showLogin);
  }

  function handleShowHistory() {
    setShow(false);
    setMenu(1)
  }

  function handleDashboard() {
    setShow(false);
    setMenu(0)
  }

  const transitions = {
    entering: {
      display: "flex",
    },
    entered: {
      opacity: 1,
      display: "flex",
    },
    exiting: {
      opacity: 0,
      display: "flex",
    },
    exited: {
      opacity: "0",
      display: "none",
    },
  };

  return (
    <>
      <nav className="mt-2 mx-2 bg-green-600 py-2 px-4 sm:p-4 rounded-t-lg text-white">
        <div className="h-[10vh] flex justify-between items-center align-middle px-4">
          <div className="font-bold text-2xl uppercase text-center sm:text-left">
            <h1 className="bg-transparent uppercase hover:cursor-pointer hover:underline" onClick={handleDashboard}>Absensi PUB</h1>
          </div>
          <div className="sidebar lg:hidden">
            <button
              className="text-white flex items-center"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <CloseSharp color={"#fff"} />
              ) : (
                <MenuSharp color={"#fff"} />
              )}
            </button>
          </div>
          <div className="hidden lg:flex align-middle items-center gap-2 text-sm xl:text-xl flex-nowrap h-full">
            {isAdmin && (
              <button
                onClick={handleShowAdd}
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Add
              </button>
            )}
            {!isAdmin && (
              <button
                onClick={handleShowLogin}
                className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
              >
                Login
              </button>
            )}
            {menu === 0 && (<button
              onClick={handleShowHistory}
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              History
            </button>)}
            <button
              onClick={handleShowAbout}
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              About
            </button>
          </div>
        </div>
        {/* MobileView */}
        <Transition in={show} timeout={200}>
          {(state) => (
            <div
              className="justify-between items-center align-middle bg-green-600 mx-2 py-2 px-4 sm:p-4 transition-all"
              style={{
                opacity: 0,
                display: "none",
                ...transitions[state],
              }}
            >
              {isAdmin && (
                <button onClick={handleShowAdd} className={btnMenu}>
                  Add
                </button>
              )}
              {!isAdmin && (
                <button
                  onClick={handleShowLogin}
                  className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
                >
                  Login
                </button>
              )}
              {menu === 0 && (<button
              onClick={handleShowHistory}
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              History
            </button>)}
              <button onClick={handleShowAbout} className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold">
                About
              </button>
            </div>
          )}
        </Transition>
      </nav>
      {showAdd && (
        <FormAdd
          handleAddWindow={handleShowAdd}
          setData={setData}
          data={data}
          newData={fetchData}
        />
      )}
      {showAbout && <AboutView handleClick={handleShowAbout} />}
      {showLogin && (
        <LoginView handleClick={handleShowLogin} onLogin={setShowIsAdmin} />
      )}
    </>
  );
};

export default NavigationBar;

NavigationBar.propTypes = {
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
  setShowIsAdmin: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  setMenu: PropTypes.func.isRequired,
  menu: PropTypes.number.isRequired,
};
