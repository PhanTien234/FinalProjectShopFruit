import React, { useEffect, useState } from "react";
import axios from "axios";
//import AddressFormModal from "./addresscomponent/AddressFormModal";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { useAuth } from "../components/AuthContext";

const Address = () => {
  const { accessToken } = useAuth(); // Access token from AuthContext
  const [addresses, setAddresses] = useState([]); // Store all user addresses
  const [selectedAddress, setSelectedAddress] = useState(null); // Currently displayed address
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Control dropdown visibility
  const [isModalOpen, setModalOpen] = useState(false); // Control modal visibility

  useEffect(() => {
    // Fetch address data
    const fetchAddressInfo = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/UserAddress/getalladdressbyuser",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Use accessToken from context
            },
          }
        );
        setAddresses(response.data); // Store all addresses
        if (response.data.length > 0) {
          setSelectedAddress(response.data[0]); // Default to the first address
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    if (accessToken) {
      fetchAddressInfo();
    }
  }, [accessToken]); // Run whenever accessToken changes

  // Handle selection of an address from the dropdown
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setDropdownOpen(false); // Close dropdown
  };

  // Open/close the address creation modal
  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LocationMarkerIcon className="h-5 w-5 text-red-500" />
          <h2 className="text-red-500 text-xl font-semibold">
            The Address for Received Product
          </h2>
        </div>
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="text-blue-500 underline"
        >
          Change
        </button>
      </div>

      {/* Address Information */}
      {selectedAddress && (
        <div>
          <div>
            <span className="font-semibold">Full Name:</span>{" "}
            {selectedAddress.fullName}
          </div>
          <div>
            <span className="font-semibold">Phone Number:</span>{" "}
            {selectedAddress.phoneNumberAddress}
          </div>
          <div>
            <span className="font-semibold">Detail Address:</span>{" "}
            {selectedAddress.address}
          </div>
          <div>
            <span className="font-semibold">City:</span> {selectedAddress.city}
          </div>
          <div>
            <span className="font-semibold">Type of Address:</span>{" "}
            {selectedAddress.addressType}
          </div>
        </div>
      )}

      {/* Dropdown List of Addresses */}
      {isDropdownOpen && (
        <div className="mt-4 bg-gray-100 p-2 rounded-md shadow">
          {addresses.map((address, index) => (
            <div
              key={index}
              onClick={() => handleAddressSelect(address)}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
            >
              {address.fullName} - {address.address}
            </div>
          ))}
        </div>
      )}

      {/* Add New Address Button */}
      <div className="mt-4">
        <button
          onClick={toggleModal}
          className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full"
        >
          +
        </button>
      </div>

      {/* Address Form Modal */}
      {/* {isModalOpen && (
        <AddressFormModal
          onClose={toggleModal}
        />
      )} */}
    </div>
  );
};

export default Address;
