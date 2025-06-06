import { Outlet } from "react-router-dom";
import { AppProvider, NavigationBar, Footer } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

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
