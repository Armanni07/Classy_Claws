import { MdLogout, MdMail } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";

import "./Navbar.scss";
import { Search } from "../Search/Search";
import { Login } from "../Auth/Login/Login";
import { www } from "../../Utils/URLS/Urls";
import { Confirm } from "../Confirm/Confirm";
import { useAuth } from "../../Hooks/UseAuth";
import Logo from "../../Assets/CC-Logo-Light.png";
import { server } from "../../Utils/Server/Server";
import { Register } from "../Auth/Register/Register";
import { method } from "../../Utils/Functions/Functions";
import { ProductsType } from "../../Admin/Pages/Products/Types";
import { Mail } from "../../Admin/Components/Mail/Mail";

export const Navbar = () => {
  const path = useLocation();
  const pathname = path.pathname;

  const message = "Log Out?";

  const { loggedIn, logout, UserLogout } = useAuth();

  const [dp, setDp] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");
  const [search, setSearch] = useState<ProductsType[]>([]);

  const [mail, setMail] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [searchClick, setSearchClick] = useState<boolean>(false);
  const [adminConfirm, setAdminConfirm] = useState<boolean>(false);

  const adminLogOut = async () => {
    logout();
    window.location.href = "/admin";
  };

  const userLogOut = async () => {
    UserLogout();
    window.location.href = "/";
  };

  const GetData = async () => {
    try {
      const response =
        loggedIn &&
        !pathname.includes("admin") &&
        (await server.get(www.users.get));
      setDp(response[0].Photo);
    } catch (error) {
      console.log(error);
    }
  };

  const SearchData = async () => {
    try {
      const response = await server.get(`${www.products.search}/${name}`);
      setSearch(response);
      setSearchClick(true);
    } catch (error) {
      console.log(error);
    }
  };

  const DropDown = () => {
    setDropDown(false);
    method.click({ click: mail, setClick: setMail });
  };

  useEffect(() => {
    GetData();
  });

  return (
    <div
      className="navbar"
      style={{
        position: "relative",
        backgroundColor: pathname.includes("/admin") ? "" : "#2c2a3e",
      }}
    >
      <div className="left">
        <img src={Logo} alt="Logo" />

        <span className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setName(e.target.value)}
          />

          <FaSearch onClick={() => SearchData()} />
        </span>
      </div>

      <div className="right">
       

        <div>
          {loggedIn ? (
            <span onClick={() => setDropDown(!dropDown)}>
              {dp ? <img src={dp} /> : <FaUserCircle />}
            </span>
          ) : (
            <span className="auth">
              {!pathname.includes("/admin") && (
                <>
                  <span
                    className="button"
                    onClick={() => method.click({ click, setClick })}
                  >
                    Login
                  </span>
                  <span
                    className="button"
                    onClick={() =>
                      method.click({ click: register, setClick: setRegister })
                    }
                  >
                    Sign Up
                  </span>
                </>
              )}
            </span>
          )}
        </div>
        {/* <CiMenuKebab /> */}
      </div>

      {click && <Login click={click} setClick={setClick} />}
      {register && <Register click={register} setClick={setRegister} />}

      {dropDown && (
        <div className={dropDown && `drop-down`}>
          {pathname.includes("/admin") ? (
            <h4 className="nav-mail" onClick={() => DropDown()}>
              <MdMail size={35} />
              Mail
            </h4>
          ) : (
            <Link to="profile" onClick={() => setDropDown(false)}>
              <h4>
                <FaUserCircle size={35} />
                Profile
              </h4>
            </Link>
          )}

          <h4
            className="logout"
            onClick={() =>
              pathname.includes("admin")
                ? method.click({
                    click: adminConfirm,
                    setClick: setAdminConfirm,
                  })
                : method.click({
                    click: confirm,
                    setClick: setConfirm,
                  })
            }
          >
            <MdLogout size={35} /> Logout
          </h4>
        </div>
      )}

      {searchClick && (
        <Search
          search={search}
          name={name as string}
          setClick={setSearchClick}
        />
      )}

      {confirm && (
        <Confirm
          message={message}
          setClose={setConfirm}
          functions={userLogOut}
        />
      )}

      {adminConfirm && (
        <Confirm
          message={message}
          functions={adminLogOut}
          setClose={setAdminConfirm}
        />
      )}

      {mail && <Mail close={mail} setClose={setMail} />}
    </div>
  );
};
