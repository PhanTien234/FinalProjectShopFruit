import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePaymentMethodForm = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [paymentMethodData, setPaymentMethodData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethodData({ ...paymentMethodData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', paymentMethodData.name);
            formData.append('description', paymentMethodData.description);
    
            const response = await axios.post('https://localhost:5002/api/PaymentMethods', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
            });
    
            console.log('Payment Method created:', response.data);
            setShowModal(true); // Show modal after successful creation
        } catch (error) {
            console.error('Error creating payment method:', error);
        }


    };

  const handleModalClose = () => {
    setShowModal(false);
    setPaymentMethodData({ name: '', description: '' }); 
    //navigate('/admin/payment-methods'); // Redirect to Payment Methods page
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" name="name" value={paymentMethodData.name} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea name="description" value={paymentMethodData.description} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full h-24 resize-none"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Payment Method</button>
      </form>
      {/* Modal for success message */}
      {showModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <p className="text-lg font-semibold mb-4">Payment Method created successfully!</p>
            <button
              onClick={handleModalClose}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePaymentMethodForm;
