import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSendVerificationCode = async () => {
    try {
      await axios.post('/api/auth/send-verification-code', { email });
      setVerificationSent(true);
    } catch (error) {
      setError('Failed to send verification code.');
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/auth/register', {
        email,
        verificationCode,
        password,
        confirmPassword,
      });
      setRegistrationSuccess(true);
    } catch (error) {
      setError('Registration failed. User already exists or verification code is incorrect.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
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
        {verificationSent && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Verification Code"
              className="w-full p-3 border rounded"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
        )}
        {verificationSent && (
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {verificationSent && (
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {registrationSuccess && (
          <div className="text-green-500 mb-4">Registration successful!</div>
        )}
        {verificationSent && (
          <div className="mb-4">
            <button
              className="w-full bg-blue-500 text-white p-3 rounded"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        )}
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
