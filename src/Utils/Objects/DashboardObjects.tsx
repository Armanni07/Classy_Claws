import {
  Bar,
  Line,
  XAxis,
  YAxis,
  BarChart,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlinePointOfSale } from "react-icons/md";

// import { Data } from "./Objects";
import { server } from "../Server/Server";
import Photo from "../../Assets/IMG_8794.jpg";
import { AdminProductType, DashboardOBJType } from "../Types/ObjectTypes";
import { www } from "../URLS/Urls";

export const Objects = () => {
  const [users, setUsers] = useState<object[]>([{}]);
  const [sales, setSales] = useState<object[]>([{}]);
  const [products, setProducts] = useState<object[]>([{}]);
  const [damaged, setDamaged] = useState<object[]>([{}]);

  const HandleGet = async () => {
    const response = await server.get(www.admin.get_user);
    setUsers(response);

    const response2 = await server.get(www.sales.get);
    setSales(response2);

    const response3 = await server.get(www.products.get);
    setProducts(response3);

    const response4 = await server.get(www.damagedItems.get);
    setDamaged(response4);
  };

  useEffect(() => {
    HandleGet();
  }, []);

  const DashBoardOBJ: DashboardOBJType[] = [
    {
      color: "#056dff",
      icon: <FaUsers />,
      name: "Users",
      value1: `${users.length} user(s)`,
      value2: ``,
      value3: ``,
      chart: (
        <ResponsiveContainer width="100%" height="40%">
          <LineChart data={products} margin={{ top: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />

            <Line type="monotone" dataKey="pv" stroke="#056dff" />
            <Line type="monotone" dataKey="uv" stroke="#056dae" />
          </LineChart>
        </ResponsiveContainer>
      ),
    },

    {
      color: "#f39c12",
      icon: <MdOutlinePointOfSale />,
      name: "Revenue",
      value1: `${sales.length} Complete Sale(s)`,
      value2: `Total: ${sales.length} Verified Sale(s)`,
      value3: "10",

      chart: (
        <ResponsiveContainer width="100%" height="40%">
          <LineChart data={products} margin={{ top: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="pv" stroke="#f39c12" />
            <Line type="monotone" dataKey="uv" stroke="#ff0000" />
          </LineChart>
        </ResponsiveContainer>
      ),
    },

    {
      color: "#fff",
      icon: <AiOutlineProduct color="#000" />,
      name: "Inventory",
      value1: `Total: ${products.length} Item(s)`,
      value2: `Sold: ${sales.length}pc(s)`,
      value3: `Damaged: ${damaged.length}pc(s)`,
      chart: (
        <ResponsiveContainer width="80%" height="40%">
          <BarChart data={products}>
            <XAxis dataKey="name" />
            <YAxis />

            <Bar dataKey="pv" fill="#000000" />
            <Bar dataKey="uv" fill="#056dff" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
  ];

  const ProductData: AdminProductType[] = [
    {
      name: "Matte Black",
      img: Photo,
      qty: 140,
      dmg: 10,
      sold: 100,
    },

    {
      name: "Matte Blue",
      img: Photo,
      qty: 150,
      dmg: 8,
      sold: 80,
    },

    {
      name: "Rose Pink",
      img: Photo,
      qty: 120,
      dmg: 65,
      sold: 75,
    },

    {
      name: "Glossy Purple",
      img: Photo,
      qty: 140,
      dmg: 17,
      sold: 100,
    },

    {
      name: "Glossy Rosemary",
      img: Photo,
      qty: 150,
      dmg: 78,
      sold: 80,
    },

    {
      name: "Purple",
      img: Photo,
      qty: 120,
      dmg: 7,
      sold: 75,
    },
  ];

  return { DashBoardOBJ, ProductData };
};
