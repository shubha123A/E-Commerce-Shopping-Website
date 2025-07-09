import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Profile.css'; // link to your Profile.css

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {}; // getting user data

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Simulate fetching user's orders
      const dummyOrders = [
        {
          id: 1,
          productName: 'Wireless Earbuds',
          date: '2025-04-20',
          status: 'Delivered',
          amount: '$59.99',
        },
        {
          id: 2,
          productName: 'Smart Watch',
          date: '2025-04-18',
          status: 'Shipped',
          amount: '$120.00',
        },
        {
          id: 3,
          productName: 'Bluetooth Speaker',
          date: '2025-04-15',
          status: 'Delivered',
          amount: '$45.00',
        },
      ];
      setOrders(dummyOrders);
    }
  }, [user]);

  const handleLogout = () => {
    navigate('/');
  };

  if (!user) {
    return (
      <div className="profile-error">
        <h2>No user data found. Please login first.</h2>
        <button onClick={() => navigate('/')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile Icon"
          className="profile-icon"
        />
        <h2>Welcome, {user.firstName} {user.lastName}!</h2>
        <p>Email: {user.email}</p>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="orders-section">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>{order.productName}</h3>
                <p><strong>Order Date:</strong> {order.date}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Amount:</strong> {order.amount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
