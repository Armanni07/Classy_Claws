import { createContext,  useState } from "react";

import { www } from "../Utils/URLS/Urls";
import {
  LoginType,
  CurrentUser,
  ContextPropType,
  AuthContextType,
} from "../Utils/Types/AuthContextTypes";
import { useAxios } from "../Hooks/UseAxios";
import { server } from "../Utils/Server/Server";
import { method } from "../Utils/Functions/Functions";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: ContextPropType) => {

  const userStorage: string | null = localStorage.getItem("currentUser");
  const loggedStorage: string | null = localStorage.getItem("loggedIn");

  const [loggedIn, setLoggedIn] = useState<boolean | null>(
    loggedStorage && JSON.parse(loggedStorage)
  );

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(
    method.ParseStorage(userStorage)
  );

  const admin = async (inputs: LoginType) => {
    try {
      await server.post(www.admin.post, inputs).then((response) => {
        localStorage.setItem("currentUser", JSON.stringify(response?.data));
        localStorage.setItem("loggedIn", JSON.stringify(true));

        setLoggedIn(true);
        setCurrentUser(response?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (inputs: LoginType) => {
    try {
      await useAxios.post(www.users.login, inputs).then((response) => {
        localStorage.setItem("currentUser", JSON.stringify(response?.data));
        localStorage.setItem("loggedIn", JSON.stringify(true));

        setLoggedIn(true);
        setCurrentUser(response?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const response = await useAxios.post(www.admin.logout);

      localStorage.removeItem("loggedIn");
      localStorage.removeItem("currentUser");

      setLoggedIn(!loggedIn);
      setCurrentUser(null);

      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const UserLogout = async () => {
    try {
      const response = await useAxios.post(www.users.logout);

      localStorage.removeItem("loggedIn");
      localStorage.removeItem("currentUser");

      setLoggedIn(!loggedIn);
      setCurrentUser(null);

      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <AuthContext.Provider
      value={{ admin, login, logout, loggedIn, currentUser, UserLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
