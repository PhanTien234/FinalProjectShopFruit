import React from 'react';
import { BellIcon } from '@heroicons/react/outline';  // Import the BellIcon

const NavbarSeller = () => {
    return (
        <nav className="bg-white py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo and title */}
                    <div className="flex items-center space-x-4">
                        {/* Replace with your own logo */}
                        <img src="path-to-your-logo.svg" alt="Logo" className="h-12 w-12" />
                        <span className="text-xl font-bold">Seller Channel</span>
                    </div>
                    {/* Right side items */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Icon */}
                        <button type="button" className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                            <BellIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                        </button>
                        {/* User avatar and name */}
                        <img src="path-to-your-avatar.svg" alt="User avatar" className="h-10 w-10 rounded-full" />
                        <span className="font-medium">UserName</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarSeller;
