import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FooterSeller from '../layout/FooterSeller';
import NavbarSeller from '../layout/NavbarSeller';
import Products from '../components/Products';
// Import the necessary icons from a library like FontAwesome or Material-UI
import { FaShoppingCart, FaBoxOpen, FaChartLine, FaUsers, FaDollarSign, FaDatabase, FaStore } from 'react-icons/fa';

const SidebarLink = ({ to,onClick, children }) => (
  <Link to={to} onClick={onClick} className="block px-4 py-2 hover:bg-gray-200">
    {children}
  </Link>
);

const SellerPage = () => {
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isMarketingDropdownOpen, setMarketingDropdownOpen] = useState(false);
  const [isFinancialDropdownOpen, setFinancialDropdownOpen] = useState(false);
  const [isDataDropdownOpen, setDataDropdownOpen] = useState(false);
  const [isShopInfoDropdownOpen, setShopInfoDropdownOpen] = useState(false);
  const [isSupplierDropdownOpen, setSupplierDropdownOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home'); 


  const navigate = useNavigate();

  const handleComponentChange = (component, path) => {
    navigate(path); // Change the URL
    setActiveComponent(component); // Update the active component
  };
  return (
    <div className="flex flex-col min-h-screen ">
      <header>
        <NavbarSeller />
      </header>
      
      <div className="flex flex-grow mt-8">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-md">
          <div className="p-4">
            <div className="mb-4">
              <button 
                onClick={() => setOrdersDropdownOpen(!isOrdersDropdownOpen)} 
                className="w-full text-left font-bold flex items-center"
              >
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
              <button 
                onClick={() => setProductsDropdownOpen(!isProductsDropdownOpen)} 
                className="w-full text-left font-bold flex items-center"
              >
                <FaBoxOpen className="mr-2" /> Product Management
              </button>
              {isProductsDropdownOpen && (
                <div className="ml-6">
                  <SidebarLink
                    to="/products"
                    onClick={(e) => {
                      e.preventDefault();
                      handleComponentChange('products', '/cc');
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
                <SidebarLink to="/suppliers">All Suppliers</SidebarLink>
                <SidebarLink to="/create-supplier">Add Supplier</SidebarLink>
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
                  <SidebarLink to="/shopinformation">Shop Information</SidebarLink>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-grow p-8 bg-white shadow-lg rounded-lg">
        {activeComponent === 'products' && <Products />}
        {activeComponent === 'home' && <div>Welcome to Seller Dashboard</div>}
        </main>
      </div>
      
      <footer className="mt-8">
        <FooterSeller />
      </footer>
    </div>
  );
};

export default SellerPage;
