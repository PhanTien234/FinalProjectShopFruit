import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShoppingCartIcon, SearchIcon, BellIcon, GlobeAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import FruitShopLogo from '../assets/images/Fruitshoplogo.png';
import facebookIcon from '../assets/icons/facebookicon.png';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const { isAuthenticated, user, accessToken, logout } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get('https://localhost:5001/api/Cart', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const { cartItemCount } = response.data;
          setCartItemCount(cartItemCount);
        } catch (error) {
          console.error('Error fetching cart items:', error.response || error.message);
        }
      }
    };

    fetchCartItemCount();
  }, [isAuthenticated, accessToken]);

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
    if (!isAuthenticated) {
      setCartItemCount(0);
    }
  }, [isAuthenticated]);

  const handleCartButtonClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  const handleSellerRegistrationClick = () => {
    if (isAuthenticated) {
      navigate('/sellerRegistration');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-red-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          {/* Top Row: Logo, Primary Links, and Authentication */}
          <div className="w-full flex justify-between items-center py-2">
            <div className="flex items-center">
              <img className="h-12 w-auto" src={FruitShopLogo} alt="FruitShop Logo"/>
              <div className="ml-6 flex space-x-4">
              <button onClick={handleSellerRegistrationClick} className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-300 ease-in-out">Become a Seller</button>
                <a href="#" className="flex items-center text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-300 ease-in-out">
                  <img src={facebookIcon} className="h-6 w-6 mr-2" alt="Facebook"/>
                  Connection
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-white flex items-center focus:outline-none">
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                <span className="ml-1 hidden md:inline">Notification</span>
              </button>
              <button className="text-white flex items-center ml-6 focus:outline-none">
                <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                <span className="ml-1 hidden md:inline">Language</span>
              </button>
              <button className="text-white flex items-center ml-6 focus:outline-none">
                <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                <span className="ml-1 hidden md:inline">Help</span>
              </button>
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium ml-6">Đăng ký</Link>
                  <span className="text-white mx-2">|</span>
                  <Link to="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium">Đăng nhập</Link>
                </>
              ) : (
                <>
                  <img src={user?.Avatar} alt={`${user?.firstName} ${user?.lastName}`} className="h-8 w-8 rounded-full mx-4" />
                  <span className="text-white px-3 py-2 rounded-md text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                  <button onClick={logout} className="text-white px-3 py-2 rounded-md text-sm font-medium ml-4">Logout</button>
                </>
              )}
            </div>
          </div>
          {/* Bottom Row: Search and Cart */}
          <div className="w-full flex justify-between items-center py-2">
            <div className="w-full flex justify-center">
              <div className="relative w-1/2">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <input
                  className="py-2 w-full text-sm text-white placeholder-white bg-red-700 rounded-md pl-10 focus:outline-none focus:bg-red-800 focus:text-white"
                  placeholder="Search..."
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
