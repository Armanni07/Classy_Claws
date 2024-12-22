import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Mail } from "../Mail/Mail";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";

export const Layout = () => {
  const [mail, setMail] = useState<boolean>(false);
  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar click={mail} setClick={setMail} />
        <Outlet />
        {mail && <Mail setClick={setMail} />}
      </div>
    </div>
  );
};
