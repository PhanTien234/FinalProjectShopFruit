import React from 'react';
import backgroundImage from '../assets/images/backgroundimage.png'; // Adjust the path as needed
import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <div 
      className="min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8">Đăng nhập</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email/Số điện thoại/Tên đăng nhập"
            className="w-full p-3 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-3 border rounded"
          />
        </div>
        <div className="mb-4">
          <button className="w-full bg-red-500 text-white p-3 rounded">ĐĂNG NHẬP</button>
        </div>
        <div className="text-center mb-4">
          <a href="#" className="text-sm text-blue-600">Quên mật khẩu</a>
        </div>
        <div className="flex items-center justify-between mb-4">
          <hr className="w-1/2" />
          <span className="p-2 text-gray-500">HOẶC</span>
          <hr className="w-1/2" />
        </div>
        <div className="flex justify-between mb-4">
          <button className="w-1/2 bg-blue-500 text-white p-3 rounded mr-2">Facebook</button>
          <button className="w-1/2 bg-green-500 text-white p-3 rounded ml-2">Google</button>
        </div>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Bạn mới biết đến Shopee? </span>
          <Link to="/register" className="text-sm text-blue-600">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
