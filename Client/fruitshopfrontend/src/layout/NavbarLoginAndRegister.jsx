import React from 'react';
import { BellIcon } from '@heroicons/react/outline';  // Import the BellIcon
import FruitShopLogo from '../assets/images/Fruitshoplogo.png';  // Import the logo

const NavbarSeller = () => {
    return (
        <nav className="bg-red-600 py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo and title */}
                    <div className="flex items-center space-x-4">
                        <img src={FruitShopLogo} alt="FruitShop Logo" className="h-16 w-auto" />
                        <span className="text-xl font-bold text-white">LOGIN</span>
                    </div>
                    {/* Right side items */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Icon */}
                        <button type="button" className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                            <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                        {/* Help text */}
                        <span className="font-medium text-white">Do you need help?</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarSeller;
