import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import NavbarCart from '../layout/NavbarCart';
import Footer from '../layout/Footer';
import {SearchIcon} from '@heroicons/react/outline';
import FruitShopLogo from '../assets/images/Fruitshoplogo.png';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { accessToken } = useAuth(); // Access the access token from AuthContext

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/Cart', {
          headers: {
            Authorization: `Bearer ${accessToken}` // Send the access token in the request headers
          }
        });
        setCartItems(response.data.cart.items);
      } catch (error) {
        console.error('Error fetching cart items:', error.response || error.message);
      }
    };

    fetchCartItems();
  }, [accessToken]); // Include accessToken in the dependency array

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`https://localhost:5001/api/Cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}` // Send the access token in the request headers
        }
      });
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error.response || error.message);
    }
  };

  return (
    <>
      <NavbarCart />
        {/* Sub-navigation bar with search */}
      <div className="bg-white shadow py-5"> {/* Increased padding for overall height */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between"> {/* Removed h-40 */}
            {/* Brand Logo and Cart Indicator */}
            <div className="flex items-center">
              {/* Brand Logo */}
              <div className="flex-shrink-0">
                <img className="h-16 w-auto" src={FruitShopLogo} alt="FruitShop Logo" /> {/* Adjusted logo height */}
              </div>
              <div className="ml-3 flex items-center">
                <span className="text-red-600 font-bold text-3xl">|</span> {/* Single separator with increased size */}
                <span className="text-red-600 font-bold text-3xl ml-3">Giỏ hàng</span> {/* Increased text size for "Giỏ hàng" */}
              </div>
            </div>
            {/* Search input */}
            <div className="flex justify-center flex-grow lg:max-w-2xl"> {/* Made search bar grow to use available space */}
              <label htmlFor="search-cart" className="sr-only">Search</label>
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon className="h-8 w-8 text-red-600" aria-hidden="true" /> {/* Icon size is appropriate */}
                </span>
                <input 
                  id="search-cart" 
                  name="search-cart"
                  className="block w-full py-2 text-xl text-red-600 placeholder-red-600 bg-transparent border-b-4 border-red-600 rounded-md pl-12 focus:outline-none focus:border-red-700" 
                  placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn..." 
                  autoComplete="off" 
                /> {/* Extended placeholder to make it more visible */}
              </div>
            </div>
            {/* Icons and User Info - Hidden in CartPage */}
          </div>
        </div>
      </div>
      {/* Add your code here*/}
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cartItems.map(item => (
                <div key={item.productId} className="bg-white p-4 rounded shadow-md">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">${item.price}</p>
                <button onClick={() => handleRemoveFromCart(item.productId)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">Remove</button>
                </div>
            ))}
            </div>
        )}
        </div>
        <Footer /> {/* Render Footer component */}
    </>
  );
};

export default CartPage;
