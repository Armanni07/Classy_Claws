import "./Alert.scss";
import Logo from "../../Assets/CC-Logo-Light.png";
import { AlertType } from "./Types";
import { useEffect } from "react";

export const Alert = ({ setAlert, message }: AlertType) => {
  useEffect(() => {
    setTimeout(() => setAlert(false), 2000);
  });
  
  return (
    <div className="alert">
      <img src={Logo} alt="" />
      <h1 className="text">{message}</h1>
    </div>
  );
};
