import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = ({ onProductAdded }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = async () => {
    // You can use static data for now or modify to fetch from input fields
    try {
      const response = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct), // Send new product data
      });
      if (response.ok) {
        onProductAdded(); // Trigger product list refresh
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <div className="add-product-fields">
        <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Product Name"
          />
        </label>
        <label>
          Old Price:
          <input
            type="number"
            name="old_price"
            value={newProduct.old_price}
            onChange={handleChange}
            placeholder="Old Price"
          />
        </label>
        <label>
          New Price:
          <input
            type="number"
            name="new_price"
            value={newProduct.new_price}
            onChange={handleChange}
            placeholder="New Price"
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            placeholder="Category"
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </label>
      </div>
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
