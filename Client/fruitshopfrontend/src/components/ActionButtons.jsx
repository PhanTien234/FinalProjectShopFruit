import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const ActionButtons = ({ productId}) => {
  const navigate = useNavigate();
  const { isAuthenticated, accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);

  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {const response = await axios.post('https://localhost:5001/api/Cart/add', { productId }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const { cartItemCount } = response.data;
      // Update cartItemCount in Navbar
      window.dispatchEvent(new CustomEvent('cartItemCountUpdate', { detail: cartItemCount }));
      setShowModal(true);
    } catch (error) {
      console.error('Error adding to cart:', error.response || error.message);
      // Handle error, maybe display a message to the user
    }
  };

  return (
    <div className="space-x-4">
      <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">Make Order</button>
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
