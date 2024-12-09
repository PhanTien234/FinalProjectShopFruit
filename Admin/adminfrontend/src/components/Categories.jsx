import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { configureAlerts, ToastContainer } from '../alert/alert';
import { FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { success, alertError } = configureAlerts();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:5002/api/Category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`https://localhost:5002/api/Category/${categoryId}`);
      setCategories(categories.filter(category => category.id !== categoryId));
      console.log('Category deleted successfully');
      success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      alertError('Error deleting category!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Categories</h1>
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
        <table className="w-full border border-gray-300 shadow-md text-sm">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">Category ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Image</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Created At</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-300 px-4 py-2 text-center">{category.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{category.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{category.description}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {category.cloudImage?.imagePath && (
                    <img src={category.cloudImage.imagePath} alt={category.name} className="h-16 w-16 object-cover mx-auto" />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{new Date(category.createdAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2 text-center flex justify-center gap-2">
                  <Link
                    to={`/update-category/${category.id}`}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default Categories;
