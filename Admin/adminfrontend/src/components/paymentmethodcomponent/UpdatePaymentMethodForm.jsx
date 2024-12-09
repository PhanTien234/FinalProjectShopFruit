import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePaymentMethodForm = ({ paymentMethodId, setShowModal, setSuccessModal }) => {
  const [paymentMethodData, setPaymentMethodData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchPaymentMethod();
  }, []);

  const fetchPaymentMethod = async () => {
    try {
      const response = await axios.get(`https://localhost:5002/api/PaymentMethods/${paymentMethodId}`);
      const { name, description } = response.data;
      setPaymentMethodData({ name, description });
    } catch (error) {
      console.error('Error fetching payment method:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethodData({ ...paymentMethodData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:5002/api/PaymentMethods/${paymentMethodId}`, paymentMethodData);
      setShowModal(false); // Close the Update Payment Method modal
      setSuccessModal(true); // Show the Success modal
    } catch (error) {
      console.error('Error updating payment method:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Update Payment Method</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={paymentMethodData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea
              name="description"
              value={paymentMethodData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 w-full h-24 resize-none"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update Payment Method
            </button>
            <button
              type="button"
              onClick={handleModalClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePaymentMethodForm;
