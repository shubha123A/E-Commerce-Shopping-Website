import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../Assets/logo.png';
import cart_icon from '../../Assets/cart_icon.png';
import profile_icon from '../../Assets/profile_icon.png'; // Add the path to your profile icon image
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../../Assets/nav_dropdown.png';
import ProfileMenu from '../ProfileMenu/ProfileMenu'; // Adjust to the correct folder structure

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const activeMenu = () => {
    if (path === '/') return 'shop';
    if (path.includes('/mens')) return 'mens';
    if (path.includes('/womens')) return 'womens';
    if (path.includes('/kids')) return 'kids';
    return '';
  };

  const menu = activeMenu();
  const { getTotalItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  // State to check if user is logged in
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Safely check and parse user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));  // Only parse if userData exists
    }
  }, []);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="Logo" />
        <p>SHOPPER</p>
      </div>

      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown" />

      <ul ref={menuRef} className="nav-menu">
        <li>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
          {menu === "shop" && <hr />}
        </li>
        <li>
          <Link to='/mens' style={{ textDecoration: 'none', color: 'inherit' }}>Men</Link>
          {menu === "mens" && <hr />}
        </li>
        <li>
          <Link to='/womens' style={{ textDecoration: 'none', color: 'inherit' }}>Women</Link>
          {menu === "womens" && <hr />}
        </li>
        <li>
          <Link to='/kids' style={{ textDecoration: 'none', color: 'inherit' }}>Kids</Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {user ? (
          // Show Profile icon and Cart if user is logged in
          <>
            <Link to='/profile'>
              <img src={profile_icon} alt="Profile" className="nav-profile-icon" />
            </Link>
            <ProfileMenu /> {/* Profile icon dropdown */}
            <Link to='/cart'>
              <img src={cart_icon} alt="Cart" />
            </Link>
            <div className='nav-cart-count'>{getTotalItems()}</div>
          </>
        ) : (
          // Show Login and Cart if no user is logged in
          <>
            <Link to='/login'>
              <button>Login</button>
            </Link>
            <Link to='/cart'>
              <img src={cart_icon} alt="Cart" />
            </Link>
            <div className='nav-cart-count'>{getTotalItems()}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
