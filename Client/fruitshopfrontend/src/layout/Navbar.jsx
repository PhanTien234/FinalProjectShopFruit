import React from 'react';
import { SearchIcon, ShoppingCartIcon, BellIcon, GlobeAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import FruitShopLogo from '../assets/images/Fruitshoplogo.png'; // Import your logo image
import { useAuth } from '../components/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Use the context

  return (
    <nav className="bg-red-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Brand Logo and Links */}
          <div className="flex-1 flex items-center justify-start">
            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-12 w-auto" src={FruitShopLogo} alt="FruitShop Logo"/>
              <img className="hidden lg:block h-12 w-auto" src={FruitShopLogo} alt="FruitShop Logo"/>
            </div>
            {/* Navigation Links */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="#" className="text-white px-3 py-2 rounded-md text-sm font-medium">Link 1</a>
                <a href="#" className="text-white px-3 py-2 rounded-md text-sm font-medium">Link 2</a>
                <a href="#" className="text-white px-3 py-2 rounded-md text-sm font-medium">Link 3</a>
              </div>
            </div>
          </div>

          {/* Search input */}
          <div className="flex-1 flex justify-center">
            <div className="w-full px-2 lg:px-6">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative text-gray-600 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <input 
                  id="search" 
                  className="py-2 text-sm text-white placeholder-white bg-red-700 rounded-md pl-10 focus:outline-none focus:bg-red-800 focus:text-white" 
                  placeholder="Search..." 
                  autoComplete="off" 
                />
              </div>
            </div>
          </div>

          {/* Icons and Text */}
          <div className="flex items-center justify-end">
            {/* Notification Icon */}
            <button className="text-white flex items-center focus:outline-none">
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="ml-1 hidden md:inline">Notification</span>
            </button>

            {/* Language Icon */}
            <button className="text-white flex items-center ml-6 focus:outline-none">
              <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
              <span className="ml-1 hidden md:inline">Language</span>
            </button>

            {/* Help Icon */}
            <button className="text-white flex items-center ml-6 focus:outline-none">
              <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
              <span className="ml-1 hidden md:inline">Help</span>
            </button>

            {/* Shopping Cart Icon */}
            <button className="text-white flex items-center ml-6 focus:outline-none">
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Auth Buttons or User Info */}
            {!isAuthenticated ? (
              <>
                <a href="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium ml-6">Đăng ký</a>
                <span className="text-white mx-2">|</span>
                <a href="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium">Đăng nhập</a>
              </>
            ) : (
              <>
                <img src={user.Avatar} alt={`${user.firstName} ${user.lastName}`} className="h-8 w-8 rounded-full mx-4" />
                <span className="text-white px-3 py-2 rounded-md text-sm font-medium">{user.firstName} {user.lastName}</span>
                <button onClick={logout} className="text-white px-3 py-2 rounded-md text-sm font-medium ml-4">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
