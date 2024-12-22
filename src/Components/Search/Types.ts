import React from "react";

export type SearchType<T> = {
  search: T[];
  name: string;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
};
