import { FormEvent } from "react";
import { FaCartArrowDown, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import "../../Pages/Products/Products.scss";
import { www } from "../../Utils/URLS/Urls";
import { useAuth } from "../../Hooks/UseAuth";
import { server } from "../../Utils/Server/Server";
import { method } from "../../Utils/Functions/Functions";
import { ProductDisplay } from "../Display/ProductDisplay";
// import { Login } from "../../Components/Auth/Login/Login";

import { CategorySectionsType } from "../../Utils/Types/CategoryPropTypes";

export const CategorySections = ({
  items,
  itemCount,
  itemClick,
  loginClick,
  setItemCount,
  setItemClick,
  setLoginClick,
}: CategorySectionsType) => {
  const { loggedIn } = useAuth();

  const AddData = async (e: FormEvent, i: number, id: number) => {
    e.preventDefault();
    method.AddClick({ i, setCount: setItemCount });

    const data = {
      Product_ID: id,
      Quantity: itemCount[i] + 1,
    };

    localStorage.setItem(`ProductCount${id}`, JSON.stringify(itemCount[i] + 1));

    server.post(www.cart.post, data);
  };

  const SubData = async (e: FormEvent, i: number, id: number) => {
    e.preventDefault();
    method.SubClick({ i, setCount: setItemCount });

    const data = {
      Product_ID: id,
      Quantity: itemCount[i] - 1,
    };

    localStorage.setItem(`ProductCount${id}`, JSON.stringify(data.Quantity));

    server.post(www.cart.post, data);
  };

  return (
    <>
      {items &&
        items.map((product, i) => (
          <span key={i} className="product-list">
            <img
              src={product.Image}
              alt=""
              onClick={() =>
                method.ArrayClick({ index: i, setClick: setItemClick })
              }
            />

            <span className="product-info">
              <span>
                <h3>{product.Name}</h3>{" "}
                <h5
                  style={{
                    color:
                      product.Status === "In Stock"
                        ? "#82ca9d"
                        : product.Status === "Low Stock"
                        ? "#f39c12"
                        : "#ff0000",
                  }}
                >
                  {product.Status}
                </h5>
                <h4>⍧{product.SalePrice}</h4>
              </span>

              {itemCount[i] > 0 ? (
                <span className="cart-count">
                  <FaPlusCircle
                    size={25}
                    className="nums"
                    onClick={(e) => AddData(e, i, product.id as number)}
                  />

                  <h2>{itemCount[i]}</h2>

                  <FaMinusCircle
                    size={25}
                    className="nums"
                    onClick={(e) => SubData(e, i, product.id as number)}
                  />
                </span>
              ) : (
                <button
                  onClick={(e) =>
                    loggedIn
                      ? AddData(e, i, product.id as number)
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

            {itemClick[i] && (
              <ProductDisplay
                index={i}
                display={product}
                productCount={itemCount}
                setDisplay={setItemClick}
                setProductCount={setItemCount}
              />
            )}
          </span>
        ))}
    </>
  );
};
