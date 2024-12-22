import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";

import "./Login.scss";
import { Input } from "../../Inputs/Input";
import { useAuth } from "../../../Hooks/UseAuth";
import Photo from "../../../Assets/CC-Logo-Light.png";
import Photo2 from "../../../Assets/CC-Logo-Dark.png";
import { method } from "../../../Utils/Functions/Functions";
import { ClickType } from "../../../Utils/Types/FunctionTypes";
import { LoginInput } from "../../../Utils/Objects/AuthObjects";
import { LoginType } from "../../../Utils/Types/AuthContextTypes";

export const Login = ({ click, message, setClick }: ClickType) => {
  const { login, loggedIn } = useAuth();

  const [inputs, setInputs] = useState<LoginType>({
    email: "",
    password: "",
  });

  const HandleClear = () => {
    if (loggedIn) {
      setClick(false);
    }
  };

  useEffect(() => {
    HandleClear();
  });

  return (
    <div className="login">
      <div className="login-container">
        <img src={Photo} alt="" />

        <span>
          <span className="login-logo">
            <h2>
              <img src={Photo2} alt="" />
              Login
            </h2>

            {message && <h4>{message}</h4>}

            <MdClose
              size={25}
              color="#ff0000"
              className="login-close"
              onClick={() => method.click({ click, setClick })}
            />
          </span>

          <Input input={LoginInput} setInput={setInputs} />

          <button onClick={() => {
            
            login(inputs)}}>Login</button>

          <h1 style={{ alignSelf: "end" }}>
            <FaQuestionCircle />
          </h1>
        </span>
      </div>
    </div>
  );
};
