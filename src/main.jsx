import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ClipboardPage from "./pages/ClipboardPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AddPage from "./pages/AddPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/add',
        element: <AddPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/copy',
        element: <ClipboardPage />
      },
      {
        path: '/logout',
        element: <LogoutPage />
      },
    ],
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
