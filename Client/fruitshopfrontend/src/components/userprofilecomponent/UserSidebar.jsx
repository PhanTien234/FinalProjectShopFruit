import React, { useState } from 'react';
import { FaUser, FaShoppingCart, FaBell, FaTicketAlt, FaGift } from 'react-icons/fa';

const SidebarLink = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-4 py-2 ${
      isActive ? 'text-red-500 font-bold' : 'text-black'
    } hover:bg-gray-200`}
  >
    {children}
  </button>
);

const UserSidebar = ({ handleComponentChange }) => {
  const [activeLink, setActiveLink] = useState('profile'); // Track the currently active link
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);

  const handleLinkClick = (component, path) => {
    setActiveLink(component); // Update active link state
    handleComponentChange(component, path); // Notify parent about the component change
  };

  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4">
        {/* My Profile Section */}
        <div className="mb-4">
          <button
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            className={`w-full text-left flex items-center px-4 py-2 ${
              isProfileDropdownOpen ? 'font-bold' : ''
            }`}
          >
            <FaUser className="mr-2" /> My Profile
          </button>
          {isProfileDropdownOpen && (
            <div className="ml-6">
              <SidebarLink
                isActive={activeLink === 'profile-overview'}
                onClick={() => handleLinkClick('profile-overview', '/userprofile/profile')}
              >
                Profile
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'bank-account'}
                onClick={() => handleLinkClick('bank-account')}
              >
                Bank Account
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'address'}
                onClick={() => handleLinkClick('address')}
              >
                Address
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'change-password'}
                onClick={() => handleLinkClick('change-password')}
              >
                Change Password
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'notification-settings'}
                onClick={() => handleLinkClick('notification-settings')}
              >
                Setting Notification
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'privacy-settings'}
                onClick={() => handleLinkClick('privacy-settings')}
              >
                Privacy Settings
              </SidebarLink>
            </div>
          )}
        </div>

        {/* My Orders Section */}
        <div className="mb-4">
          <button
            onClick={() => setOrdersDropdownOpen(!isOrdersDropdownOpen)}
            className={`w-full text-left flex items-center px-4 py-2 ${
              isOrdersDropdownOpen ? 'font-bold' : ''
            }`}
          >
            <FaShoppingCart className="mr-2" /> My Orders
          </button>
          {isOrdersDropdownOpen && (
            <div className="ml-6">
              <SidebarLink
                isActive={activeLink === 'pending-orders'}
                onClick={() => handleLinkClick('pending-orders')}
              >
                Pending Orders
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'completed-orders'}
                onClick={() => handleLinkClick('completed-orders')}
              >
                Completed Orders
              </SidebarLink>
            </div>
          )}
        </div>

        {/* Notifications Section */}
        <div className="mb-4">
          <button
            onClick={() => setNotificationsDropdownOpen(!isNotificationsDropdownOpen)}
            className={`w-full text-left flex items-center px-4 py-2 ${
              isNotificationsDropdownOpen ? 'font-bold' : ''
            }`}
          >
            <FaBell className="mr-2" /> Notifications
          </button>
          {isNotificationsDropdownOpen && (
            <div className="ml-6">
              <SidebarLink
                isActive={activeLink === 'update-order'}
                onClick={() => handleLinkClick('update-order')}
              >
                Update Order
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'promotion'}
                onClick={() => handleLinkClick('promotion')}
              >
                Promotion
              </SidebarLink>
              <SidebarLink
                isActive={activeLink === 'update-fruitsshop'}
                onClick={() => handleLinkClick('update-fruitsshop')}
              >
                Update FruitsShop
              </SidebarLink>
            </div>
          )}
        </div>

        {/* Vouchers and Rewards */}
        <SidebarLink
          isActive={activeLink === 'vouchers'}
          onClick={() => handleLinkClick('vouchers')}
        >
          <FaTicketAlt className="inline-block mr-2" /> My Vouchers
        </SidebarLink>
        <SidebarLink
          isActive={activeLink === 'rewards'}
          onClick={() => handleLinkClick('rewards')}
        >
          <FaGift className="inline-block mr-2" /> My Rewards
        </SidebarLink>
      </div>
    </nav>
  );
};

export default UserSidebar;
