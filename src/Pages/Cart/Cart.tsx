import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import "./Cart.scss";
import { CartType } from "./Types";
import { MdDelete } from "react-icons/md";
import { www } from "../../Utils/URLS/Urls";
import { useAuth } from "../../Hooks/UseAuth";
import { server } from "../../Utils/Server/Server";
import { method } from "../../Utils/Functions/Functions";
import { SalesType } from "../../Admin/Pages/Sales/Types";
import { Delivery } from "../../Components/Delivery/Delivery";

export const Cart = () => {
  const { loggedIn } = useAuth();

  const path = useLocation();
  const pathname = path.pathname;

  const [done, setDone] = useState<boolean>(false);
  const [delivery, setDelivery] = useState<boolean>(false);

  const [cart, setCart] = useState<CartType[]>([]);
  const [total, setTotal] = useState<{ Total: number }>();

  const [count, setCount] = useState<number[]>(
    cart.map((item) =>
      JSON.parse(
        localStorage.getItem(`ProductCount${item.Product_ID}`) ||
          `${item.Quantity}`
      )
    )
  );

  const GetData = async () => {
    const data = await server.get(www.cart.get);
    setCart(data);

    const data2 = await server.get(`${www.cart.get}/total`);
    setTotal(data2[0]);

    const data3 = await server.get(`${www.sales.delivery}`);
    setDelivery(data3.some((item: SalesType) => item.Status === "Sending"));
  };

  const HandleBuy = async () => {
    const SalesData = cart.map((item) => ({
      Product_ID: item.Product_ID,
      Quantity: item.Quantity,
      SalePrice: item.SalePrice,
      User_ID: item.User_ID,
    }));

    console.log(SalesData);

    await server.post(www.sales.post, SalesData);
    setDone(true);
  };

  useEffect(() => {
    if (!pathname.includes("/admin") && loggedIn) {
      GetData();
    }

    const fetchProductCounts = () => {
      const counts = cart.map((item) => {
        if (done) {
          localStorage.removeItem(`ProductCount${item.Product_ID}`);
          return 0;
        } else {
          return JSON.parse(
            localStorage.getItem(`ProductCount${item.Product_ID}`) || "0"
          );
        }
      });

      setCount(counts);
    };

    fetchProductCounts();
  }, [done, count[0], total?.Total]);

  return (
    <div className="cart">
      <span className="page-name">
        <h1> Cart</h1>
      </span>

      {loggedIn ? (
        <>
          <div className="cart-container">
            <section className="cart-left">
              {cart.length > 0 ? (
                cart.map((item, i) => (
                  <span key={i} className="cart-item">
                    <span className="name">
                      <img src={item.Image} alt="" />

                      <span className="item-details">
                        <h2>{item.Name}</h2>

                        <span style={{ display: "flex" }}>
                          <h5 style={{ color: "#888" }}>
                            {item.Unit} {item.Unit > 1 ? "PCS " : "PC "}|
                          </h5>

                          <h5
                            style={{
                              color:
                                item.Status === "In Stock"
                                  ? "#82ca9d"
                                  : item.Status === "Low Stock"
                                  ? "#f39c12"
                                  : "#ff0000",
                            }}
                          >
                            {item.Status}
                          </h5>
                        </span>

                        <MdDelete color="#ff0000" size={20} />
                      </span>
                    </span>

                    <span className="cart-item-right">
                      <span className="cart-details">
                        <h2>⍧{item.SalePrice}</h2>

                        <span className="cart-count">
                          <FaPlusCircle
                            size={25}
                            onClick={(e) =>
                              method.AddCartData({
                                e,
                                i,
                                count,
                                setDone,
                                setCount,
                                id: item.Product_ID as number,
                              })
                            }
                          />

                          <p>
                            {count[i]}
                            {item.Quantity === 1
                              ? " pc"
                              : item.Quantity > 1
                              ? " pcs"
                              : ""}
                          </p>

                          <FaMinusCircle
                            size={25}
                            onClick={(e) =>
                              method.SubCartData({
                                e,
                                i,
                                count,
                                setDone,
                                setCount,
                                id: item.Product_ID as number,
                              })
                            }
                          />
                        </span>
                      </span>
                    </span>
                  </span>
                ))
              ) : (
                <h1>No Items in Your Cart</h1>
              )}
            </section>

            <section className="cart-right">
              {cart.map((product, i) => (
                <span key={i} className="order-list">
                  <h3>{product.Name} :</h3>
                  <h3>
                    ⍧{method.multiply(product.SalePrice, product.Quantity)}
                  </h3>
                </span>
              ))}

              <span className="order">
                <span className="total">
                  <h2>Total :</h2> <h1> ⍧{total?.Total || 0}</h1>
                </span>

                <button onClick={HandleBuy}>Buy</button>
              </span>
            </section>
          </div>
          {delivery && <Delivery />}
        </>
      ) : (
        <h1> Log In / Sign Up To Access This Feature</h1>
      )}
    </div>
  );
};
