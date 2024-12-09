import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Import the useAuth hook from your authentication context

const CreateSupplierForm = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth(); // Get the access token from your authentication context
  const [showModal, setShowModal] = useState(false);
  const [supplierData, setSupplierData] = useState({
    name: '',
    location: '',
    description: '',
    certificateProduct: null // This will hold the file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({ ...supplierData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSupplierData({ ...supplierData, certificateProduct: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', supplierData.name);
      formData.append('location', supplierData.location);
      formData.append('description', supplierData.description);
      formData.append('certificateProduct', supplierData.certificateProduct);

      const response = await axios.post('https://localhost:5001/api/Supplier', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
        }
      });

      console.log('Supplier created:', response.data);
      setShowModal(true); // Show modal after successful creation
    } catch (error) {
      console.error('Error creating supplier:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/suppliers'); // Redirect to Suppliers page
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" name="name" value={supplierData.name} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
          <input type="text" name="location" value={supplierData.location} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea name="description" value={supplierData.description} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full h-24 resize-none"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Certificate Product:</label>
          <input type="file" name="certificateProduct" onChange={handleFileChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Supplier</button>
      </form>
      {/* Modal for success message */}
      {showModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <p className="text-lg font-semibold mb-4">Supplier created successfully!</p>
            <button onClick={handleModalClose} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSupplierForm;
