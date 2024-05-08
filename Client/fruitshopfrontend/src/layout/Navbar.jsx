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
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    imageUserPath: 'default-avatar-path.svg'
  });

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

  return (
    <nav className="bg-red-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          {/* Top Row: Primary Links, and Authentication */}
          <div className="w-full flex justify-between items-center py-2">
            <div className="flex items-center">
              <button onClick={handleSellerRegistrationClick} className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-300 ease-in-out">Become a Seller</button>
                <a href="#" className="flex items-center text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-300 ease-in-out">
                  <img src={facebookIcon} className="h-6 w-6 mr-2" alt="Facebook"/>
                  Connection
                </a>
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
                  <img src={userInfo.imageUserPath} alt="User avatar" className="h-8 w-8 rounded-full mx-4" />
                  <span className="text-white px-3 py-2 rounded-md text-sm font-medium">{userInfo.firstName} {userInfo.lastName}</span>
                  <button onClick={logout} className="text-white px-3 py-2 rounded-md text-sm font-medium ml-4">Logout</button>
                </>
              )}
            </div>
          </div>
          {/* Bottom Row: Logo, Search and Cart */}
          <div className="flex items-center justify-start py-2 w-full">
            <div className="flex items-center mr-4">
              <img className="h-16 w-auto mr-2" src={FruitShopLogo} alt="FruitShop Logo"/> {/* Reduced margin */}
              <span className="text-white text-lg font-bold mr-8 ">Fruit Shop</span> {/* Reduced margin */}
            </div>
            <div className="flex-grow relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <input
                  className="py-2 w-full text-sm text-white placeholder-white bg-red-700 rounded-md pl-10 focus:outline-none focus:bg-red-800 focus:text-white"
                  placeholder="Search..."
                  autoComplete="off"
                />
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
