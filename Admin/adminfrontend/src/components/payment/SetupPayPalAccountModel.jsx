import React, { useState } from "react";
import axios from "axios";

const SetupPayPalAccountModal = ({ userId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    payPalFirstName: "",
    payPalLastName: "",
    payPalEmail: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.payPalFirstName || !formData.payPalLastName || !formData.payPalEmail) {
      setError("All fields are required.");
      return;
    }

    try {
              // Add userId to the formData
      const payload = { ...formData, userId };
      const response = await axios.post(
        `https://localhost:5002/api/Payment/setup-seller-paypal-account/${userId}`,
        payload
      );
      if (response.data) {
        onSuccess();
        onClose();
      } else {
        setError("Failed to setup PayPal account. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to setup PayPal account. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Setup PayPal Account</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="payPalFirstName"
              value={formData.payPalFirstName}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="payPalLastName"
              value={formData.payPalLastName}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="payPalEmail"
              value={formData.payPalEmail}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupPayPalAccountModal;
