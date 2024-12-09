import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DeliveryVanIcon from '../assets/icons/delivery-van.png';
import FreeshipLogo from '../assets/icons/freeshiplogo.jpg';
import { QuantityContext } from '../components/ordercomponent/QuantityContext';
import VoucherIcon from '../assets/icons/vouchericon.png';

const ProductInfo = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const { quantity, setQuantity } = useContext(QuantityContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/Product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const increaseQuantity = () => {
    if (quantity < product.availableQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    product && (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center space-x-4">
        <span className="text-2xl text-red-600 font-semibold">{product.price} USD</span>
          <span className="text-xl line-through text-gray-500">{product.discountPrice} USD</span>
        </div>
        <div className="flex items-center space-x-4">
          <img src={VoucherIcon} alt="Voucher" className="w-8 h-8" />
          <span className="text-red-500">Save 2 USD with a voucher</span>
        </div>
        <div className="flex items-center space-x-4">
          <img src={DeliveryVanIcon} alt="Delivery" className="w-8 h-8" />
          <span>Delivery to <strong>An Hai Bac, Son Tra</strong></span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-300">-</button>
          <span>{quantity} KG</span>
          <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-300">+</button>
          <span>Available: {product.availableQuantity} KG</span>
        </div>
      </div>
    )
  );
};

export default ProductInfo;
