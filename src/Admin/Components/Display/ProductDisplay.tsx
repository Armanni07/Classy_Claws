import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";

import "./Display.scss";
import { DisplayType } from "./Types";
import { www } from "../../../Utils/URLS/Urls";
import Photo from "../../../Assets/CC-Logo-Light.png";
import { server } from "../../../Utils/Server/Server";
import { Input } from "../../../Components/Inputs/Input";
import { method } from "../../../Utils/Functions/Functions";
import { ProductsInput} from "../../../Utils/Objects/InputObjects";
import { ProductsType, ProductsInputType } from "../../Pages/Products/Types";

export const ProductDisplay = <T extends ProductsType>({
  index,
  display,
  setDisplay,
}: DisplayType<T>) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [category, setCategory] = useState<{ Name: ""; id: number }[]>([
    { Name: "", id: 0 },
  ]);

  const [updateProduct, setupdateProduct] = useState<ProductsInputType>({
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
    Created_By: display.Created_By,
    Date_Created: display.Date_Created,
    Discount_Id: "",
  });

  const [product, setProduct] = useState<ProductsType>({
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
  });

  const { ProductUpdate } = ProductsInput(updateProduct);

  const HandleGet = async () => {
    const response = await server.get(`${www.products.get}/${display.id}`);
    setProduct(response[0]);
    setupdateProduct(response[0]);

    const categoryResponse = await server.get(www.categories.get);
    setCategory(categoryResponse);
  };

  const SendData = async (Base64Image: string) => {
    const productData = Base64Image
      ? {
          ...updateProduct,
          Image: Base64Image,
        }
      : updateProduct;

    server.put(`${www.products.put}/${display.id}`, productData);
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let Base64Image = "";

    if (updateProduct.Image?.size) {
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        Base64Image = reader.result as string;
        SendData(Base64Image);
      };

      reader.readAsDataURL(updateProduct.Image);
    } else {
      SendData("");
    }
  };

  useEffect(() => {
    HandleGet();
  }, [product?.Description]);

  return (
    <div className="display">
      <div className="display-container">
        <span className="display-left">
          <img className="display-image" src={display.Image} alt="" />
        </span>

        <span className="display-right">
          <span>
            <img src={Photo} alt="" />

            <MdClose
              size={35}
              color="#ff0000"
              onClick={() => method.ArrayClick({ index, setClick: setDisplay })}
            />
          </span>

          <h3> {product.Name}</h3>
          <h4> {product.Description}</h4>
          <h4> Type: {product.Category?.Name}</h4>

          <span>
            <h4>Price: ⍧{product.SalePrice}</h4>
            <h4>Cost Price: ⍧{product.CostPrice}</h4>
          </span>

          <span>
            <h4>
              Unit: {product.Unit}
              {product.MeasurementMethod}
            </h4>

            <h4>
              Status:{" "}
              {product.LowStockThreshold > product.Unit
                ? "Low Stock"
                : "Available"}
            </h4>
          </span>

          <span>
            <h4>Created By: {product.Staff?.Designation}</h4>

            <h4>Created: {method.dates(product?.Date_Created)}</h4>
          </span>

          <h4>Updated By: </h4>
          <span>
            <h4>Barcode: {product.BarCode}</h4>
            <h4>Serial No.: {product.Serial_Code}</h4>
          </span>

          <span>
            <FaPen
              size={20}
              onClick={() => method.click({ click: edit, setClick: setEdit })}
            />
            <MdDelete color="#ff0000" size={30} />
          </span>
        </span>

        {edit && (
          <div className="update-products">
            <form encType="multipart/form-data">
              <span className="close">
                <MdClose
                  size={30}
                  onClick={() =>
                    method.click({
                      click: edit,
                      setClick: setEdit,
                    })
                  }
                />

                <h2>Edit</h2>
              </span>

              <span>
                {
                  <Input
                    input={ProductUpdate}
                    options={category}
                    setInput={setupdateProduct}
                  />
                }
              </span>

              <button onClick={HandleSubmit}>Update</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
