import { useState } from "react";
import { Navbar } from "../../../Components/Navbar/Navbar";
import { Sidebar } from "../../../Components/Sidebar/Sidebar";

import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  const [click, setClick] = useState<boolean>(false);
  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar click={click} setClick={setClick} />
        <Outlet />
      </div>
    </div>
  );
};
