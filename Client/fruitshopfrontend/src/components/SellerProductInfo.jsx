import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerInfo = ({ productId }) => {
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const productResponse = await axios.get(`https://localhost:5001/api/Product/${productId}`);
        const productData = productResponse.data;
        const sellerResponse = await axios.get(`https://localhost:5001/api/Users/${productData.userId}`);
        setSeller(sellerResponse.data);
      } catch (error) {
        console.error('Error fetching seller:', error);
      }
    };

    fetchSeller();
  }, [productId]);

  return (
    <div className="p-4 border-t border-b my-4">
      <h3 className="text-lg font-bold">Thông tin người bán</h3>
      {seller && (
        <div className="flex items-center">
          <img src={seller.imageUserPath} alt="Seller avatar" className="w-10 h-10 rounded-full" />
          <div className="ml-2">
            <p className="font-semibold">{seller.firstName} {seller.lastName}</p>
            {/* Add more seller details here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerInfo;