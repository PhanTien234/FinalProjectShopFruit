import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import FruitShopLogo from '../assets/images/Fruitshoplogo.png'; 
// import ChatIcon from './chat-icon.svg';
import SellerRegistrationForm from './SellerRegistrationForm';
import axios from 'axios';

// Inside your SellerRegistrationPage component:


const SellerRegistrationPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated, user, accessToken, logout } = useAuth();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    imageUserPath: 'default-avatar-path.svg'
  });

// Function to handle form registration
  const handleRegister = (formData) => {
    console.log(formData);
    // Here you would handle the form submission, e.g., sending data to an API
  };
  const toggleFormDisplay = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (user && user.userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`https://localhost:5001/api/Users/${user.userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          if (response.data) {
            setUserInfo({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              imageUserPath: response.data.imageUserPath || 'default-avatar-path.svg'
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user, accessToken]);


  return (
    <div className="min-h-screen bg-pink-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo and title */}
            <div className="flex items-center space-x-4">
              {/* Replace with your own logo */}
              <img src={FruitShopLogo} alt="Logo" className="h-12 w-12" />
              <span className="text-xl font-bold">Register to become a Seller</span>
            </div>
            {/* User avatar and name */}
            <div className="flex items-center space-x-2">
              <img src={userInfo.imageUserPath} alt="User avatar" className="h-10 w-10 rounded-full" />
              <span className="font-medium">{userInfo.firstName} {userInfo.lastName}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Body */}
      <div className="flex-grow relative pt-16"> {/* Added padding-top here */}
        {!showForm ? (
          <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-md mx-auto my-0">
            {/* Seller Registration Card */}
            <div className="flex flex-col items-center">
              {/* Replace with your illustration image */}
              <img className="mb-6 w-40 h-40 object-cover rounded-full" src={userInfo.imageUserPath} alt="Welcome to Shopee" />
              <h2 className="mb-3 text-3xl text-gray-700 text-center font-bold">Welcome to Fruit Shop!</h2>
              <p className="text-gray-600 text-center mb-8">Please provide more information to become a Seller</p>
              <button onClick={toggleFormDisplay} className="w-full bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition duration-300">
                Start Register
              </button>
            </div>
          </div>
        ) : (
          <SellerRegistrationForm onRegister={handleRegister} />
        )}
        {/* Chat icon */}
        <a href="#" className="absolute right-4 bottom-4">
          {/* Replace with your own chat icon */}
          <img src="path-to-your-chat-icon.svg" alt="Chat" className="h-12 w-12" />
        </a>
      </div>
    </div>
  );
};

export default SellerRegistrationPage;
