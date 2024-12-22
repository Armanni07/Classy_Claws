import { useEffect, useState } from "react";

import "./Products.scss";
import { www } from "../../Utils/URLS/Urls";
import { server } from "../../Utils/Server/Server";
import { Login } from "../../Components/Auth/Login/Login";
import { ProductsType } from "../../Admin/Pages/Products/Types";
import { CategorySections } from "../../Components/Sections/CategorySections";

export const Products = () => {
  const message: string = "Log In to access This Feature";

  const [category, setCategory] = useState<string>("All");

  const [nails, setNails] = useState<ProductsType[]>([]);
  const [rings, setRings] = useState<ProductsType[]>([]);
  const [products, setProducts] = useState<ProductsType[]>([]);

  const [loginClick, setLoginClick] = useState<boolean>(false);

  const [productClick, setProductClick] = useState<boolean[]>(
    Array.from({ length: products.length }, () => false)
  );

  const [productCount, setProductCount] = useState<number[]>(
    products.map((product) =>
      JSON.parse(localStorage.getItem(`ProductCount${product.id}`) || "0")
    )
  );

  const HandleGet = async () => {
    if (category === "All") {
      const response: ProductsType[] = await server.get(www.products.get);
      setProducts(response);
    }

    if (category === "Nails") {
      const response2: ProductsType[] = await server.get(
        `${www.categories.get}/product_category/${category}`
      );
      setNails(response2);
    }

    if (category === "Rings") {
      const response3: ProductsType[] = await server.get(
        `${www.categories.get}/product_category/${category}`
      );
      setRings(response3);
    }
  };

  useEffect(() => {
    HandleGet();
    const count = products.map((product) => {
      return JSON.parse(
        localStorage.getItem(`ProductCount${product.id}`) || "0"
      );
    });

    console.log(count);

    setProductCount(count);
  }, [products.length, category]);

  return (
    <div className="products">
      <span className="page-name">
        <h1>Products</h1>

        <span className="product-list">
          <h4
            onClick={() => setCategory("All")}
            className={category === "All" ? "active" : undefined}
          >
            All
          </h4>

          <h4
            onClick={() => setCategory("Nails")}
            className={category === "Nails" ? "active" : undefined}
          >
            Nails
          </h4>

          <h4
            onClick={() => setCategory("Rings")}
            className={category === "Rings" ? "active" : undefined}
          >
            Rings
          </h4>
        </span>
      </span>

      <div className="products-container">
        <>
          {category === "All" && (
            <CategorySections
              items={products}
              loginClick={loginClick}
              itemCount={productCount}
              itemClick={productClick}
              setLoginClick={setLoginClick}
              setItemClick={setProductClick}
              setItemCount={setProductCount}
            />
          )}
        </>

        <>
          {category === "Nails" && (
            <CategorySections
              items={nails}
              loginClick={loginClick}
              itemCount={productCount}
              itemClick={productClick}
              setLoginClick={setLoginClick}
              setItemClick={setProductClick}
              setItemCount={setProductCount}
            />
          )}
        </>

        <>
          {category === "Rings" && (
            <CategorySections
              items={rings}
              loginClick={loginClick}
              itemCount={productCount}
              itemClick={productClick}
              setLoginClick={setLoginClick}
              setItemClick={setProductClick}
              setItemCount={setProductCount}
            />
          )}
        </>
      </div>

      {loginClick && (
        <Login click={loginClick} message={message} setClick={setLoginClick} />
      )}
    </div>
  );
};
