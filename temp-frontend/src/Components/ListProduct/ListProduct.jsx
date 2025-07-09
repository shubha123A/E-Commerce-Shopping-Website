import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';
import AddProduct from './AddProduct';  // Import AddProduct component

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch the list of products
  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      const data = await response.json();
      setAllProducts(data);  // Update the state with the new list of products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Refresh the product list when the component mounts
  useEffect(() => {
    fetchInfo();
  }, []);

  // Handle removal of a product
  const removeProduct = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      fetchInfo();  // Refresh the list after deleting
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  // Function to refresh the list when a product is added
  const handleProductAdded = () => {
    fetchInfo();  // Fetch updated product list
  };

  return (
    <div className="List-product">
      <h1>All Product List</h1>

      {/* AddProduct Component (for Admin to add new products) */}
      <AddProduct onProductAdded={handleProductAdded} />

      {/* Product List Header */}
      <div className="listproduct-header">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      {/* Product List */}
      <div className="listproduct-allproducts">
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <div key={product.id} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt={product.name} className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>₹{product.old_price}</p>
              <p>₹{product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => removeProduct(product.id)}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="Remove product"
              />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
