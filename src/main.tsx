import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AboutPage,
  AddPage,
  ClipboardPage,
  EditPage,
  EmptyPage,
  ErrorPage,
  ForbiddenPage,
  HistoryPage,
  HomePage,
  LoginPage,
  ReportPage,
  SettingsPage,
} from "./pages";

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
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/report",
        element: <ReportPage />,
      },
      {
        path: "/forbidden",
        element: <ForbiddenPage />,
      },
      {
        path: "*",
        element: <EmptyPage />,
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
