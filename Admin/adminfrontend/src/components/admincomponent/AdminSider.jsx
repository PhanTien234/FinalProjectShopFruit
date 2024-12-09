import React, { useState } from 'react';
import { FaUser, FaShoppingCart, FaBell, FaChartLine, FaUsers } from 'react-icons/fa';

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

const AdminSidebar = ({ handleComponentChange }) => {
  const [activeLink, setActiveLink] = useState('profile'); // Track the currently active link
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isFinancialsDropdownOpen, setFinancialsDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
  const [isManageSupplierDropdownOpen, setManageSupplierDropdownOpen] = useState(false);
  const [isManagePaymentMethodDropdownOpen, setManagePaymentMethodDropdownOpen] = useState(false);
  const [isManageCategoryDropdownOpen, setManageCategoryDropdownOpen] = useState(false);
  const [isManageUnitDropdownOpen, setManageUnitDropdownOpen] = useState(false);

  const handleLinkClick = (component, path) => {
    setActiveLink(component); // Update active link state
    handleComponentChange(component, path); // Notify parent about the component change
  };

  return (
    <nav className="w-72 bg-gray-50 shadow-lg p-6">

        {/* My Profile Section */}
        <div className="mb-6">
          <button
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isProfileDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaUser className="mr-2" /> Manage User
          </button>
          {isProfileDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'userslist'}
                onClick={() => handleLinkClick('userslist', '/admin/userslist')}
              >
                Users
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'bank-account'}
                onClick={() => handleLinkClick('bank-account', '/admin/bank-account')}
              >
                Bank Account
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'notification-settings'}
                onClick={() => handleLinkClick('notification-settings', '/admin/notification-settings')}
              >
                Setting Notification
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'privacy-settings'}
                onClick={() => handleLinkClick('privacy-settings', '/admin/privacy-settings')}
              >
                Privacy Settings
              </SidebarLink>
            </div>
          )}
        </div>

        {/* Manage Financial */}
        <div className="mb-6">
          <button
            onClick={() => setFinancialsDropdownOpen(!isFinancialsDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isFinancialsDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaChartLine className="mr-2" /> Manage Financial
          </button>
          {isFinancialsDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'totalrevenue'}
                onClick={() => handleLinkClick('totalrevenue', '/admin/totalrevenue')}
              >
                Total Revenue
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'salesanalysis'}
                onClick={() => handleLinkClick('salesanalysis', '/admin/salesanalysis')}
              >
                Sales Analysis
              </SidebarLink>
            </div>
          )}
        </div>

        {/* Notifications Section */}
        <div className="mb-6">
          <button
            onClick={() => setNotificationsDropdownOpen(!isNotificationsDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isNotificationsDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaBell className="mr-2" /> Notifications
          </button>
          {isNotificationsDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'promotion'}
                onClick={() => handleLinkClick('promotion', '/admin/promotion')}
              >
                Promotion
              </SidebarLink>
            </div>
          )}
        </div>

        {/* Manage Supplier */}
        <div className="mb-6">
          <button
            onClick={() => setManageSupplierDropdownOpen(!isManageSupplierDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isManageSupplierDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaUsers className="mr-2" /> Manage Suppliers
          </button>
          {isManageSupplierDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'suppliers'}
                onClick={() => handleLinkClick('suppliers', '/admin/suppliers')}
              >
                All Suppliers
              </SidebarLink>
            </div>
 
          )}
        </div>

        {/* Manage Categories */}
        <div className="mb-6">
          <button
            onClick={() => setManageCategoryDropdownOpen(!isManageCategoryDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isManageCategoryDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaShoppingCart className="mr-2" /> Manage Categories
          </button>
          {isManageCategoryDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'categories'}
                onClick={() => handleLinkClick('categories', '/admin/categories')}
              >
                All Categories
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'create-category'}
                onClick={() => handleLinkClick('create-category', '/admin/create-category')}
              >
                Create Category
              </SidebarLink>
            </div>
 
          )}
        </div>

        {/* Manage Units of Fruit */}
        <div className="mb-6">
          <button
            onClick={() => setManageUnitDropdownOpen(!isManageUnitDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isManageUnitDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaUsers className="mr-2" /> Manage Units of Fruit
          </button>
          {isManageUnitDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'units'}
                onClick={() => handleLinkClick('units', '/admin/units')}
              >
                Manage Units of Fruit
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'create-unit'}
                onClick={() => handleLinkClick('create-unit', '/admin/create-unit')}
              >
                Create Unit
              </SidebarLink>
            </div>
          )}
        </div>
        {/* Manage Payment Method */}
        <div className="mb-6">
          <button
            onClick={() => setManagePaymentMethodDropdownOpen(!isManagePaymentMethodDropdownOpen)}
            className={`flex items-center w-full px-4 py-2 rounded-lg ${
              isManagePaymentMethodDropdownOpen ? 'bg-gray-200 font-bold' : ''
            } hover:bg-gray-100`}
          >
            <FaUsers className="mr-2" /> Manage Payment Method
          </button>
          {isManagePaymentMethodDropdownOpen && (
            <div className="ml-6 mt-2">
              <SidebarLink
                isActive={activeLink === 'paymentmethods'}
                onClick={() => handleLinkClick('paymentmethods', '/admin/paymentmethods')}
              >
                All Payment Methods
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'create-paymentmethod'}
                onClick={() => handleLinkClick('create-paymentmethod', '/admin/create-paymentmethod')}
              >
                Create Payment Method
              </SidebarLink>
            </div>
          )}
        </div>
    </nav>
  );
};

export default AdminSidebar;
