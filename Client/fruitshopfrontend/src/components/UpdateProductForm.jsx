import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProductForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    overallRating: 0,
    categoryId: '',
    availableQuantity: 0,
    supplierId: '',
    cloudImage: null,
    imagePath: '',
    image: null,
    isCertificate: false,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://localhost:5001/api/Product/${productId}`);
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

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
      await axios.put(`https://localhost:5001/api/Product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModal(true); // Show modal after successful creation
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/products'); // Redirect to Products page
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
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
          {productData.cloudImage && (
            <img src={productData.cloudImage.imagePath} alt="Product" className="w-24 h-24 object-cover mb-2" />
          )}
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update Product</button>
      </form>
      {/* Modal for success message */}
      {showModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <p className="text-lg font-semibold mb-4">Product Update successfully!</p>
            <button onClick={handleModalClose} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProductForm;
