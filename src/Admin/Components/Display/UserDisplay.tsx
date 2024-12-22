import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";

import "./Display.scss";
import { DisplayType } from "./Types";
import {
  UsersInputType,
  UsersType,
} from "../../../Utils/Types/AuthContextTypes";
import { www } from "../../../Utils/URLS/Urls";
import Photo from "../../../Assets/CC-Logo-Light.png";
import { server } from "../../../Utils/Server/Server";
import { Input } from "../../../Components/Inputs/Input";
import { method } from "../../../Utils/Functions/Functions";
import { UsersInput } from "../../../Utils/Objects/InputObjects";

export const UserDisplay = <T extends UsersType>({
  index,
  display,
  setDisplay,
}: DisplayType<T>) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [updateUser, setupdateUser] = useState<UsersInputType>({
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

  const [user, setUser] = useState<UsersType>({
    id: 0,
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Phone_No: 0,
    Location: "",
    Photo: "",
  });

  const { UserUpdate } = UsersInput(updateUser);

  const handleGet = async () => {
    const response = await server.get(`${www.admin.get_user}/${display.id}`);
    console.log(response);

    setUser(response[0]);
    setupdateUser(response[0]);
  };

  const sendData = async (base64Image: string) => {
    const userData = base64Image
      ? {
          ...updateUser,
          Image: base64Image,
        }
      : updateUser;

    server.put(`${www.users.put}/${display.id}`, userData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let base64Image = "";

    if (updateUser.Photo?.file) {
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        base64Image = reader.result as string;
        sendData(base64Image);
      };

      reader.readAsDataURL(updateUser.Photo?.file);
    } else {
      sendData("");
    }
  };

  useEffect(() => {
    handleGet();
  }, [display.id]);

  return (
    <div className="display">
      <div className="display-container">
        <span className="display-left">
          <img className="display-image" src={display.Photo} alt="" />
        </span>

        <span className="display-right">
          <span>
            <img src={Photo} alt="" />

            <MdClose
              size={35}
              color="#ff0000"
              onClick={() => method.ArrayClick({ index, setClick: setDisplay })}
            />
          </span>

          <h4>Firstname {user.Firstname}</h4>
          <h4>Lastname: {user.Lastname}</h4>
          <h4>Email: {user.Email}</h4>
          <h4>Phone Number: {user.Phone_No}</h4>
          <h4> Location: {user.Location}</h4>

          <span>
            <h4>Purchases:</h4>
            
            <span className="purchases">
              {user.Purchases?.map((product) => (
                <h5>
                  {product.Name
                    ? `${product.Name}: ${product.Quantity}`
                    : "No Purchase Made"}
                </h5>
              ))}
            </span>
          </span>
          <span>
            <FaPen
              size={20}
              onClick={() => method.click({ click: edit, setClick: setEdit })}
            />
            <MdDelete color="#ff0000" size={30} />
          </span>
        </span>

        {edit && (
          <div className="update-users">
            <form>
              <span className="close">
                <MdClose
                  size={30}
                  onClick={() =>
                    method.click({
                      click: edit,
                      setClick: setEdit,
                    })
                  }
                />

                <h2>Edit</h2>
              </span>

              <span>
                {<Input input={UserUpdate} setInput={setupdateUser} />}
              </span>

              <button onClick={handleSubmit}>Update</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
