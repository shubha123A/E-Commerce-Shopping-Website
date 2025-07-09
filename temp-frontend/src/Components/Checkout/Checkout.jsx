import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Checkout.css';
import { ShopContext } from '../../Context/ShopContext';

const Checkout = () => {
  const { all_product, cartItems } = useContext(ShopContext);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [cardNumber, setCardNumber] = useState(''); // State to store card number
  const [upiId, setUpiId] = useState(''); // State to store UPI ID
  const navigate = useNavigate(); // Hook for navigation

  // Validate Phone Number (Country Code + 10 digits)
  const validatePhoneNumber = (number) => {
    const regex = /^[1-9]{1}[0-9]{9}$/; // Checks for a 10-digit number starting with 1-9
    return regex.test(number);
  };

  // Validate Credit Card Number (16 digits)
  const validateCardNumber = (number) => {
    const regex = /^[0-9]{16}$/; // Ensures it's exactly 16 digits
    return regex.test(number);
  };

  // Validate UPI ID (Basic Validation)
  const validateUpiId = (id) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+$/; // Ensures basic UPI format
    return regex.test(id);
  };

  // Calculate total price
  const totalAmount = all_product.reduce((acc, product) => {
    return acc + product.new_price * cartItems[product.id];
  }, 0);

  const handlePlaceOrder = () => {
    if (!name || !address || !phoneNumber || !pinCode || 
        (paymentMethod === 'creditCard' && !cardNumber) || 
        (paymentMethod === 'onlinePayment' && !upiId)) {
      alert('Please fill in all the required details before placing the order.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number (10 digits).');
      return;
    }

    if (paymentMethod === 'creditCard' && !validateCardNumber(cardNumber)) {
      alert('Please enter a valid 16-digit credit card number.');
      return;
    }

    if (paymentMethod === 'onlinePayment' && !validateUpiId(upiId)) {
      alert('Please enter a valid UPI ID.');
      return;
    }

    // Redirect to the Thank You page
    alert('Order Placed!');
    navigate('/thank-you'); // Redirect to Thank You page
  };

  return (
    <div className="checkout-container">
      <h2>Order Summary</h2>
      
      {/* Display Cart Items */}
      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id} className="checkout-item-details">
              <div className="checkout-item-column">
                <img src={product.image} alt={product.name} />
                <span>{product.name}</span>
                <span>₹{product.new_price}</span>
                <span>{cartItems[product.id]}</span>
                <span>₹{product.new_price * cartItems[product.id]}</span>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}

      {/* Checkout Summary */}
      <div className="checkout-summary">
        <div className="checkout-item total">
          <span>Subtotal</span>
          <span>₹{totalAmount}</span>
        </div>
        <div className="checkout-item total">
          <span>Shipping</span>
          <span>₹0</span>
        </div>
        <div className="checkout-item total">
          <h3>Total</h3>
          <h3>₹{totalAmount}</h3>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="checkout-section">
        <h3>Delivery Address</h3>
        <input 
          type="text" 
          placeholder="Enter your delivery address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
      </div>

      {/* Name */}
      <div className="checkout-section">
        <h3>Name</h3>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      {/* Phone Number */}
      <div className="checkout-section">
        <h3>Phone Number</h3>
        <input 
          type="text" 
          placeholder="Enter your phone number (10 digits)" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
        />
      </div>

      {/* Pin Code */}
      <div className="checkout-section">
        <h3>Pin Code</h3>
        <input 
          type="text" 
          placeholder="Enter your pin code" 
          value={pinCode} 
          onChange={(e) => setPinCode(e.target.value)} 
        />
      </div>

      {/* Payment Method */}
      <div className="checkout-section">
        <h3>Payment Method</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="cashOnDelivery">Cash on Delivery</option>
          <option value="creditCard">Credit Card</option>
          <option value="onlinePayment">Online Payment (UPI)</option>
        </select>
      </div>

      {/* Conditional Rendering for Credit Card Input */}
      {paymentMethod === 'creditCard' && (
        <div className="checkout-section">
          <h3>Card Number</h3>
          <input 
            type="text" 
            placeholder="Enter your 16-digit card number" 
            value={cardNumber} 
            onChange={(e) => setCardNumber(e.target.value)} 
          />
        </div>
      )}

      {/* Conditional Rendering for UPI Input */}
      {paymentMethod === 'onlinePayment' && (
        <div className="checkout-section">
          <h3>UPI ID</h3>
          <input 
            type="text" 
            placeholder="Enter your UPI ID" 
            value={upiId} 
            onChange={(e) => setUpiId(e.target.value)} 
          />
        </div>
      )}

      {/* Place Order Button */}
      <button className="checkout-button" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
