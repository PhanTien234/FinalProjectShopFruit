// SellerSidebar.jsx
import React, { useState } from 'react';
import { FaShoppingCart, FaBoxOpen, FaChartLine, FaUsers, FaDollarSign, FaDatabase, FaStore } from 'react-icons/fa';

const SidebarLink = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-6 py-2 rounded-lg ${
      isActive ? 'bg-red-100 text-red-600 font-semibold' : 'text-gray-700'
    } hover:bg-gray-100 transition`}
  >
    {children}
  </button>
);

const SellerSidebar = ({ handleComponentChange }) => {
  const [activeLink, setActiveLink] = useState('profile'); 
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isMarketingDropdownOpen, setMarketingDropdownOpen] = useState(false);
  const [isFinancialDropdownOpen, setFinancialDropdownOpen] = useState(false);
  const [isDataDropdownOpen, setDataDropdownOpen] = useState(false);
  const [isShopInfoDropdownOpen, setShopInfoDropdownOpen] = useState(false);
  const [isSupplierDropdownOpen, setSupplierDropdownOpen] = useState(false);

  const handleLinkClick = (component, path) => {
    setActiveLink(component); // Update active link state
    handleComponentChange(component, path); // Notify parent about the component change
  };

  return (
    <nav className="w-72 bg-gray-50 shadow-lg p-6">
        {/* My Profile Section */}
        <div className="mb-6">
          <button
            onClick={() => setOrdersDropdownOpen(!isOrdersDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isOrdersDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaShoppingCart className="mr-2" /> Order Management
          </button>
          {isOrdersDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'batch-shipments'}
                onClick={() => handleLinkClick('batch-shipments', '/seller/batch-shipments')}
              >
                Multiple Delivery
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'cancellations'}
                onClick={() => handleLinkClick('cancellations', '/seller/cancellations')}
              >
                Canceled orders
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'returns-refunds'}
                onClick={() => handleLinkClick('returns-refunds', '/seller/returns-refunds')}
              >
                Return Product/Refund Money
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'shipping-settings'}
                onClick={() => handleLinkClick('shipping-settings', '/seller/shipping-settings')}
              >
                Setting Delivery
              </SidebarLink>
            </div>
          )}
        </div>

        {/* Manage Financial */}
        <div className="mb-6">
          <button
            onClick={() => setProductsDropdownOpen(!isProductsDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isProductsDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaBoxOpen className="mr-2" /> Product Management
          </button>
          {isProductsDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'products'}
                onClick={() => handleLinkClick('products', '/seller/products')}
              >
                All Products
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'create-product'}
                onClick={() => handleLinkClick('create-product', '/seller/create-product')}
              >
                Add Product
              </SidebarLink>
            </div>
          )}
        </div>

        {/* Notifications Section */}
        <div className="mb-6">
          <button
            onClick={() => setSupplierDropdownOpen(!isSupplierDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isSupplierDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaUsers className="mr-2" /> Supplier Management
          </button>
          {isSupplierDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'suppliers'}
                onClick={() => handleLinkClick('suppliers', '/seller/suppliers')}
              >
                All Suppliers
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'create-supplier'}
                onClick={() => handleLinkClick('create-supplier', '/seller/create-supplier')}
              >
                Add Supplier
              </SidebarLink>
            </div>
          )}
        </div>

        {/* Manage Supplier */}
        <div className="mb-6">
          <button
            onClick={() => setMarketingDropdownOpen(!isMarketingDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isMarketingDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaChartLine className="mr-2" /> Marketing Channel
          </button>
          {isMarketingDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'marketing'}
                onClick={() => handleLinkClick('marketing', '/seller/marketing')}
              >
                Banner Management
              </SidebarLink>
            </div>

          )}
        </div>

        {/* Manage Categories */}
        <div className="mb-6">
          <button
            onClick={() => setFinancialDropdownOpen(!isFinancialDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isFinancialDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaDollarSign className="mr-2" /> Financial Management
          </button>
          {isFinancialDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'totalMoneyPaid'}
                onClick={() => handleLinkClick('totalMoneyPaid', '/seller/totalMoneyPaid')}
              >
                Total Revenue
              </SidebarLink>
            </div>

          )}
        </div>

        {/* Manage Units of Fruit */}
        <div className="mb-6">
          <button
            onClick={() => setDataDropdownOpen(!isDataDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isDataDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaDatabase className="mr-2" /> Data Management
          </button>
          {isDataDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'statisticsell'}
                onClick={() => handleLinkClick('statisticsell', '/seller/statisticsell')}
              >
                Sales Analysis
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'effectiveSell'}
                onClick={() => handleLinkClick('effectiveSell', '/seller/effectiveSell')}
              >
                Operational Efficiency
              </SidebarLink>
            </div>
          )}
        </div>
        {/* Manage Payment Method */}
        <div className="mb-6">
          <button
            onClick={() => setShopInfoDropdownOpen(!isShopInfoDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isShopInfoDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaUsers className="mr-2" /> Shop Management
          </button>
          {isShopInfoDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'shopinformation'}
                onClick={() => handleLinkClick('shopinformation', '/seller/shopinformation')}
              >
                Shop Information
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'BankAccount'}
                onClick={() => handleLinkClick('BankAccount', '/seller/BankAccount')}
              >
                Bank Account
              </SidebarLink>
            </div>
          )}
        </div>
    </nav>
  );
};

export default SellerSidebar;
