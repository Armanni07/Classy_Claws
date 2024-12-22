import { MdClose } from "react-icons/md";

import "./Confirm.scss";
import { ConfirmType } from "./Types";
import Logo from "../../Assets/CC-Logo-Light.png";

export const Confirm = ({ message, functions, setClose }: ConfirmType) => {
  const HandleYes = () => {
    functions();
    setClose(false);
  };

  const HandleNo = () => {
    setClose(false);
  };

  return (
    <div className="confirm">
      <div className="confirm-container">
        <MdClose className="confirm-close" onClick={() => setClose(false)} />
        <img src={Logo} alt="" />

        <h1 className="text">{message}</h1>
        <span>
          <button className="response" onClick={() => HandleYes()}>
            Yes
          </button>

          <button className="response" onClick={() => HandleNo()}>
            No
          </button>
        </span>
      </div>
    </div>
  );
};
