import React from 'react';
import Products from '../components/Products';
import Supplier from '../components/pages/supplier/Supplier';
import CreateSeller from '../components/pages/supplier/CreateSupplierForm';

const SellerMainContent = ({ activeComponent }) => {
  return (
    <main className="flex-grow p-8 bg-white shadow-lg rounded-lg">
      {activeComponent === 'home' && <div>Welcome to Seller Dashboard</div>}
      {activeComponent === 'products' && <Products />}
      {activeComponent === 'suppliers' && <Supplier />} {/* Supplier component when 'suppliers' is selected */}
      {activeComponent === 'create-supplier' && <CreateSeller />}
    </main>
  );
};

export default SellerMainContent;
