import React, { useEffect, useState } from 'react';
import { BellIcon } from '@heroicons/react/outline';  // Import the BellIcon
import FruitShopLogo from '../assets/images/Fruitshoplogo.png';  // Import the logo
import { Link, useLocation } from 'react-router-dom'


const NavbarSeller = () => {
    const location = useLocation();  // Get the current route path
    const [title, setTitle] = useState('LOGIN');  // Initialize state for title

    useEffect(() => {
        // Update the title based on the current route
        if (location.pathname === '/register') {
            setTitle('REGISTER');
        } else if (location.pathname === '/login') {
            setTitle('LOGIN');
        }
    }, [location.pathname]);  // Run this effect when the route changes

    return (
        <nav className="bg-blue-600 py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo and title */}
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <img src={FruitShopLogo} alt="FruitShop Logo" className="h-16 w-auto" />
                        </Link>
                        <span className="text-xl font-bold text-white">{title}</span>  {/* Dynamically update the title */}
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
