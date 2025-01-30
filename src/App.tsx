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

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
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
      element: <Login onLogin={() => handleLogin} isAuth={isAuth} />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
