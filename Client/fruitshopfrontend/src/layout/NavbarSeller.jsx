import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BellIcon } from '@heroicons/react/outline';  // Import the BellIcon
import { useAuth } from '../components/AuthContext';


const NavbarSeller = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        imageUserPath: 'default-avatar-path.svg'
    });

    useEffect(() => {
        if (user && user.userId) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`https://localhost:5001/api/Users/${user.userId}`);
                    if (response.data) {
                        setUserInfo({
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            imageUserPath: response.data.imageUserPath || 'default-avatar-path.svg'
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    // Handle errors or set default data here
                }
            };
            fetchUserData();
        }
    }, [user]);
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
                        {user ? (
                            <>
                                <img src={userInfo.imageUserPath} alt="User avatar" className="h-10 w-10 rounded-full" />
                                <span className="font-medium">{userInfo.firstName} {userInfo.lastName}</span>
                            </>
                        ) : (
                            <span className="font-medium">Guest</span> // Default display if no user is logged in
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarSeller;
