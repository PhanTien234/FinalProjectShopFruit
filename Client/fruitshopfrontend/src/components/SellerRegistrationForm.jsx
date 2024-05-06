import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';

const SellerRegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    shopName: '',
    pickupAddress: '',
    email: '',
    phoneNumber: ''
  });

  const [showModal, setShowModal] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mx-auto max-w-lg">
        <div className="mb-6">
          <label htmlFor="shopName" className="text-gray-700 font-semibold block mb-2">Tên Shop *</label>
          <input type="text" id="shopName" name="shopName" required onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div className="mb-6 flex items-center">
          <label htmlFor="pickupAddress" className="text-gray-700 font-semibold mr-2">Địa chỉ lấy hàng *</label>
          <button type="button" onClick={() => setShowModal(true)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-150">
            <PlusIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>
          <textarea id="pickupAddress" name="pickupAddress" required rows="3" onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm ml-2"></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="text-gray-700 font-semibold block mb-2">Email *</label>
          <input type="email" id="email" name="email" required onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div className="mb-6">
          <label htmlFor="phoneNumber" className="text-gray-700 font-semibold block mb-2">Số điện thoại *</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" required onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <button type="submit" className="mx-auto display-block bg-red-500 text-white py-3 px-4 rounded-md font-semibold hover:bg-red-600 transition duration-300">Lưu</button>
      </form>
    {/* Modal for address input */}
    {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
            <h2 className="font-bold text-lg">Thêm Địa Chỉ Mới</h2>
            <input placeholder="Họ & Tên" className="border p-2 w-full"/>
            <input placeholder="Số điện thoại" className="border p-2 w-full"/>
            <input placeholder="Địa chỉ chi tiết" className="border p-2 w-full"/>
            <select className="border p-2 w-full">
              <option>Chọn Tỉnh/Thành phố</option>
              {/* Add options here */}
            </select>
            <div className="flex justify-between">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700">Hủy</button>
              <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Lưu</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SellerRegistrationForm;
