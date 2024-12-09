import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const AddressList = () => {
  const { user, accessToken } = useAuth();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/UserAddress/getalladdressbyuser`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setAddresses(response.data);

      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const getAddressTypeText = (addressType) => {
    switch (addressType) {
      case 0:
        return 'Default Address';
      case 1:
        return 'Pickup Address';
      case 2:
        return 'Delivery Address';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mx-auto max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Danh sách địa chỉ</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address.addressId} className="mb-4">
            <div>
              <span className="font-semibold">Họ và tên:</span> {address.fullName}
            </div>
            <div>
              <span className="font-semibold">Số điện thoại:</span> {address.phoneNumberAddress}
            </div>
            <div>
              <span className="font-semibold">Địa chỉ chi tiết:</span> {address.address}
            </div>
            <div>
              <span className="font-semibold">Thành phố:</span> {address.city}
            </div>
            <div>
              <span className="font-semibold">Loại địa chỉ:</span> {getAddressTypeText(address.addressType)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
