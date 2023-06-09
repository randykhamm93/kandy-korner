import { useState } from "react"
import { ProductSearch } from "./ProductSearch"
import { ProductList } from "./ProductList"

export const ProductContainer = () => {
  const [searchTerms, setSearchTerms] = useState("");


  return <>
      <ProductSearch setterFunction={setSearchTerms} />
      <ProductList searchTermState={searchTerms} />
    </>
};
