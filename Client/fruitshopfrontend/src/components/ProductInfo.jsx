import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductInfo = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize quantity state
  const [availableQuantity, setAvailableQuantity] = useState(0); // Initialize availableQuantity state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/Product/${productId}`);
        const productData = response.data;
        setProduct(productData);
        setAvailableQuantity(productData.availableQuantity); // Set availableQuantity from product data
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Function to handle quantity increase
  const increaseQuantity = () => {
    if (quantity < availableQuantity) {
      setQuantity(quantity + 1);
    }
  };

  // Function to handle quantity decrease
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-2">
      {product && (
        <>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            {/* Display Discount Price and Price separately */}
            <span className="text-xl font-semibold text-red-600 line-through">{product.discountPrice} USD</span>
            <span className="text-xl font-semibold text-gray-500">{product.price} USD</span>
          </div>
          <div className="flex items-center">
            <div className="text-sm bg-red-200 text-red-600 py-1 px-2 rounded-full">8% GIẢM</div>
            {/* Additional discount info */}
          </div>
          <div className="flex items-center">
            <button onClick={decreaseQuantity} className="px-3 py-1 bg-blue-500 text-white rounded-md">
              -
            </button>
            <span className="px-3 py-1">{quantity}</span>
            <button onClick={increaseQuantity} className="px-3 py-1 bg-blue-500 text-white rounded-md">
              +
            </button>
            {/* Display available quantity separately */}
            <span className="ml-2 text-sm text-gray-500">Available: {availableQuantity}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
