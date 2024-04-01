import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { configureAlerts, ToastContainer } from '../alert/alert';
import backgroundImage from '../assets/images/backgroundimage.png';
import { useAuth } from '../components/AuthContext';

const LoginForm = () => {
  const { success, alertError } = configureAlerts();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
// Inside LoginForm component after successful login
const { login } = useAuth();

const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submit action
  try {
    const response = await axios.post('https://localhost:5001/api/Auths/login', {
      email,
      password,
    });
    // Assuming response.data contains the user object with firstName, lastName, and avatar
    
    const { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt, user } = response.data.token;
      login(
      //   {
      //   FirstName: response.data.token.user.firstName,
      //   LastName: response.data.token.user.lastName,
      //   Avatar: response.data.token.user.avatar,
      
      // }, 
      user,
        
        {
        // accessToken: response.data.token.accessToken,
        // refreshToken: response.data.token.refreshToken,
        // accessTokenExpiresAt: response.data.token.accessTokenExpiresAt,
        // refreshTokenExpiresAt: response.data.token.refreshTokenExpiresAt,
        accessToken,
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
     
      });
    navigate('/');
    success('Login successful!'); // response.data.message can be used if your API sends back a message
  } catch (error) {
    // Show error notification
    alertError(error.response?.data?.error || 'An unexpected error occurred.');
  }
};

  return (
    <div 
      className="min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button className="w-full bg-red-500 text-white p-3 rounded" onClick={handleSubmit}>Login</button>
        </div>
        <div className="text-center mb-4">
          <Link to="#" className="text-sm text-blue-600">Forgot password</Link>
        </div>
        <div className="flex items-center justify-between mb-4">
          <hr className="w-1/2" />
          <span className="p-2 text-gray-500">OR</span>
          <hr className="w-1/2" />
        </div>
        <div className="flex justify-between mb-4">
          <button className="w-1/2 bg-blue-500 text-white p-3 rounded mr-2">Facebook</button>
          <button className="w-1/2 bg-green-500 text-white p-3 rounded ml-2">Google</button>
        </div>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-sm text-blue-600">Register</Link>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LoginForm;
