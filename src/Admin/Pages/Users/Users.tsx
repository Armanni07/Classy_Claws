import { MdClose } from "react-icons/md";
import React, { useEffect, useState } from "react";

import "./Users.scss";
import {
  UsersInputType,
  UsersType,
} from "../../../Utils/Types/AuthContextTypes";
import { www } from "../../../Utils/URLS/Urls";
import { server } from "../../../Utils/Server/Server";
import { Input } from "../../../Components/Inputs/Input";
import { method } from "../../../Utils/Functions/Functions";
import { UsersInput } from "../../../Utils/Objects/InputObjects";
import { UserDisplay } from "../../Components/Display/UserDisplay";

export const Users = () => {
  const [formClick, setFormClick] = useState<boolean>(false);

  const [users, setUsers] = useState<UsersType[]>([
    {
      Firstname: "",
      Lastname: "",
      Email: "",
      Password: "",
      Phone_No: 0,
      Location: "",
      Photo: "",
    },
  ]);

  const [userClick, setUserClick] = useState<boolean[]>(
    Array.from({ length: users.length }, () => false)
  );

  const [userForm, setUserForm] = useState<UsersInputType>({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Phone_No: 0,
    Location: "",
    Photo: { file: undefined, ImageUrl: "" },
  });

  const { UserInput } = UsersInput();

  const handleGet = async () => {
    try {
      const response = await server.get(www.admin.get_user);
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const SendData = (image: string) => {
    const UserData = {
      ...userForm,
      Photo: image,
    };

    server.post(www.users.register, UserData);
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let Base64Image = "";
    try {
      if (userForm.Photo?.file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          Base64Image = reader.result as string;
          SendData(Base64Image);
        };

        reader.readAsDataURL(userForm.Photo.file);
      } else {
        SendData("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="admin-users">
      <span>
        <h2>Users</h2>

        <button
          onClick={() =>
            method.click({ click: formClick, setClick: setFormClick })
          }
        >
          +New User
        </button>
      </span>

      <div className="users-container">
        {users.map((user, i: number) => (
          <div key={i} className="user-info">
            <img
              src={user.Photo}
              alt="No Photo"
              onClick={() =>
                method.ArrayClick({ index: i, setClick: setUserClick })
              }
            />

            <span className="user-preview">
              <h3>{user.Firstname}</h3>
              <h3>{user.Location}</h3>
            </span>

            {userClick[i] && (
              <UserDisplay index={i} display={user} setDisplay={setUserClick} />
            )}
          </div>
        ))}
      </div>

      {formClick && (
        <div className="users-form">
          <form>
            <span>
              <h3>Add User</h3>

              <MdClose
                onClick={() =>
                  method.click({ click: formClick, setClick: setFormClick })
                }
              />
            </span>

            {userForm.Photo?.ImageUrl && <img src={userForm.Photo?.ImageUrl} />}

            <Input input={UserInput} setInput={setUserForm} />

            <div>
              <button type="submit" onClick={(e) => HandleSubmit(e)}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
