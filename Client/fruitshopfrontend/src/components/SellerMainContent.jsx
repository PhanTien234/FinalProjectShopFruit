// SellerMainContent.jsx
import React from 'react';
import Products from '../components/Products';

const SellerMainContent = ({ activeComponent }) => {
  return (
    <main className="flex-grow p-8 bg-white shadow-lg rounded-lg">
      {activeComponent === 'products' && <Products />}
      {activeComponent === 'home' && <div>Welcome to Seller Dashboard</div>}
    </main>
  );
};

export default SellerMainContent;
