import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

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
      <Navbar />
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
