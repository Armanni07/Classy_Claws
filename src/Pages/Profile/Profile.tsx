import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

import "./Profile.scss";
import { www } from "../../Utils/URLS/Urls";
import { server } from "../../Utils/Server/Server";
import { method } from "../../Utils/Functions/Functions";
import { UsersType } from "../../Utils/Types/AuthContextTypes";

export const Profile = () => {
  const [data, setData] = useState<UsersType | undefined>();

  const GetData = async () => {
    const response = await server.get(`${www.users.get}/profile`);
    if (response) {
      setData(response[0]);
    }
  };

  const Photo = data?.Photo;
  const Email = data?.Email;
  const Status = data?.Status;
  const Lastname = data?.Lastname;
  const Phone_No = data?.Phone_No;
  const Location = data?.Location;
  const Firstname = data?.Firstname;
  const Purchases = data?.Purchases;

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="profile">
      <section className="profile-left">
        <img src={Photo} alt="" />

        <span className="details">
          <FaPen size={20} />

          <h5>Status: {Status}</h5>

          <h2>
            Name : {Firstname} {Lastname}
          </h2>
          <h3>Phone Number : 0{Phone_No}</h3>
          <h3>Email : {Email}</h3>
          <h3>Address: {Location}</h3>
        </span>

        <span className="purchases">
          <h3> Purchases:</h3>

          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {Purchases?.map((item, i: number) => (
                <tr key={i} className="purchase-list">
                  <td>{i + 1}</td>
                  <td>{item.Name}</td>
                  <td className="price">
                    <p> x{item.Quantity}</p>⍧
                    {method.multiply(item.Quantity, item.Price as number)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </span>
      </section>

      <section className="profile-right">
        <div className="background-text">
          <h1>Classy Claws</h1>
        </div>

        <button className="delete">
          <MdDelete size={30} />
        </button>
      </section>
    </div>
  );
};
