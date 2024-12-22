import { FaSquare } from "react-icons/fa6";
import { MdRefresh } from "react-icons/md";
import { useState, useEffect } from "react";
import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";

import "./Admin.scss";
import { www } from "../../../Utils/URLS/Urls";
import { server } from "../../../Utils/Server/Server";
import { method } from "../../../Utils/Functions/Functions";
import { Objects } from "../../../Utils/Objects/DashboardObjects";
import { UsersType } from "../../../Utils/Types/AuthContextTypes";

export const Admin = () => {
  const { DashBoardOBJ } = Objects();
  const [sales, setSales] = useState<
    { Name: string; SalePrice: number; Quantity: number }[]
  >([
    {
      Name: "",
      SalePrice: 0,
      Quantity: 0,
    },
  ]);
  const [products, setProducts] = useState<object[]>([{}]);
  const [productList, setProductList] = useState<UsersType[]>([
    {
      Firstname: "",
      Lastname: "",
      Email: "",
      Phone_No: 0,
      Location: "",
      Photo: "",
    },
  ]);

  const HandleGet = async () => {
    const response = await server.get(`${www.products.get}/chart`);
    // console.log(response);
    setProducts(response);

    const response2 = await server.get(`${www.admin.get_user}-list`);
    console.log(response2);
    setProductList(response2);

    const response3 = await server.get(`${www.sales.get}/top`);
    console.log(response3);
    setSales(response3);
  };

  useEffect(() => {
    HandleGet();
  }, []);

  return (
    <div className="admin">
      <div className="admin-home-container">
        <div className="admin-top">
          {DashBoardOBJ.map((dash, i) => (
            <span key={i}>
              <div className="dash-title">
                <div
                  className="dash-title-icon"
                  style={{ backgroundColor: dash.color }}
                >
                  {dash.icon}
                </div>

                <div>
                  <h3>{dash.name}</h3>
                  <h4>{dash.value1}</h4>
                </div>
              </div>

              {dash.chart}

              <div className="dash-values">
                <h4>{dash.value2}</h4>

                <h4>{dash.value3}</h4>
              </div>
            </span>
          ))}

          <div className="dash-button">
            <button>
              Refresh
              <MdRefresh />
            </button>
          </div>
        </div>

        <div className="admin-bottom">
          <div className="admin-bottom-left">
            <span>
              <h3>Inventory</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart width={730} height={250} data={products}>
                  <XAxis dataKey="Name" />
                  <YAxis />
                  <Bar barSize={25} dataKey="Unit" fill="#82ca9d" />
                  <Bar barSize={25} dataKey="damaged" fill="#8e3a59" />
                  <Bar barSize={25} dataKey="sold" fill="#f39c12" />
                </BarChart>
              </ResponsiveContainer>

              <span className="chart-details">
                <h5>
                  <FaSquare color="#82ca9d" /> Total Products
                </h5>

                <h5>
                  <FaSquare color="#8e3a59" /> Damaged Products
                </h5>

                <h5>
                  <FaSquare color="#f39c12" /> Sold Products
                </h5>
              </span>
            </span>

            <span>
              <h3>User List</h3>
              <table border={0}>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Units</th>
                    <th>Status</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {productList.map((user, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        {user.Firstname} {user.Lastname}
                      </td>
                      <td>{user.Purchases?.length} Item(s)</td>
                      <td>{user.Status}</td>
                      <td>
                        ⍧
                        {method.sum(
                          user.Purchases?.map((item) => item.Price as number)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </span>
          </div>

          <div className="admin-bottom-right">
            <h5>Top Products</h5>

            <div className="admin-bottom-right-container">
              <table border={0}>
                <thead>
                  <tr>
                    {/* <th>No.</th> */}
                    <th>Product Name</th>
                    <th>Progress</th>
                  </tr>
                </thead>

                <tbody>
                  {sales.map((sale, i) => (
                    <tr key={i}>
                      {/* <td>{i + 1}</td> */}
                      <td>{sale.Name}</td>
                      <td>⍧{method.multiply(sale.SalePrice, sale.Quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
