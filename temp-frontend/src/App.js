import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignUp from './Pages/LoginSignUp';
import Footer from './Components/Footer/Footer';
import mens_banner from './Assets/banner_mens.png';
import women_banner from './Assets/banner_women.png';
import kids_banner from './Assets/banner_kids.png';
import Cart from './Pages/Cart';
import Checkout from './Components/Checkout/Checkout';
import Thanks from './Components/Thanks/Thanks';
import Profile from './Components/Profile/Profile';
import ProfileMenu from './Components/ProfileMenu/ProfileMenu'; // import ProfileMenu

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Safely set user data
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        localStorage.removeItem('user'); // Remove invalid data
      }
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {/* Show ProfileMenu if user is logged in */}
        {user && <ProfileMenu />} 

        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCategory banner={mens_banner} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={kids_banner} category="kid" />} />
          <Route path="/product/:productID" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<Thanks />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
