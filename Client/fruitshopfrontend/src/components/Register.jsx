import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FadeLoader from "react-spinners/FadeLoader";
import { configureAlerts, ToastContainer } from '../alert/alert';
import backgroundImage from '../assets/images/backgroundimage.png';
import { useAuth } from '../components/AuthContext';

const RegisterForm = () => {
  const { success, alertError } = configureAlerts();
  
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [registrationSuccess,setRegistrationSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Spinner state
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const navigate = useNavigate(); // Initialize useNavigate

  // Inside LoginForm component after successful login
const { login } = useAuth();

  const handleSendVerificationCode = async () => {
    try {
      setLoading(true); // Turn on spinner
      await axios.post('https://localhost:5001/api/EmailVerification/send-code', { email });
      setVerificationSent(true);
      // Turn off spinner after successful verification code sent
      setLoading(false);
      // Show success notification
      success('Verification code sent successfully!');
    } catch (error) {
      setLoading(false); // Turn off spinner if there's an error
      // Show error notification
      alertError('Failed to send verification code.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      await axios.post('https://localhost:5001/api/EmailVerification/verify-code', { email, verificationCode });
      setVerificationSuccess(true);
    } catch (error) {
      // Show error notification
      alertError('Verification code is incorrect.');
    }
  };

  const handleSubmitRegister = async () => {
    // try {
      if (password !== confirmPassword) {
        alertError('Password and confirm password do not match.');
        return;
      }

      const response = await axios.post('https://localhost:5001/api/Auths/register', {
        email,
        password,
        confirmPassword,
      });

      login({
        FirstName: response.data.firstName,
        LastName: response.data.lastName,
        avatar: response.data.avatar // Replace with actual avatar path if available
      });
      navigate('/');
      success(response.data.message);
  };

  return (
    <div  className="min-h-screen flex justify-center items-center"
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {!verificationSent && (
          <div className="mb-4">
            <button
              className="w-full bg-red-500 text-white p-3 rounded"
              onClick={handleSendVerificationCode}
            >
              Next
            </button>
          </div>
        )}
        {verificationSent && !verificationSuccess && (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Verification Code"
                className="w-full p-3 border rounded"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <button
                className="w-full bg-blue-500 text-white p-3 rounded"
                onClick={handleVerifyCode}
              >
                Verify
              </button>
            </div>
          </>
        )}
        {verificationSuccess && (
          <>
            <div className="mb-4">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Password"
                className="w-full p-3 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Confirm Password"
                className="w-full p-3 border rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <button
                className="w-full bg-blue-500 text-white p-3 rounded"
                onClick={handleSubmitRegister}
              >
                Register
              </button>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" onChange={() => setShowPassword(!showPassword)} />
                <span>Show Password</span>
              </label>
            </div>
          </>
        )}
        {loading && ( // Render spinner if loading state is true
          <FadeLoader
            color={'#38D6A2'}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
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
        <div className="flex justify-between mb-4">
          <hr className="w-1/2" />
          <span className="p-2 text-gray-500">Or</span>
          <hr className="w-1/2" />
        </div>
        <div className="flex justify-between mb-4">
          <button className="w-1/2 bg-blue-500 text-white p-3 rounded mr-2">Facebook</button>
          <button className="w-1/2 bg-green-500 text-white p-3 rounded ml-2">Google</button>
        </div>
        <div className="text-center text-sm">
          <p>By registering, you agree to Shop Fruit terms</p>
          <p>Terms of Service & Privacy Policy</p>
        </div>
        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-blue-600">Do you already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;