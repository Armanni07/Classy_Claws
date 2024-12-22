import { AiFillProduct } from "react-icons/ai";
import { LuMails, LuMailX } from "react-icons/lu";
import { TbCategoryFilled } from "react-icons/tb";
import {
  FaHome,
  FaUsers,
  FaUsersCog,
  FaCartArrowDown,
  FaSellsy,
} from "react-icons/fa";

import { useAuth } from "../../Hooks/UseAuth";
import { SidebarType } from "../Types/ObjectTypes";

export const SideBarObjects = () => {
  const { loggedIn } = useAuth();

  const SidebarList: SidebarType[] = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome size={40} />,
    },

    {
      path: "/products",
      name: "Products",
      icon: <AiFillProduct size={40} />,
    },

    {
      // path: "/path",
      name: "Mail",
      icon: loggedIn ? <LuMails size={40} /> : <LuMailX size={40} />,
    },

    {
      path: "/cart",
      name: "Cart",
      icon: <FaCartArrowDown size={40} />,
    },
  ];

  const AdminSidebarList: SidebarType[] = [
    {
      path: "/admin",
      name: "Dashoard",
      icon: <FaHome size={40} />,
    },

    {
      path: "/admin/products",
      name: "Products",
      icon: <AiFillProduct size={40} />,
    },

    {
      path: "/admin/categories",
      name: "Categories",
      icon: <TbCategoryFilled size={40} />,
    },

    {
      path: "/admin/sales",
      name: "Sales",
      icon: <FaSellsy size={40} />,
    },

    {
      path: "/admin/users",
      name: "Users",
      icon: <FaUsers size={40} />,
    },

    {
      path: "/admin/staff",
      name: "Staff",
      icon: <FaUsersCog size={40} />,
    },
  ];

  return { SidebarList, AdminSidebarList };
};
