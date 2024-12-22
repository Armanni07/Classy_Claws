import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

import "./Login.scss";
import { useAuth } from "../../../Hooks/UseAuth";
import Photo from "../../../Assets/CC-Logo-Light.png";
import Photo2 from "../../../Assets/CC-Logo-Dark.png";
import { method } from "../../../Utils/Functions/Functions";
import { LoginType } from "../../../Utils/Types/AuthContextTypes";

export const Login = () => {
  const { admin } = useAuth();

  const [inputs, setInputs] = useState<LoginType>({
    email: "",
    password: "",
  });

  return (
    <div className="admin-login">
      <div className="login-container">
        <img src={Photo} alt="" />

        <span>
          <span>
            <h2>
              <img src={Photo2} alt="" />
              Admin
            </h2>

            <h2> Login </h2>
          </span>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => method.input({ e, setInputs })}
          />

          <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={(e) => method.input({ e, setInputs })}
          />

          <button
            onClick={() =>
              admin({ email: inputs.email, password: inputs.password })
            }
          >
            Login
          </button>

          <h1 style={{ alignSelf: "end" }}>
            <FaQuestionCircle />
          </h1>
        </span>
      </div>
    </div>
  );
};
