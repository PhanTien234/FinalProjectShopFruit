import React from 'react';
import { LocationMarkerIcon } from '@heroicons/react/outline';

const AddressComponent = ({ address }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-2">
        <LocationMarkerIcon className="h-5 w-5 text-red-500" />
        <h2 className="text-red-500 text-xl font-semibold">Địa chỉ nhận hàng</h2>
      </div>
      <p>{address}</p>
    </div>
  );
};

export default AddressComponent;
