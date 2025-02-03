import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaCartArrowDown, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import "./ReviewSection.scss";
import { ReviewType } from "./Types";
import { www } from "../../../Utils/URLS/Urls";
import { useAuth } from "../../../Hooks/UseAuth";
import { CartType } from "../../../Pages/Cart/Types";
import { server } from "../../../Utils/Server/Server";
import { method } from "../../../Utils/Functions/Functions";

export const ReviewSection = ({ login, setLogin }: ReviewType) => {
  const { loggedIn } = useAuth();

  const SectionRef = useRef<HTMLElement>(null);

  const [done, setDone] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [option, setOption] = useState<string>("All");
  const [nails, setNails] = useState<CartType[]>([]);
  const [rings, setRings] = useState<CartType[]>([]);
  const [products, setProducts] = useState<CartType[]>([]);

  const [count, setCount] = useState<number[]>(
    products.map((product) =>
      JSON.parse(
        localStorage.getItem(`ProductCount${product.Product_ID}`) || "0"
      )
    )
  );

  const Options = [
    {
      Name: "All",
    },
    {
      Name: "Nails",
    },
    {
      Name: "Rings",
    },
  ];

  const ViewOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const HandleGet = async () => {
    if (option === "All") {
      const data = await server.get(`${www.sales.top}/user`);
      const products: [] = data.slice(0, 3);

      setProducts(products);
    }

    if (option === "Nails") {
      const data2 = await server.get(`${www.sales.top}/products/Nails`);

      setNails(data2);
    }

    if (option === "Rings") {
      const data3 = await server.get(`${www.sales.top}/products/Rings`);

      setRings(data3);
    }
  };

  useEffect(() => {
    HandleGet();

    const observer = new IntersectionObserver(
      method.SectionObserver,
      ViewOptions
    );
    observer.observe(SectionRef.current as HTMLElement);

    const counts = products.map((item) => {
      return JSON.parse(
        localStorage.getItem(`ProductCount${item.Product_ID}`) || "0"
      );
    });

    setCount(counts);
  }, [option, done, products.length]);

  return (
    <section ref={SectionRef} className="review-section">
      <span className="review-options">
        <h1>Our Popular Products</h1>

        <span>
          {Options.map((Option, i) => (
            <p
              key={i}
              onClick={() => setOption(Option.Name)}
              className={option === Option.Name ? "active" : ""}
            >
              {Option.Name}
            </p>
          ))}
        </span>
      </span>

      {option === "All" && (
        <span className={`review-grid ${hover && "active"} `}>
          {products?.map((product, i: number) => (
            <span
              key={i}
              className="review-item"
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              <img src={product.Image} alt="Loading..." />

              {hover && (
                <span className="review-grid-details">
                  <span className="review-details">
                    <h3>{product.Name}</h3>
                    <h3>⍧{product.SalePrice}</h3>
                  </span>

                  {count[i] > 0 ? (
                    <span className="cart-count">
                      <FaPlusCircle
                        size={25}
                        color="#ffb3c6"
                        onClick={(e) =>
                          method.AddCartData({
                            e,
                            i,
                            count,
                            setDone,
                            setCount,
                            id: product.Product_ID as number,
                          })
                        }
                      />

                      <h3>{count[i]}</h3>

                      <FaMinusCircle
                        size={25}
                        color="#ffb3c6"
                        onClick={(e) =>
                          method.SubCartData({
                            e,
                            i,
                            count,
                            setDone,
                            setCount,
                            id: product.Product_ID as number,
                          })
                        }
                      />
                    </span>
                  ) : (
                    <button
                      onClick={(e) =>
                        loggedIn
                          ? method.AddCartData({
                              e,
                              i,
                              count,
                              setDone,
                              setCount,
                              id: product.Product_ID as number,
                            })
                          : method.click({ click: login, setClick: setLogin })
                      }
                    >
                      <FaCartArrowDown size={25} color="#fff3f9" />
                    </button>
                  )}
                </span>
              )}
            </span>
          ))}
        </span>
      )}

      {option === "Nails" && (
        <span className={`review-grid ${hover && "active"} `}>
          {nails?.map((product, i: number) => (
            <span
              key={i}
              className="review-item"
              onMouseOut={() => setHover(false)}
              onMouseOver={() => setHover(true)}
            >
              <img src={product.Image} alt="Loading..." />
              {hover && (
                <span className="review-grid-details">
                  <span className="review-details">
                    <h3>{product.Name}</h3>
                    <h3>⍧{product.SalePrice}</h3>
                  </span>

                  {count[i] > 0 ? (
                    <span className="cart-count">
                      <FaPlusCircle
                        size={25}
                        color="#ffb3c6"
                        onClick={(e) =>
                          method.AddCartData({
                            e,
                            i,
                            count,
                            setDone,
                            setCount,
                            id: product.Product_ID as number,
                          })
                        }
                      />

                      <h3>{count[i]}</h3>

                      <FaMinusCircle
                        size={25}
                        color="#ffb3c6"
                        onClick={(e) =>
                          method.SubCartData({
                            e,
                            i,
                            count,
                            setDone,
                            setCount,
                            id: product.Product_ID as number,
                          })
                        }
                      />
                    </span>
                  ) : (
                    <button
                      onClick={(e) =>
                        loggedIn
                          ? method.AddCartData({
                              e,
                              i,
                              count,
                              setDone,
                              setCount,
                              id: product.Product_ID as number,
                            })
                          : method.click({ click: login, setClick: setLogin })
                      }
                    >
                      <FaCartArrowDown size={25} color="#fff3f9" />
                    </button>
                  )}
                </span>
              )}
            </span>
          ))}
        </span>
      )}

      {option === "Rings" && (
        <span className={`review-grid ${hover && "active"} `}>
          {rings?.map((product, i: number) => (
            <span
              key={i}
              className="review-item"
              onMouseOut={() => setHover(false)}
              onMouseOver={() => setHover(true)}
            >
              <img src={product.Image} alt="Loading..." />
              {hover && (
                <span className="review-grid-details">
                  <span className="review-details">
                    <h3>{product.Name}</h3>
                    <h3>⍧{product.SalePrice}</h3>
                  </span>

                  {count[i] > 0 ? (
                    <span className="cart-count">
                      <FaPlusCircle
                        size={25}
                        color="#ffb3c6"
                        onClick={(e) =>
                          method.AddCartData({
                            e,
                            i,
                            count,
                            setDone,
                            setCount,
                            id: product.Product_ID as number,
                          })
                        }
                      />

                      <h3>{count[i]}</h3>

                      <FaMinusCircle
                        size={25}
                        color="#ffb3c6"
                        onClick={(e) =>
                          method.SubCartData({
                            e,
                            i,
                            count,
                            setDone,
                            setCount,
                            id: product.Product_ID as number,
                          })
                        }
                      />
                    </span>
                  ) : (
                    <button
                      onClick={(e) =>
                        loggedIn
                          ? method.AddCartData({
                              e,
                              i,
                              count,
                              setDone,
                              setCount,
                              id: product.Product_ID as number,
                            })
                          : method.click({ click: login, setClick: setLogin })
                      }
                    >
                      <FaCartArrowDown size={25} color="#fff3f9" />
                    </button>
                  )}
                </span>
              )}
            </span>
          ))}
        </span>
      )}

      <h4>
        <Link to={"/products"}>See More...</Link>
      </h4>
    </section>
  );
};
