import React from 'react';
import SellerDashboardImage from '../../assets/images/SellerDashboard.jpg';

const AdminDashBoardHomeImage = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <img
        src={SellerDashboardImage}
        alt="Admin Dashboard"
        className="w-3/4 h-auto object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default AdminDashBoardHomeImage;
