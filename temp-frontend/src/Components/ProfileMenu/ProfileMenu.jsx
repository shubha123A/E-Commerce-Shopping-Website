import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Safely check if 'user' data exists in localStorage before parsing
  let user = null;
  const userData = localStorage.getItem('user');
  
  if (userData) {
    try {
      user = JSON.parse(userData); // Try parsing the data
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleOrders = () => {
    navigate('/profile'); // or navigate to orders page if you have
  };

  if (!user) return null; // If no user, don't show the profile menu

  return (
    <div className="profile-menu">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="User Icon"
        className="profile-icon"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="dropdown">
          <p onClick={handleOrders}>My Orders</p>
          <p onClick={handleLogout}>Logout</p>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
