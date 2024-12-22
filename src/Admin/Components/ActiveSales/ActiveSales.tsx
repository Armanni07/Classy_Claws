import { MdClose } from "react-icons/md";
import { FormEvent, useEffect, useState } from "react";

import "./ActiveSales.scss";
import { www } from "../../../Utils/URLS/Urls";
import { SalesType } from "../../Pages/Sales/Types";
import { server } from "../../../Utils/Server/Server";
import { method } from "../../../Utils/Functions/Functions";
import { ClickType } from "../../../Utils/Types/FunctionTypes";
import { UsersType } from "../../../Utils/Types/AuthContextTypes";

export const ActiveSales = ({ click, setClick }: ClickType) => {
  const [id, setId] = useState<number>(0);

  const [activeSales, setActiveSales] = useState<UsersType[]>([]);
  const [activeSalesUser, setActiveSalesUser] = useState<SalesType[]>([]);

  const GetData = async () => {
    const response = await server.get(www.sales.active);
    setActiveSales(response);

    if (id) {
      const response2 = await server.get(`${www.sales.active}/${id}`);
      setActiveSalesUser(response2);
    }
  };

  const SendData = async (e: FormEvent) => {
    e.preventDefault();
    const response = await server.put(`${www.sales.admin}/${id}`, {
      Status: "Completed",
    });

    console.log(response);
    GetData();
  };

  useEffect(() => {
    console.log(id);
    GetData();
  }, [id]);

  return (
    <div className="active-sales">
      <span className="active-sales-header">
        <MdClose
          size={35}
          color="#FF0000"
          onClick={() => {
            setId(0);
            method.click({ click, setClick });
          }}
        />
      </span>

      <div className="active-sales-container">
        <span className="active-sales-left">
          <h3 className="active-sales-total">Active Sales</h3>

          <span className="active-sales-user">
            <h3>Users ({activeSales.length})</h3>

            <span>
              {activeSales.length > 0 &&
                activeSales.map((user, i: number) => (
                  <span
                    key={i}
                    className="active-sales-user-item"
                    onClick={() => setId(user.id as number)}
                  >
                    <img src={user.Photo} alt="" />

                    <h5>
                      {user.Firstname} {user.Lastname}
                    </h5>
                  </span>
                ))}
            </span>
          </span>
        </span>

        <span className="active-sales-right">
          <button onClick={(e) => SendData(e)}>Confirm</button>
          {activeSalesUser.map((sale, i: number) => (
            <div key={i} className="active-sales-item">
              <img src={sale.Image} alt="" />
              <span className="active-sales-item-details">
                <span>
                  <h4>Item: {sale.Name}</h4>
                  <h4>Price: {sale.SalePrice}</h4>
                  <h4>Quantity: {sale.Quantity}PC(S)</h4>
                </span>

                <span>
                  <h4>Total Price: {sale.Price}</h4>
                  <h4>Sale Date: {method.dates(sale.Sales_Date)}</h4>
                  <h4>Status: {sale.Status}</h4>
                </span>
              </span>
            </div>
          ))}
        </span>
      </div>
    </div>
  );
};
