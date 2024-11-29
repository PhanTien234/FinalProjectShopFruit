import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { QuantityContext } from '../components/ordercomponent/QuantityContext';

const ActionButtons = ({ productId}) => {
  const navigate = useNavigate();
  const { isAuthenticated, accessToken } = useAuth();
  const { quantity, setQuantity} = useContext(QuantityContext);
  const [showModal, setShowModal] = useState(false);

  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {const response = await axios.post('https://localhost:5001/api/Cart/add', { productId, quantity }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const { cartItemCount } = response.data;
      // Update cartItemCount in Navbar
      window.dispatchEvent(new CustomEvent('cartItemCountUpdate', { detail: cartItemCount }));
      setShowModal(true);
      // Reset quantity to default (1)
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error.response || error.message);
      // Handle error, maybe display a message to the user
    }
  };

    // Function to handle "Make Order" button click
    const handleMakeOrder = () => {
      if (!isAuthenticated) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }
      navigate(`/checkout/${productId}`, { state: { quantity } }); // Navigate to OrderPage with the productId
    };
  
  return (
    <div className="space-x-4">
      <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleMakeOrder}>
        Make Order
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Add Product to Cart successfully</p>
            <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
