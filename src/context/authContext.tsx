import axios from "axios";
import React, { FC, ReactNode } from "react";
import { createContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: { name: string; email: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const baseUrl = "https://frontend-take-home-service.fetch.com";

  const login = async (inputs: { name: string; email: string }) => {
    // try {
    //   const response = await axios.post<{ user: User }>(
    //     "http://localhost:3001/api/auth/login",
    //     inputs
    //   );
    //   setCurrentUser(response.data.user);
    //   return response;
    // } catch (error) {
    //   console.error("Login failed: ", error);
    // }
    try {
      console.log(baseUrl);
      console.log(inputs);
      const response = await axios.post(
        baseUrl + "/auth/login",
        {
          name: inputs.name,
          email: inputs.email,
        },
        {
          withCredentials: true,
        }
      );
      setCurrentUser({ name: inputs.name, email: inputs.email });
      console.log(currentUser);
      return response;
    } catch (error) {
      // setError(error);
      console.log("login failed", error);
    }
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
