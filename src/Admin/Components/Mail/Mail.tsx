import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";

import "./Mail.scss";
import { MailProps, MailType } from "./Types";
import { www } from "../../../Utils/URLS/Urls";
import { server } from "../../../Utils/Server/Server";
import { UsersType } from "../../../Utils/Types/AuthContextTypes";
import { FaUserCircle } from "react-icons/fa";
import { method } from "../../../Utils/Functions/Functions";

export const Mail = ({ close, setClose }: MailProps) => {
  const [id, setId] = useState<number | null>(null);
  const [mail, setMail] = useState<MailType[]>([]);
  const [users, setUsers] = useState<UsersType[]>([]);

  const GetData = async () => {
    const response = await server.get(www.mail.get);
    console.log(response);
    setUsers(response);

    const response2 = id && (await server.get(`${www.mail.get}/${id}`));
    console.log(response2);
    setMail(response2);

    if (!close) {
      setId(null);
    }
  };

  useEffect(() => {
    GetData();
  }, [id]);

  return (
    <section className="admin-mail">
      <span className="admin-mail-container">
        <span className="admin-mail-left">
          <span className="mail-header">
            <h1>Mail</h1>

            <MdClose
              size={25}
              color="#ff0000"
              onClick={() => setClose(false)}
            />
          </span>

          {users?.map((user, i: number) => (
            <span
              className={`mail-users ${user.id === id && "active"}`}
              key={i}
              onClick={() => setId(user.id as number)}
            >
              {user.Photo ? (
                <img src={user.Photo} alt="" className="mail-user-image" />
              ) : (
                <FaUserCircle />
              )}

              <h4>{user?.Firstname}</h4>
            </span>
          ))}
        </span>

        <span className="admin-mail-right">
          <span className="admin-mail-right-container">
            {mail?.map((mail, i: number) => (
              <span key={i} className="messages">
                <h4>{mail.Messages}</h4>
                <p>{method.dates(mail.Date)}</p>
              </span>
            ))}
          </span>
        </span>
      </span>
    </section>
  );
};
