import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, BellIcon, GlobeAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';


const NavbarCart = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const { isAuthenticated, user, accessToken, logout } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    imageUserPath: 'default-avatar-path.svg'  // Default image path
  });

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get('https://localhost:5001/api/Cart', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const { cartItemCount } = response.data;
          setCartItemCount(cartItemCount);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error.response || error.message);
      }
    };

    fetchCartItemCount();
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    if (user && user.userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`https://localhost:5001/api/Users/${user.userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          if (response.data) {
            setUserInfo({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              imageUserPath: response.data.imageUserPath || 'default-avatar-path.svg'
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user, accessToken]);

  const handleCartButtonClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const handleCartItemCountUpdate = (event) => {
      setCartItemCount(event.detail);
    };

    window.addEventListener('cartItemCountUpdate', handleCartItemCountUpdate);

    return () => {
      window.removeEventListener('cartItemCountUpdate', handleCartItemCountUpdate);
    };
  }, []);

  useEffect(() => {
    // Reset cartItemCount to 0 when user logs out
    if (!isAuthenticated) {
      setCartItemCount(0);
    }
  }, [isAuthenticated]);

  return (
    <nav className="bg-red-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Brand Logo and Links */}
          <div className="flex-1 flex items-center justify-start">
            {/* Navigation Links */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="#" className="text-white px-3 py-2 rounded-md text-sm font-medium">Kênh Người Bán</a>
                <a href="#" className="text-white px-3 py-2 rounded-md text-sm font-medium">Tải Ứng dụng</a>
                <a href="#" className="text-white px-3 py-2 rounded-md text-sm font-medium">Kết nối</a>
              </div>
            </div>
          </div>


          {/* Icons and Text */}
          <div className="flex items-center justify-end">
            {/* Notification Icon */}
            <button className="text-white flex items-center focus:outline-none">
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="ml-1 hidden md:inline">Notification</span>
            </button>

            {/* Language Icon */}
            <button className="text-white flex items-center ml-6 focus:outline-none">
              <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
              <span className="ml-1 hidden md:inline">Language</span>
            </button>

            {/* Help Icon */}
            <button className="text-white flex items-center ml-6 focus:outline-none">
              <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
              <span className="ml-1 hidden md:inline">Help</span>
            </button>

            {/* Shopping Cart Icon - Hide on Cart Page */}
            {location.pathname !== '/cart' && (
              <button onClick={handleCartButtonClick} className="text-white flex items-center ml-6 relative focus:outline-none">
                <ShoppingCartIcon className="h-8 w-8" aria-hidden="true" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-green-500 text-white rounded-full px-2 py-1 text-xs -mt-1 -mr-1">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Auth Buttons or User Info */}
            {!isAuthenticated ? (
              <>
                <a href="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium ml-6">Đăng ký</a>
                <span className="text-white mx-2">|</span>
                <a href="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium">Đăng nhập</a>
              </>
            ) : (
              <>
                <img src={userInfo.imageUserPath} alt="User Avatar" className="h-8 w-8 rounded-full mx-4" />
                <span className="text-white px-3 py-2 rounded-md text-sm font-medium">{userInfo.firstName} {userInfo.lastName}</span>
                <button onClick={logout} className="text-white px-3 py-2 rounded-md text-sm font-medium ml-4">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCart;
