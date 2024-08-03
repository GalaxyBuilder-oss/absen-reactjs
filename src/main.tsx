import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClipboardPage from "./pages/ClipboardPage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import AddPage from "./pages/AddPage";
import LoginPage from "./pages/LoginPage";
import ReportLayout from "./pages/ReportLayout";
import EditPage from "./pages/EditPage";
import HistoryPage from "./pages/HistoryPage";
import ForbiddenPage from "./pages/ForbiddenPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/edit/:id",
        element: <EditPage />,
      },
      {
        path: "/add",
        element: <AddPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/copy",
        element: <ClipboardPage />,
      },
      {
        path: "/report",
        element: <ReportLayout />,
      },
      {
        path: "/forbidden",
        element: <ForbiddenPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
