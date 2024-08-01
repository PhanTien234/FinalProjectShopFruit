import React, { useState, useEffect } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useAuth } from '../../components/AuthContext';

const AddressComponent = () => {
  const [addressInfo, setAddressInfo] = useState({
    fullName: '',
    phoneNumberAddress: '',
    city: '',
    addressType: '',
    address: ''
  });
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchAddressInfo = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/UserAddress/getalladdressbyuser', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const userAddress = response.data[0]; // Assuming the first address is fetched

        setAddressInfo({
          fullName: userAddress.fullName,
          phoneNumberAddress: userAddress.phoneNumberAddress,
          city: userAddress.city,
          addressType: getAddressTypeText(userAddress.addressType),
          address: userAddress.address
        });
      } catch (error) {
        console.error('Error fetching address info:', error);
      }
    };

    fetchAddressInfo();
  }, [accessToken]);

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
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-2">
        <LocationMarkerIcon className="h-5 w-5 text-red-500" />
        <h2 className="text-red-500 text-xl font-semibold">Địa chỉ nhận hàng</h2>
      </div>
      <div>
        <span className="font-semibold">Họ và tên:</span> {addressInfo.fullName}
      </div>
      <div>
        <span className="font-semibold">Số điện thoại:</span> {addressInfo.phoneNumberAddress}
      </div>
      <div>
        <span className="font-semibold">Địa chỉ chi tiết:</span> {addressInfo.address}
      </div>
      <div>
        <span className="font-semibold">Thành phố:</span> {addressInfo.city}
      </div>
      <div>
        <span className="font-semibold">Loại địa chỉ:</span> {addressInfo.addressType}
      </div>
    </div>
  );
};

export default AddressComponent;
