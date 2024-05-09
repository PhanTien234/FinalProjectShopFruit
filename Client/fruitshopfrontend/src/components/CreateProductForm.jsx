import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const CreateProductForm = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth(); 
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    discountPrice: 0,
    overallRating: 0,
    categoryId: '',
    availableQuantity: 0,
    supplierId: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  
  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/Category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/Supplier/getallsuppliersbyuser', {
        headers: {
          Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
        }
      });
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
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
          Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product created:', response.data);
      setShowModal(true); // Show modal after successful creation
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/products'); // Redirect to Products page
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Discount Price:</label> {/* Add Discount Price field */}
          <input type="number" name="discountPrice" value={productData.discountPrice} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Supplier:</label>
          <select name="supplierId" value={productData.supplierId} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 w-full">
            <option value="">Select supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.supplierId} value={supplier.supplierId}>{supplier.name}</option>
            ))}
          </select>
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Is Certificate:</label>
          <input type="checkbox" name="isCertificate" checked={productData.isCertificate} onChange={handleCheckboxChange} className="mr-2" />
          <span className="text-gray-700">Yes</span>
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Product</button>
      </form>
      {/* Modal for success message */}
      {showModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <p className="text-lg font-semibold mb-4">Product created successfully!</p>
            <button onClick={handleModalClose} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProductForm;
