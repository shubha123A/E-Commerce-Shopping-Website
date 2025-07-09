import React, { useContext } from 'react';
import './Cartitems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom'; // 🔥 Import useNavigate

const Cartitems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate(); // 🔥 Hook to navigate

  const totalAmount = all_product.reduce((acc, product) => {
    return acc + product.new_price * cartItems[product.id];
  }, 0);

  return (
    <div className="cartitems">
      {/* HEADERS */}
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      {/* PRODUCT LIST */}
      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div className="cartitems-format" key={product.id}>
              <img
                className="carticon-product-icon"
                src={product.image}
                alt={product.name}
              />
              <p>{product.name}</p>
              <p>₹{product.new_price}</p>
              <div className="cartitems-quantity">{cartItems[product.id]}</div>
              <p>₹{product.new_price * cartItems[product.id]}</p>
              <img
                className="cartitems-remove-icon"
                src={remove_icon}
                onClick={() => removeFromCart(product.id)}
                alt="remove"
              />
            </div>
          );
        } else {
          return null;
        }
      })}

      {/* TOTAL AND PROMO */}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{totalAmount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{totalAmount}</h3>
            </div>
          </div>

          {/* 🔥 Updated button */}
          <button 
            className="cartitems-total-button" 
            onClick={() => navigate('/checkout')}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
