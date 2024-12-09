import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/outline';  // Import the BellIcon
import { useAuth } from '../components/AuthContext';
import FruitShopLogo from '../assets/images/Fruitshoplogo.png';


const NavbarSeller = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, accessToken, logout } = useAuth();
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

    const handleAvatarClick = () => {
        // Navigate to the profile page with the user's ID
        navigate(`/userprofile/${user.userId}`);
      };

    return (
        <nav className="bg-[#ef7777] py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo and title */}
                    <div className="flex items-center space-x-4">
                        {/* Replace with your own logo */}
                        <img className="h-16 w-auto" src={FruitShopLogo} alt="FruitShop Logo"/>
                        <span className="text-xl font-bold text-white">Seller Channel</span>
                    </div>
                    {/* Right side items */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Icon */}
                        <button type="button" className="p-2 rounded-full hover:bg-[#d65e5e] focus:outline-none">
                            <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                        {/* User avatar and name */}
                        {!isAuthenticated ? (
                <>
                            <Link to="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium ml-6">Register</Link>
                            <span className="text-white mx-2">|</span>
                            <Link to="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            </>
                        ) : (
                            <>
                            <div className="flex items-center cursor-pointer" onClick={handleAvatarClick}>
                                <img
                                src={userInfo.imageUserPath}
                                alt="User avatar"
                                className="h-8 w-8 rounded-full mx-4"
                                />
                                <span className="text-white px-3 py-2 rounded-md text-sm font-medium">
                                {userInfo.firstName} {userInfo.lastName}
                                </span>
                            </div>
                            <button onClick={logout} className="text-white px-3 py-2 rounded-md text-sm font-medium ml-4">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarSeller;
