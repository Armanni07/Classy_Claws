export type DamagedItemsType = {
  Name: string;
  Product_ID: number;
  Quantity: number;
  Image: string;
  SalePrice:number;
  Description: string;
  Created_By: number;
  Updated_By: number;
  Date_Created: Date;
  Date_Updated: Date;
};

export type DamagedItemsInputType = {
  ProductId: number;
  Quantity: number;
  Description: string;
};
