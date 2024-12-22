import React from "react";
import { ProductsType } from "../../Admin/Pages/Products/Types";

export type CategorySectionsType = {
  loginClick: boolean;
  itemCount: number[];
  itemClick: boolean[];
  items: ProductsType[];
  setLoginClick: React.Dispatch<React.SetStateAction<boolean>>;
  setItemCount: React.Dispatch<React.SetStateAction<number[]>>;
  setItemClick: React.Dispatch<React.SetStateAction<boolean[]>>;
};
