import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import VietNamAddress from '../components/VietNamAddress';
import { useAuth } from '../components/AuthContext';

const SellerRegistrationForm = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    email: '',
    phoneNumber: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [createdFullName, setCreatedFullName] = useState('');
  const [createdPhoneNumber, setCreatedPhoneNumber] = useState('');
  const [createdAddress, setCreatedAddress] = useState('');
  const [createdCity, setCreatedCity] = useState('');
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/Users/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSuccessModal = () => {
    setSuccessModal(false);
    navigate('/sellerpage'); // Navigate to the seller page
  };

  const handleAddressChange = (province, district, ward) => {
    const fullAddress = `${ward}, ${district}, ${province}`;
    setCreatedCity(fullAddress);
  };
  const handleCreateAddress = async () => {
    try {
      await axios.post('https://localhost:5001/api/UserAddress', {
        fullName: createdFullName,
        phoneNumberAddress: createdPhoneNumber,
        address: createdAddress,
        city: createdCity,
        addressType: 1 // Assuming 1 represents the AddressType for Pickup
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}` // Pass the accessToken in the authorization header
        }
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error creating address:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updateData = {
      firstName: userData.firstName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      role: 1 // Assuming the role for a seller account
    };

    try {
      const response = await axios.put(`https://localhost:5001/api/Users/${user.userId}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Update response:', response.data);
      setSuccessModal(true);
      onRegister();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mx-auto max-w-lg">
        <div className="mb-6">
          <label htmlFor="firstName" className="text-gray-700 font-semibold block mb-2">Tên Shop *</label>
          <input type="text" id="firstName" name="firstName" required value={userData.firstName} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="text-gray-700 font-semibold block mb-2">Email *</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div className="mb-6">
          <label htmlFor="phoneNumber" className="text-gray-700 font-semibold block mb-2">Số điện thoại *</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" required value={userData.phoneNumber} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div className="mb-6 flex items-center">
          <label htmlFor="pickupAddress" className="text-gray-700 font-semibold mr-2">Địa chỉ lấy hàng *</label>
          <button type="button" onClick={() => setShowModal(true)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-150">
            <PlusIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>
          <textarea id="pickupAddress" name="pickupAddress" required rows="3" value={`${createdFullName} | ${createdPhoneNumber} ${createdAddress} ${createdCity}`} className="w-full border-gray-300 rounded-md shadow-sm ml-2"></textarea>
        </div>
        <button type="submit" className="mx-auto display-block bg-red-500 text-white py-3 px-4 rounded-md font-semibold hover:bg-red-600 transition duration-300">Lưu</button>
      </form>
      {/* Modal for address input */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
            <h2 className="font-bold text-lg">Thêm Địa Chỉ Mới</h2>
            <input placeholder="Họ & Tên" onChange={(e) => setCreatedFullName(e.target.value)} className="border p-2 w-full" /> 
            <input placeholder="Số điện thoại" onChange={(e) => setCreatedPhoneNumber(e.target.value)} className="border p-2 w-full"  /> 
            <input placeholder="Địa chỉ chi tiết" onChange={(e) => setCreatedAddress(e.target.value)} className="border p-2 w-full" />
            <VietNamAddress onAddressChange={handleAddressChange} />
            <div className="flex justify-between">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700">Hủy</button>
              <button onClick={handleCreateAddress} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Lưu</button>
            </div>
          </div>
        </div>
      )}
      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg space-y-4 flex flex-col items-center">
            <h2 className="font-bold text-lg">You're registered for the role Seller successfully</h2>
            <button onClick={handleSuccessModal} className="bg-green-500 text-white p-2 rounded hover:bg-green-700">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerRegistrationForm;
