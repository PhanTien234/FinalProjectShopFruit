import React from 'react';
import Products from '../components/Products';
import CreateProduct from '../components/CreateProductForm';
import Supplier from '../components/pages/supplier/Supplier';
import CreateSupplier from '../components/pages/supplier/CreateSupplierForm';
import ShopInformation from '../components/pages/seller/ShopInfomation';
import BankAccount from '../components/userprofilecomponent/PayPalAccountPage';
import SellerDashBoardHomeImage from "../components/sellercomponent/SellerDashBoardHomeImage";

const SellerMainContent = ({ activeComponent }) => {
  return (
    <main className="flex-grow p-8 bg-gray-50 shadow-lg rounded-lg">
 {activeComponent === 'home' && <SellerDashBoardHomeImage />}
      {activeComponent === 'products' && <Products />}
      {activeComponent === 'create-product' && <CreateProduct />}
      {activeComponent === 'suppliers' && <Supplier />} {/* Supplier component when 'suppliers' is selected */}
      {activeComponent === 'create-supplier' && <CreateSupplier />}
      {activeComponent === 'shopinformation' && <ShopInformation />}
      {activeComponent === 'BankAccount' && <BankAccount />}
    </main>
  );
};

export default SellerMainContent;
