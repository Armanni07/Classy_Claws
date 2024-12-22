import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaCartArrowDown, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import "./Display.scss";
import { Login } from "../Auth/Login/Login";
import { www } from "../../Utils/URLS/Urls";
import { useAuth } from "../../Hooks/UseAuth";
import Photo from "../../Assets/CC-Logo-Light.png";
import { server } from "../../Utils/Server/Server";
import { method } from "../../Utils/Functions/Functions";
import { ProductsType } from "../../Admin/Pages/Products/Types";
import { DisplayType } from "../../Admin/Components/Display/Types";

export const ProductDisplay = <T extends ProductsType>({
  index,
  display,
  setDisplay,
  productCount,
  setProductCount,
}: DisplayType<T>) => {
  const { loggedIn } = useAuth();
  const [product, setProduct] = useState<ProductsType>();
  const [loginClick, setLoginClick] = useState<boolean>(false);

  const message: string = "Log In to access This Feature";

  const HandleGet = async () => {
    const response = await server.get(`${www.products.get}/${display.id}`);
    console.log(response[0]);
    setProduct(response[0]);
  };

  useEffect(() => {
    HandleGet();
  }, [product?.Description]);

  return (
    <div className="displays">
      <div className="display-container">
        <span className="display-left">
          <img src={display.Image} alt="" />
        </span>

        <span className="display-right">
          <span className="logo">
            <img src={Photo} alt="" />

            <MdClose
              size={35}
              color="#ff0000"
              onClick={() => method.ArrayClick({ index, setClick: setDisplay })}
            />
          </span>

          <span className="column">
            <h3> {product?.Name}</h3>
            <h6> {product?.Serial_Code}</h6>
          </span>

          <h4> {product?.Description}</h4>

          <h4 style={{ fontSize: "2.5rem" }}>⍧{product?.SalePrice}</h4>

          <h4> Type: {product?.Category?.Name}</h4>

          <span className="column">
            <h4>
              {product?.Unit}
              {product?.MeasurementMethod} Available
            </h4>

            <h4>
              Status:
              {product && product?.LowStockThreshold > product?.Unit
                ? "Low Stock"
                : "Available"}
            </h4>
          </span>

          {productCount && productCount[index] > 0 ? (
            <span className="cart-count">
              <FaPlusCircle
                size={25}
                className="nums"
                onClick={() =>
                  setProductCount &&
                  method.AddClick({ i: index, setCount: setProductCount })
                }
              />

              <h2>{productCount && productCount[index]}</h2>

              <FaMinusCircle
                size={25}
                className="nums"
                onClick={() =>
                  setProductCount &&
                  method.SubClick({ i: index, setCount: setProductCount })
                }
              />
            </span>
          ) : (
            <button
              onClick={() =>
                loggedIn
                  ? setProductCount &&
                    method.AddClick({ i: index, setCount: setProductCount })
                  : method.click({
                      click: loginClick,
                      setClick: setLoginClick,
                    })
              }
            >
              <FaCartArrowDown size={25} />
            </button>
          )}
        </span>
      </div>

      {loginClick && (
        <Login click={loginClick} message={message} setClick={setLoginClick} />
      )}
    </div>
  );
};
