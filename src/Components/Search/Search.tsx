import { useState } from "react";
import { MdClose } from "react-icons/md";

import "./Search.scss";
import { SearchType } from "./Types";
import { ProductsType } from "../../Admin/Pages/Products/Types";
import { CategorySections } from "../Sections/CategorySections";

export const Search = <T extends ProductsType>({
  name,
  search,
  setClick,
}: SearchType<T>) => {
  const [searchCount, setSearchCount] = useState<number[]>(
    Array.from({ length: search.length }, () => 0)
  );

  const [searchClick, setSearchClick] = useState<boolean[]>(
    Array.from({ length: search.length }, () => false)
  );
  const [loginClick, setLoginClick] = useState<boolean>(false);
  return (
    <div className="search-page">
      <MdClose className="close" onClick={() => setClick(false)} />

      <h1 className="page-name">Search Results For: {name}</h1>

      <CategorySections
        items={search}
        itemCount={searchCount}
        itemClick={searchClick}
        loginClick={loginClick}
        setItemClick={setSearchClick}
        setItemCount={setSearchCount}
        setLoginClick={setLoginClick}
      />
    </div>
  );
};
