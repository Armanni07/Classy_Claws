import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import { Cart } from "./Pages/Cart/Cart";
import { Home } from "./Pages/Home/Home";
import { useAuth } from "./Hooks/UseAuth";
import { Users } from "./Admin/Pages/Users/Users";
import { Staff } from "./Admin/Pages/Staff/Staff";
import { Profile } from "./Pages/Profile/Profile";
import { Sales } from "./Admin/Pages/Sales/Sales";
import { Login } from "./Admin/Pages/Login/Login";
import { Layout } from "./Components/Layouts/Layout";
import { Products } from "./Pages/Products/Products";
import { Admin } from "./Admin/Pages/Dashboard/Admin";
import { AdminProducts } from "./Admin/Pages/Products/Products";
import { AdminLayout } from "./Admin/Components/Layouts/AdminLayout";
import { AdminCategories } from "./Admin/Pages/Categories/Categories";
import { SplashScreen } from "./Components/SplashScreen/SplashScreen";

export const App = () => {
  const [start, setStart] = useState<boolean>(true);

  const { loggedIn} = useAuth();



  useEffect(() => {
    setTimeout(() => {
      setStart(false);
    }, 3000);
 
  }, [start]);

  return (
    <Router>
      <Routes>
        {start ? (
          <Route path="/" element={<SplashScreen />} />
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="profile" element={<Profile />} />
              <Route path="products" element={<Products />} />
            </Route>

            <Route path="admin" element={<AdminLayout />}>
              {!loggedIn ? (
                <Route index element={<Login />} />
              ) : (
                <>
                  <Route index element={<Admin />} />
                  <Route path="users" element={<Users />} />
                  <Route path="staff" element={<Staff />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                </>
              )}
            </Route>
          </>
        )}
      </Routes>
    </Router>
  );
};
