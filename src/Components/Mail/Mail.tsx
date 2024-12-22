import { useState } from "react";
import { MdClose } from "react-icons/md";

import "./Mail.scss";
import { MailType } from "./Types";
import { Alert } from "../Alert/Alert";
import { Login } from "../Auth/Login/Login";
import { www } from "../../Utils/URLS/Urls";
import { useAuth } from "../../Hooks/UseAuth";
import Logo from "../../Assets/CC-Logo-Dark.png";
import { server } from "../../Utils/Server/Server";
import { method } from "../../Utils/Functions/Functions";

export const Mail = ({ setClick }: MailType) => {
  const { loggedIn } = useAuth();

  const [message, setMessage] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [alert, setAlert] = useState<boolean>(false);
  const [loginClick, setLoginClick] = useState<boolean>(false);

  const SendMessage = async () => {
    const response = await server.post(www.mail.send, { message });

    setMessage("");
    if (response?.data.message.includes("Sent")) {
      setAlert(true);
      setAlertMessage(response?.data.message);

      // setTimeout(() => setClick(false), 3000);
    }
  };

  return (
    <div className="mail">
      <div className="mail-container">
        <MdClose className="mail-close" onClick={() => setClick(false)} />

        <img src={Logo} alt="" />
        <h2>Hey Girl!</h2>
        <h3>We are Pleased to Hear from you. Feel Free, Shoot Us an Email</h3>

        <span className="text-area">
          <textarea
            rows={4}
            cols={50}
            placeholder="What's on Your Mind ?"
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={() =>
              loggedIn
                ? SendMessage()
                : method.click({ click: loginClick, setClick: setLoginClick })
            }
          >
            Send
          </button>
        </span>
      </div>

      {alert && <Alert message={alertMessage} setAlert={setAlert} />}
      {loginClick && <Login click={loginClick} setClick={setLoginClick} />}
    </div>
  );
};
