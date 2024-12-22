import { MdClose } from "react-icons/md";
import React, { useEffect, useState } from "react";

import "./DamagedItems.scss";
import { www } from "../../../Utils/URLS/Urls";
import { server } from "../../../Utils/Server/Server";
import { ProductsType } from "../Products/Types";
import { method } from "../../../Utils/Functions/Functions";
import { ClickType } from "../../../Utils/Types/FunctionTypes";
import { DamagedItemsInputType, DamagedItemsType } from "./Types";
import { DamagedItemsInputs } from "../../../Utils/Objects/InputObjects";

export const DamagedItems = ({ click, setClick }: ClickType) => {
  const { DamagedItemInput } = DamagedItemsInputs();

  const [formClick, setFormClick] = useState<boolean>(false);

  const [form, setForm] = useState<DamagedItemsInputType>({
    ProductId: 0,
    Quantity: 0,
    Description: "",
  });

  const [damaged, setDamaged] = useState<DamagedItemsType[]>([]);

  const [products, setProducts] = useState<ProductsType[]>();

  const GetData = async () => {
    const response = await server.get(www.damagedItems.get);
    setDamaged(response);

    const response2 = await server.get(www.products.get);
    setProducts(response2);
  };

  const SendData = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    server.post(www.damagedItems.post, form);
  };

  useEffect(() => {
    GetData();
  }, [form]);

  return (
    <section className="damaged-items">
      <span className="damaged-items-header">
        <h1>Damaged Items</h1>

        <button
          className="new-damaged-item"
          onClick={() =>
            method.click({ click: formClick, setClick: setFormClick })
          }
        >
          +Damaged Item
        </button>
      </span>

      <span className="damaged-items-container">
        <MdClose
          className="damaged-items-close"
          onClick={() => method.click({ click, setClick })}
        />

        {damaged.length < 1 ? (
          <h1>No Damaged Items</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {damaged.map((item, i: number) => (
                <tr key={i}>
                  <td>{item.Product_ID}</td>
                  <td>
                    <img src={item.Image} alt="" />

                    {item.Name}
                  </td>
                  <td>{item.Description}</td>
                  <td>{item.Quantity}PC(S)</td>
                  <td>⍧{item.SalePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </span>

      {formClick && (
        <form className="damaged-items-form">
          <span className="damaged-items-form-header">
            <h4>New Damaged Item</h4>
            <MdClose onClick={() => setFormClick(false)} />
          </span>

          <span className="damaged-items-form-container">
            {DamagedItemInput.map((input, i: number) =>
              input.name.includes("Product") ? (
                <select
                  name={input.name}
                  onChange={(e) => method.select({ e, setInputs: setForm })}
                >
                  <option value="">Select A Product</option>
                  {products?.map((product, i: number) => (
                    <option key={i} value={product.id}>
                      {product.Name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  key={i}
                  name={input.name}
                  placeholder={input.placeHolder}
                  onChange={(e) => method.input({ e, setInputs: setForm })}
                />
              )
            )}

            <button onClick={(e) => SendData(e)}>Send</button>
          </span>
        </form>
      )}
    </section>
  );
};
