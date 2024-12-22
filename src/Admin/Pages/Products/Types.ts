export type ProductsType = {
  id?: number;
  Name: string;
  Description: string;
  Serial_Code: string;
  BarCode: string;
  MeasurementMethod: string;
  Unit: number;
  LowStockThreshold: number;
  Status?: string;
  SalePrice: number;
  CostPrice: number;
  Image: string | undefined;
  Category_Id: number;
  Category?: { Name: string; Description: string };
  Created_By?: number;
  Staff?: { Designation: string | undefined; Email: string | undefined };
  Updated_By?: number;
  Date_Created?: Date;
  Date_Updated?: Date;
  Discount_Id?: string;
};

export type ProductsInputType = {
  Name: string;
  Description: string;
  Serial_Code: string;
  BarCode: string;
  MeasurementMethod: string;
  Unit: number;
  LowStockThreshold: number;
  SalePrice: number;
  CostPrice: number;
  Image: File | null;
  Img?: string;
  Category_Id: number;
  Created_By?: number;
  Date_Created?: Date;
  Discount_Id?: string;
};

export type CategoriesType = {
  Name: string;
  Description: string;
  Created_By: number;
  Updated_By?: number;
  Date_Created: Date;
  Date_Updated?: Date;
};

export type CategoriesInputType = {
  Name: string;
  Description: string;
};

export type DamagedItemsInputType = {
  ProductId: number;
  Quantity: number;
  Description: string;
};
