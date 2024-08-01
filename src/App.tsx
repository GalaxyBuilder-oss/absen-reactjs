/* eslint-disable react-hooks/exhaustive-deps */
import "react-toastify/ReactToastify.min.css";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { ToastContainer } from "react-toastify";
import AppProvider from "./components/provider/AppProvider";

export default function App() {

  return (
    <>
      <AppProvider>
        <NavigationBar />
        <Outlet />
        <Footer />
        <ToastContainer />
      </AppProvider>
    </>
  );
}
