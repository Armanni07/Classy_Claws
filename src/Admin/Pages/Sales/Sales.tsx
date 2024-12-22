import { useEffect, useState } from "react";

import "./Sales.scss";
import { SalesType } from "./Types";
import { www } from "../../../Utils/URLS/Urls";
import { server } from "../../../Utils/Server/Server";
import { method } from "../../../Utils/Functions/Functions";
import { ActiveSales } from "../../Components/ActiveSales/ActiveSales";

export const Sales = () => {
  const [sales, setSales] = useState<SalesType[]>([]);

  const [activeSales, setActiveSales] = useState<boolean>(false);

  const GetData = async () => {
    const data = await server.get(www.sales.get);
    console.log(data);

    setSales(data);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="admin-sales">
      <span className="sales-header-section">
        <h1>Sales</h1>

        <button
          className="sales-button"
          onClick={() =>
            method.click({ click: activeSales, setClick: setActiveSales })
          }
        >
          Active Sale(s)
        </button>
      </span>

      <div className="admin-sales-container">
        <table>
          <thead>
            <tr>
              <th>
                <h4>Customer Name</h4>
              </th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Sale Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale, i: number) => (
              <tr key={i}>
                <td>
                  <h4>
                    <img src={sale.Photo} alt="" /> {sale.Firstname}{" "}
                    {sale.Lastname}
                  </h4>
                </td>

                <td>
                  <img src={sale.Image} alt="" />
                  {sale.Name}
                </td>

                <td>⍧{sale.SalePrice}</td>

                <td>{sale.Quantity}PC(S)</td>

                <td>⍧{sale.Price}</td>

                <td>{method.dates(sale.Sales_Date)}</td>

                <td>{sale.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeSales && (
        <ActiveSales click={activeSales} setClick={setActiveSales} />
      )}
    </div>
  );
};
