import { MdClose } from "react-icons/md";
import { FaHouseDamage } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import "./Products.scss";
import { www } from "../../../Utils/URLS/Urls";
import { server } from "../../../Utils/Server/Server";
import { Input } from "../../../Components/Inputs/Input";
import { ProductsInputType, ProductsType } from "./Types";
import { method } from "../../../Utils/Functions/Functions";
import { ProductsInput } from "../../../Utils/Objects/InputObjects";
import { ProductDisplay } from "../../Components/Display/ProductDisplay";
import { DamagedItems } from "../DamagedItems/DamagedItems";

export const AdminProducts = () => {
  const { ProductInput } = ProductsInput();
  const [click, setClick] = useState<boolean>(false);
  const [damageClick, setDamageClick] = useState<boolean>(false);

  const [product, setProduct] = useState<ProductsType[]>([
    {
      Name: "",
      Description: "",
      Serial_Code: "",
      BarCode: "",
      MeasurementMethod: "",
      Unit: 0,
      LowStockThreshold: 0,
      SalePrice: 0,
      CostPrice: 0,
      Image: "",
      Category_Id: 0,
      Created_By: 0,
      Updated_By: 0,
      Date_Created: new Date(),
      Date_Updated: new Date(),
      Discount_Id: "",
    },
  ]);

  const [productClick, setProductClick] = useState(
    Array.from({ length: product.length }, () => false)
  );

  const [category, setCategory] = useState<{ Name: ""; id: number }[]>([
    { Name: "", id: 0 },
  ]);

  const [productForm, setProductForm] = useState<ProductsInputType>({
    Name: "",
    Description: "",
    Serial_Code: "",
    BarCode: "",
    MeasurementMethod: "",
    Unit: 0,
    LowStockThreshold: 0,
    SalePrice: 0,
    CostPrice: 0,
    Image: null,
    Category_Id: 0,
    Discount_Id: "",
  });

  const HandleGet = async () => {
    try {
      const response = await server.get(www.products.get);
      setProduct(response);

      const categoryResponse = await server.get(www.categories.get);
      setCategory(categoryResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const SendData = async (Base64Image: string) => {
    const productData = {
      ...productForm,
      Image: Base64Image,
    };

    server.post(www.products.post, productData);
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let Base64Image = "";

    if (productForm.Image) {
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        Base64Image = reader.result as string;
        SendData(Base64Image);
      };

      reader.readAsDataURL(productForm.Image);
    } else {
      SendData("");
    }
  };

  useEffect(() => {
    HandleGet();
  }, [product.length]);

  return (
    <div className="admin-products">
      <span>
        <h2>Products</h2>

        <span className="buttons">
          {/* Remeber to Create Functionality for the Damaged Button */}
          <button
            onClick={() =>
              method.click({ click: damageClick, setClick: setDamageClick })
            }
          >
            <FaHouseDamage size={20} />
          </button>

          <button onClick={() => method.click({ click, setClick })}>
            +New Product
          </button>
        </span>
      </span>

      <div className="admin-products-container">
        {product.map((product: ProductsType, i: number) => (
          <div key={i} className="admin-product-list">
            <div
              className="admin-product-image"
              onClick={() =>
                method.ArrayClick({
                  index: i,
                  setClick: setProductClick,
                })
              }
            >
              <img src={product.Image} alt="" />
            </div>

            <div className="admin-product-info">
              <span>
                <h4>{product.Name}</h4>
                <p>Quantity: {product.Unit}</p>
              </span>

              <h3 style={{ color: "#8e3a59" }}> ⍧{product.SalePrice}</h3>
            </div>

            {productClick[i] && (
              <ProductDisplay
                index={i}
                display={product}
                setDisplay={setProductClick}
              />
            )}
          </div>
        ))}

        {click && (
          <div className="admin-products-form">
            <h3>New Product</h3>

            <form encType="multipart/form-data">
              <MdClose
                onClick={() =>
                  method.click({
                    click: click,
                    setClick: setClick,
                  })
                }
              />

              <span>
                <Input
                  input={ProductInput}
                  options={category}
                  setInput={setProductForm}
                />
              </span>

              <button onClick={HandleSubmit}>Insert</button>
            </form>
          </div>
        )}
      </div>

      {damageClick && (
        <DamagedItems click={damageClick} setClick={setDamageClick} />
      )}
    </div>
  );
};
