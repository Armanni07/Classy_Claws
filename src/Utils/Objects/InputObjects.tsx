import { InputType } from "../../Components/Inputs/Types";
import { ProductsInputType } from "../../Admin/Pages/Products/Types";
import { RegisterType, UsersInputType } from "../Types/AuthContextTypes";
import { DamagedItemsType } from "../../Admin/Pages/DamagedItems/Types";

export const ProductsInput = (values?: ProductsInputType) => {
  const ProductInput: InputType[] = [
    {
      type: "text",
      name: "Name",
      placeHolder: "Name",
    },

    {
      type: "text",
      name: "Description",
      placeHolder: "Description",
    },

    {
      type: "text",
      name: "SerialCode",
      placeHolder: "SerialCode",
    },

    {
      type: "text",
      name: "Barcode",
      placeHolder: "Barcode",
    },

    {
      type: "text",
      name: "MeasurementMethod",
      placeHolder: "MeasurementMethod",
    },

    {
      type: "number",
      name: "Unit",
      placeHolder: "Unit",
    },

    {
      type: "number",
      name: "LowStockThreshold",
      placeHolder: "LowStockThreshold",
    },

    {
      type: "number",
      name: "SalePrice",
      placeHolder: "SalePrice",
    },

    {
      type: "number",
      name: "CostPrice",
      placeHolder: "CostPrice",
    },

    {
      type: "file",
      name: "Image",
      accept: "image/*",
      placeHolder: "Image",
    },

    {
      type: "",
      name: "Category_Id",
      placeHolder: "",
    },

    {
      type: "number",
      name: "Discount_Id",
      placeHolder: "Discount Id",
    },
  ];

  const ProductUpdate: InputType[] = [
    {
      type: "text",
      name: "Name",
      value: values?.Name,
      placeHolder: "Name",
    },

    {
      type: "text",
      name: "Description",
      value: values?.Description,
      placeHolder: "Description",
    },

    {
      type: "text",
      name: "SerialCode",
      value: values?.Serial_Code,
      placeHolder: "SerialCode",
    },

    {
      type: "text",
      name: "Barcode",
      value: values?.BarCode,
      placeHolder: "Barcode",
    },

    {
      type: "text",
      name: "MeasurementMethod",
      value: values?.MeasurementMethod,
      placeHolder: "MeasurementMethod",
    },

    {
      type: "number",
      name: "Unit",
      value: values?.Unit,
      placeHolder: "Unit",
    },

    {
      type: "number",
      name: "LowStockThreshold",
      value: values?.LowStockThreshold,
      placeHolder: "LowStockThreshold",
    },

    {
      type: "number",
      name: "SalePrice",
      value: values?.SalePrice,
      placeHolder: "Sale Price",
    },

    {
      type: "number",
      name: "CostPrice",
      value: values?.CostPrice,
      placeHolder: "Cost Price",
    },

    {
      type: "file",
      name: "Image",
      value: values?.Img,
      accept: "image/*",
      placeHolder: "Image",
    },

    {
      type: "",
      name: "CategoryId",
      value: values?.Category_Id,
      placeHolder: "",
    },

    {
      type: "number",
      name: "DiscountId",
      value: values?.Discount_Id,
      placeHolder: "Discount Id",
    },
  ];

  return { ProductInput, ProductUpdate };
};

export const DamagedItemsInputs = (values?: DamagedItemsType) => {
  const DamagedItemInput: InputType[] = [
    {
      type: "number",
      name: "ProductId",
      placeHolder: "ProductId",
    },

    {
      type: "number",
      name: "Quantity",
      placeHolder: "Quantity",
    },

    {
      type: "text",
      name: "Description",
      placeHolder: "Description",
    },
  ];

  const DamagedItemUpdate: InputType[] = [
    {
      type: "number",
      name: "Name",
      value: values?.ProductId,
      placeHolder: "Name",
    },

    {
      type: "number",
      name: "Quantity",
      value: values?.Quantity,
      placeHolder: "Quantity",
    },

    {
      type: "text",
      name: "Description",
      value: values?.Description,
      placeHolder: "Description",
    },
  ];

  return { DamagedItemInput, DamagedItemUpdate };
};

export const UsersInput = (values?: UsersInputType) => {
  const UserInput: InputType[] = [
    {
      type: "text",
      name: "Firstname",
      placeHolder: "Firstname",
    },
    {
      type: "text",
      name: "Lastname",
      placeHolder: "Lastname",
    },
    {
      type: "text",
      name: "Email",
      placeHolder: "Email",
    },
    {
      type: "text",
      name: "Password",
      placeHolder: "Password",
    },
    {
      type: "text",
      name: "Phone_No",
      placeHolder: "Phone Number",
    },
    {
      type: "text",
      name: "Location",
      placeHolder: "Location",
    },
    {
      id: "Image",
      type: "file",
      name: "Photo",
      accept: "image/*",
      placeHolder: "Photo",
    },
  ];

  const UserUpdate: InputType[] = [
    {
      type: "text",
      name: "Firstname",
      value: values?.Firstname,
      placeHolder: "Firstname",
    },
    {
      type: "text",
      name: "Lastname",
      value: values?.Lastname,
      placeHolder: "Lastname",
    },
    {
      type: "text",
      name: "Email",
      value: values?.Email,
      placeHolder: "Email",
    },
    {
      type: "text",
      name: "Password",
      placeHolder: "Password",
    },
    {
      type: "text",
      name: "Phone_No",
      value: values?.Phone_No,
      placeHolder: "Phone Number",
    },
    {
      type: "text",
      name: "Location",
      value: values?.Location,
      placeHolder: "Location",
    },
    {
      id: "Image",
      type: "file",
      name: "Photo",
      accept: "image/*",
      value: values?.Photo?.ImageUrl,
      placeHolder: "Photo",
    },
  ];

  return { UserInput, UserUpdate };
};

export const EmployeesInput = (values?: RegisterType) => {
  const EmployeeInput: InputType[] = [
    {
      type: "text",
      name: "Firstname",
      placeHolder: "Firstname",
    },
    {
      type: "text",
      name: "Lastname",
      placeHolder: "Lastname",
    },
    {
      type: "text",
      name: "Email",
      placeHolder: "Email",
    },
    {
      type: "text",
      name: "Password",
      placeHolder: "Password",
    },
    {
      type: "text",
      name: "Phone_No",
      placeHolder: "Phone Number",
    },
    {
      type: "text",
      name: "Location",
      placeHolder: "Location",
    },
    {
      id: "Image",
      type: "file",
      name: "Photo",
      accept: "image/*",
      placeHolder: "Photo",
    },
  ];

  const EmployeeUpdate: InputType[] = [
    {
      type: "text",
      name: "Firstname",
      value: values?.Firstname,
      placeHolder: "Firstname",
    },
    {
      type: "text",
      name: "Lastname",
      value: values?.Lastname,
      placeHolder: "Lastname",
    },
    {
      type: "text",
      name: "Email",
      value: values?.Email,
      placeHolder: "Email",
    },
    {
      type: "text",
      name: "Password",
      placeHolder: "Password",
    },
    {
      type: "text",
      name: "Phone_No",
      value: values?.Phone_No,
      placeHolder: "Phone Number",
    },
    {
      type: "text",
      name: "Location",
      value: values?.Location,
      placeHolder: "Location",
    },
    {
      id: "Image",
      type: "file",
      name: "Photo",
      accept: "image/*",
      value: values?.Photo as string,
      placeHolder: "Photo",
    },
  ];

  return { EmployeeInput, EmployeeUpdate };
};
