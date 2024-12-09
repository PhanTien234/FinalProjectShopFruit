// SellerSidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBoxOpen, FaChartLine, FaUsers, FaDollarSign, FaDatabase, FaStore } from 'react-icons/fa';

const SidebarLink = ({ to, onClick, children }) => (
  <Link to={to} onClick={onClick} className="block px-4 py-2 hover:bg-gray-200">
    {children}
  </Link>
);

const SellerSidebar = ({ handleComponentChange }) => {
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isMarketingDropdownOpen, setMarketingDropdownOpen] = useState(false);
  const [isFinancialDropdownOpen, setFinancialDropdownOpen] = useState(false);
  const [isDataDropdownOpen, setDataDropdownOpen] = useState(false);
  const [isShopInfoDropdownOpen, setShopInfoDropdownOpen] = useState(false);
  const [isSupplierDropdownOpen, setSupplierDropdownOpen] = useState(false);

  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4">
        <div className="mb-4">
          <button onClick={() => setOrdersDropdownOpen(!isOrdersDropdownOpen)} className="w-full text-left font-bold flex items-center">
            <FaShoppingCart className="mr-2" /> Order Management
          </button>
          {isOrdersDropdownOpen && (
            <div className="ml-6">
              <SidebarLink to="/batch-shipments">Multiple Delivery</SidebarLink>
              <SidebarLink to="/cancellations">Canceled orders</SidebarLink>
              <SidebarLink to="/returns-refunds">Return Product/Refund Money</SidebarLink>
              <SidebarLink to="/shipping-settings">Setting Delivery</SidebarLink>
            </div>
          )}
        </div>
        <div className="mb-4">
          <button onClick={() => setProductsDropdownOpen(!isProductsDropdownOpen)} className="w-full text-left font-bold flex items-center">
            <FaBoxOpen className="mr-2" /> Product Management
          </button>
          {isProductsDropdownOpen && (
            <div className="ml-6">
              <SidebarLink
                to="/products"
                onClick={(e) => {
                  e.preventDefault();
                  handleComponentChange('products', '/products');
                }}
              >
                All Products
              </SidebarLink>
              <SidebarLink
                to="/create-product"
                onClick={(e) => {
                  e.preventDefault();
                  handleComponentChange('create-product', '/create-product');
                }}
              >
                Add Product
              </SidebarLink>
            </div>
          )}
        </div>
        <div className="mb-4">
          <button
            onClick={() => setSupplierDropdownOpen(!isSupplierDropdownOpen)}
            className="w-full text-left font-bold flex items-center"
          >
            <FaUsers className="mr-2" /> Supplier Management
          </button>
          {isSupplierDropdownOpen && (
           <div className="ml-6">
           <SidebarLink onClick={() => handleComponentChange('suppliers')}>
             All Suppliers
           </SidebarLink>
           <SidebarLink onClick={() => handleComponentChange('create-supplier')}>
             Add Supplier
           </SidebarLink>
         </div>
          )}
        </div>
        <div className="mb-4">
          <button 
            onClick={() => setMarketingDropdownOpen(!isMarketingDropdownOpen)} 
            className="w-full text-left font-bold flex items-center"
          >
            <FaChartLine className="mr-2" /> Marketing Channel
          </button>
          {isMarketingDropdownOpen && (
            <div className="ml-6">
              <SidebarLink to="/marketing">Banner Managements</SidebarLink>
            </div>
          )}
        </div>
        <div className="mb-4">
          <button 
            onClick={() => setFinancialDropdownOpen(!isFinancialDropdownOpen)} 
            className="w-full text-left font-bold flex items-center"
          >
            <FaDollarSign className="mr-2" /> Financial Management
          </button>
          {isFinancialDropdownOpen && (
            <div className="ml-6">
              <SidebarLink to="/totalMoneyPaid">Total Revenue</SidebarLink>
            </div>
          )}
        </div>
        <div className="mb-4">
          <button 
            onClick={() => setDataDropdownOpen(!isDataDropdownOpen)} 
            className="w-full text-left font-bold flex items-center"
          >
            <FaDatabase className="mr-2" /> Data Management
          </button>
          {isDataDropdownOpen && (
            <div className="ml-6">
              <SidebarLink to="/statisticsell">Sales Analysis</SidebarLink>
              <SidebarLink to="/effectiveSell">Operational Efficiency</SidebarLink>
            </div>
          )}
        </div>
        <div className="mb-4">
          <button 
            onClick={() => setShopInfoDropdownOpen(!isShopInfoDropdownOpen)} 
            className="w-full text-left font-bold flex items-center"
          >
            <FaStore className="mr-2" /> Shop Management
          </button>
          {isShopInfoDropdownOpen && (
            <div className="ml-6">
              <SidebarLink onClick={() => handleComponentChange('shopinformation')}>
              Shop Information  
              </SidebarLink>
              <SidebarLink onClick={() => handleComponentChange('BankAccount')}>
              Bank Account 
              </SidebarLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SellerSidebar;
