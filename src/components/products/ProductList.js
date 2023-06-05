import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./products.css"

export const ProductList = () => {
  const [products, setProducts] = useState([])
  const [showTopPriced, setShowTopPriced] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const localKandyUser = localStorage.getItem("kandy_user")
  const kandyUserObject = JSON.parse(localKandyUser)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetch("http://localhost:8088/products?_expand=productType&_sort=name")
    .then((response) => response.json())
    .then((productArray) => {
        setProducts(productArray)
      })
  }, [])
  

  useEffect(() => {
    const filteredProducts = showTopPriced
    ? products.filter((product) => product.pricePerUnit > 2.0)
    : products
    
    setFilteredProducts(filteredProducts)
  }, [showTopPriced, products])
  

  useEffect(() => {
    if (kandyUserObject.staff) {
      setShowTopPriced(false)
    }
  }, [kandyUserObject.staff])
  
  
  return (
    <>
      <h2>List of Products</h2>
      {kandyUserObject.staff && (
        <>
           <button id="show-all-button" onClick={() => setShowTopPriced(false)}>Show All</button>
          <button id="top-priced-button" onClick={() => setShowTopPriced(true)}>Show Top Priced</button>
          <button id="create-product-button"onClick={() =>navigate("/products/new")}>Create Product</button>

        </>
      )}
      <article className="products">
        {filteredProducts.map((product) => (
          <section className="product" key={`product--${product.id}`}>
            <ul className="product--list">
              <li>Name: {product.name}</li>
              <li>
                Price:{" "}
                {product.pricePerUnit.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </li>
              <li>Type: {product.productType && product.productType.name}</li>
            </ul>
          </section>
        ))}
      </article>
    </>
  )
}
