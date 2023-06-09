import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NewProductForm = () => {
  const [product, updateProduct] = useState({
    productName: '',
    productType: '',
    price: 0
  })
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8088/productTypes')
      .then(response => response.json())
      .then(data => setProductTypes(data))
  }, [])

  
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()

    
    const newProductAPI = {
      id: product.id,
      name: product.productName,
      productTypeId: product.productType.id,
      pricePerUnit: product.price
    }
  
    return fetch('http://localhost:8088/products?_expand=productType&_sort=name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProductAPI)
    })
      .then(response => response.json())
      .then((createdProduct) => {
        const { id, name, productTypeId, pricePerUnit } = createdProduct
        const updatedProduct = {
          id,
          name,
          productTypeId,
          pricePerUnit
        }
        console.log(updatedProduct) // Verify the updated product structure
        navigate('/products')
      })
  }


  const handleProductNameChange = (event) => {
    updateProduct(prevProduct => ({
      ...prevProduct,
      productName: event.target.value
    }))
  }


  const handleProductTypeChange = (event) => {
    const selectedProductTypeId = parseInt(event.target.value)
    const selectedProductType = productTypes.find(type => type.id === selectedProductTypeId)
  
    updateProduct(prevProduct => ({
      ...prevProduct,
      productType: selectedProductType
    }))
  }
  

  const handlePriceChange = (event) => {
    const inputValue = event.target.value;

    if (isNaN(inputValue)) {
      updateProduct(prevProduct => ({
        ...prevProduct,
        price: ''
      }))
    } else {
      const parsedPrice = parseFloat(inputValue);
      updateProduct(prevProduct => ({
        ...prevProduct,
        price: isNaN(parsedPrice) ? '' : parsedPrice
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="productForm__title">Create New Product</h2>
      <label htmlFor="productName">Product Name: </label>
      <input
        type="text"
        id="productName"
        autoComplete="off"
        value={product.productName}
        onChange={handleProductNameChange}
        required
      />

<label htmlFor="productType">Product Type:</label>
      <select
        id="productType"
        value={product.productType.id}
        onChange={handleProductTypeChange}
        required
      >
         <option value="">Select Product Type</option>
  {productTypes.map(productType => (
    <option key={productType.id} value={productType.id}>
      {productType.name}
    </option>
  ))}
</select>

      <label htmlFor="price">Price: </label>
      <input
        type="number"
        id="price"
        value={product.price}
        onChange={handlePriceChange}
        step="0.01"
        required
      />

      <button id="create-product-button" type="submit">Create Product</button>
    </form>
  )
}
