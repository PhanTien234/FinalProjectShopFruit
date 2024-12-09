import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { configureAlerts, ToastContainer } from '../alert/alert';
import backgroundImage from '../assets/images/backgroundimage.png';
import googleIcon from '../assets/icons/Googleicon.png';
import facebookIcon from '../assets/icons/facebookicon.png';
import { useAuth } from '../components/AuthContext';

const LoginForm = () => {
  const { success, alertError } = configureAlerts();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:5001/api/Auths/login', {
        email,
        password,
      });

      const { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt, user } = response.data.token;

      login(user, {
        accessToken,
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
      });

      // Navigate based on the user's role
      if (user.role === 1) {
        navigate('/seller');
      } else {
        navigate('/');
      }
      success('Login successful!');
    } catch (error) {
      alertError(error.response?.data?.error || 'An unexpected error occurred.');
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
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
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show Password</span>
          </label>
        </div>
        <div className="mb-4">
          <button
            className="w-full bg-red-500 text-white p-3 rounded"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="text-center mb-4">
          <Link to="#" className="text-sm text-blue-600">Forgot password</Link>
        </div>
        <div className="flex items-center justify-between mb-4">
          <hr className="w-1/2" />
          <span className="p-2 text-gray-500">OR</span>
          <hr className="w-1/2" />
        </div>
        <div className="flex justify-center mb-4 gap-6">
          <a href="/auth/facebook" className="mr-2">
            <img src={facebookIcon} alt="Facebook" className="h-10 w-10" />
          </a>
          <a href="/auth/google" className="ml-2">
            <img src={googleIcon} alt="Google" className="h-10 w-10" />
          </a>
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
