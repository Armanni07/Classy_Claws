import { MdClose } from "react-icons/md";
import { FormEvent, useState } from "react";

import "./Register.scss";
import { Input } from "../../Inputs/Input";
import { www } from "../../../Utils/URLS/Urls";
import Photo from "../../../Assets/CC-Logo-Light.png";
import Photo2 from "../../../Assets/CC-Logo-Dark.png";
import { server } from "../../../Utils/Server/Server";
import { method } from "../../../Utils/Functions/Functions";
import { ClickType } from "../../../Utils/Types/FunctionTypes";
import { RegisterInput } from "../../../Utils/Objects/AuthObjects";
import { UsersInputType } from "../../../Utils/Types/AuthContextTypes";

export const Register = ({ click, message, setClick }: ClickType) => {
  const [inputs, setInputs] = useState<UsersInputType>({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Phone_No: 0,
    Location: "",
    Photo: {
      file: undefined,
      ImageUrl: "",
    },
  });

  const SendData = (image: string) => {
    const UserData = image
      ? {
          ...inputs,
          Photo: image,
        }
      : inputs;

    server.post(www.users.register, UserData);
  };

  const HandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let ImageString: string | undefined;

    try {
      if (inputs.Photo?.file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          ImageString = reader.result as string;

          SendData(ImageString);
        };
        reader.readAsDataURL(inputs.Photo.file);
      } else SendData("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <img src={Photo} alt="" />

        <span>
          <span className="register-logo">
            <h2>
              <img src={Photo2} alt="" />
              Register
            </h2>

            {message && <h4>{message}</h4>}

            <MdClose
              size={25}
              color="#ff0000"
              className="register-close"
              onClick={() => method.click({ click, setClick })}
            />
          </span>

          <Input input={RegisterInput} setInput={setInputs} />

          <button onClick={(e) => HandleSubmit(e)}>Sign Up</button>

          <p>
            Already Have An Account? <h3>Sign In</h3>
          </p>
        </span>
      </div>
    </div>
  );
};
