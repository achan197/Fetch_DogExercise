import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { useContext, useEffect, useState } from "react";
import Match from "./pages/Match";
import { AuthContext } from "./context/authContext";
import axios from "axios";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    let cookieFound = false;
    cookies.forEach((cookie) => {
      if (cookie.trim().indexOf("access_cookie=") === 0) {
        const cookieValue = cookie.substring("access_cookie=".length);
        if (cookieValue === "access_string") {
          cookieFound = true;
        }
      }
    });
    console.log(cookieFound);
    setIsAuth(!!cookieFound);
  }, []);

  const handleLogin = (token: string) => {
    const name = "access_cookie";
    const value = "access_string";
    const date = new Date();
    date.setTime(date.getTime() + 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax;`;
    setIsAuth(true);
  };

  const Layout = () => {
    // const navigate = useNavigate();
    // const authContext = useContext(AuthContext);

    // useEffect(() => {
    //   if (!authContext?.currentUser) {
    //     navigate("/login");
    //   }
    // }, [authContext, navigate]);

    return (
      <>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // {
        //   path: "/",
        //   element: <Home />,
        // },
        {
          path: "/",
          element: isAuth ? <Match /> : <Navigate to="/login" replace />,
        },
      ],
    },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    {
      path: "/login",
      element: <Login onLogin={handleLogin} isAuth={isAuth} />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
