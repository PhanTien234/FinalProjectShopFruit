import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { configureAlerts, ToastContainer } from '../alert/alert';

const CreateProductForm = () => {
  const { success, alertError } = configureAlerts();

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    overallRating: 0,
    categoryId: '',
    availableQuantity: 0,
    supplierId: '',
    image: null,
    isCertificate: false,
  });
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/Category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProductData({ ...productData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post('https://localhost:5001/api/Product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      success('Product created successfully!');
      console.log('Product created:', response.data);
    } catch (error) {
      alertError('Failed to create Product!');
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea name="description" value={productData.description} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full h-24 resize-none"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
          <input type="number" name="price" value={productData.price} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Overall Rating:</label>
          <input type="number" name="overallRating" value={productData.overallRating} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
          <select name="categoryId" value={productData.categoryId} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full">
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Available Quantity:</label>
          <input type="number" name="availableQuantity" value={productData.availableQuantity} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Supplier ID:</label>
          <input type="text" name="supplierId" value={productData.supplierId} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Is Certificate:</label>
          <input type="checkbox" name="isCertificate" checked={productData.isCertificate} onChange={handleCheckboxChange} className="mr-2" />
          <span className="text-gray-700">Yes</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Product</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CreateProductForm;
