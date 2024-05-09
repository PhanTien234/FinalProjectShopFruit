import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { configureAlerts, ToastContainer } from '../alert/alert';
import { useAuth } from '../components/AuthContext';

const Products = () => {
  const { accessToken } = useAuth(); 
  const [products, setProducts] = useState([]);
  const { success, alertError } = configureAlerts();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/Product/getallproductsbyuser', {
          headers: {
            Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [accessToken]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://localhost:5001/api/Product/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
        }
      });
      // After successful deletion, filter out the deleted product from the state
      setProducts(products.filter(product => product.productId !== productId));
      success('Delete Product Successfully!');
    } catch (error) {
      alertError("Error while deleting product");
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-600 flex-grow text-center">All Products</h1>
        <Link to="/create-product" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Discount Price</th>
              <th className="px-4 py-2">Overall Rating</th>
              <th className="px-4 py-2">Supplier ID</th>
              <th className="px-4 py-2">Is Certificate</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productId}>
                <td className="border px-4 py-2">{product.productId}</td>
                <td className="border px-4 py-2">
                  <img src={product.cloudImage.imagePath} alt={product.name} className="w-24 h-24 object-cover" />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">${product.discountPrice}</td>
                <td className="border px-4 py-2">{product.overallRating}</td>
                <td className="border px-4 py-2">{product.supplierId}</td>
                <td className="border px-4 py-2">{product.isCertificate ? 'Yes' : 'No'}</td>
                <td className="border px-4 py-2">
                <Link to={`/update-product/${product.productId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </Link>
                  <button onClick={() => handleDelete(product.productId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
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

export default Products;
