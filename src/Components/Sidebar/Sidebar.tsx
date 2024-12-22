import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Sidebar.scss";
import { www } from "../../Utils/URLS/Urls";
// import { Info } from "../../Pages/Info/Info";
import { useAuth } from "../../Hooks/UseAuth";
import { server } from "../../Utils/Server/Server";
import { method } from "../../Utils/Functions/Functions";
import { SidebarType } from "../../Utils/Types/ObjectTypes";
import { ClickType } from "../../Utils/Types/FunctionTypes";
import { SideBarObjects } from "../../Utils/Objects/Objects";

export const Sidebar = ({ click, setClick }: ClickType) => {
  const path = useLocation();
  const pathname = path.pathname;

  const { loggedIn } = useAuth();
  const { SidebarList, AdminSidebarList } = SideBarObjects();

  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<{ CartCount: number }[]>([]);

  const GetData = async () => {
    try {
      const response = await server.get(`${www.cart.get}/user/sales`);
      setData(response);

      setCount(response[0].CartCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!pathname.includes("/admin") && loggedIn) {
      GetData();
    }
  }, [data, count, loggedIn]);

  return (
    <div
      className="sidebar"
      style={{
        backgroundColor: pathname.includes("/admin") ? "" : "#2c2a3e",
      }}
    >
      <div
        className="sidebar-container"
        style={{
          border: ".1rem solid #ffb3c6",
          alignItems: pathname.includes("/admin") ? "" : "center",
          borderTop: pathname === "/" ? "none" : ".1rem solid #ffb3c6",
          backgroundColor: pathname.includes("/admin") ? "" : "transparent",
          justifyContent: pathname.includes("/admin") ? "" : "space-between",
        }}
      >
        {pathname.includes("/admin")
          ? AdminSidebarList.map((sidebar: SidebarType, i: number) =>
              loggedIn ? (
                <Link
                  key={i}
                  to={sidebar.path as string}
                  className={pathname === sidebar.path ? "path" : ""}
                >
                  {sidebar.icon}
                </Link>
              ) : (
                ""
              )
            )
          : SidebarList.map((sidebar: SidebarType, i: number) => (
              <>
                {sidebar.name != "Mail" ? (
                  <Link
                    key={i}
                    to={sidebar.path as string}
                    className={pathname === sidebar.path ? "path" : ""}
                  >
                    {sidebar.icon}
                    {!pathname.includes("cart") &&
                      count > 0 &&
                      sidebar.path?.includes("cart") && <p>{count}</p>}
                  </Link>
                ) : (
                  <span
                    key={i}
                    className="info-icon"
                    style={{ backgroundColor: click ? "#ffb3c6" : "" }}
                    onClick={() => method.click({ click, setClick })}
                  >
                    {sidebar.icon}
                  </span>
                )}
              </>
            ))}
      </div>
    </div>
  );
};
