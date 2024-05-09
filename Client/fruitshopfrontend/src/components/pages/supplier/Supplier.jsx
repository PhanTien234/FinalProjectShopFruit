import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { configureAlerts, ToastContainer } from '../../../alert/alert';

const Supplier = () => {
  const { accessToken } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, alertError } = configureAlerts();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/Supplier/getallsuppliersbyuser', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setSuppliers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suppliers:', error.response || error.message);
      }
    };

    fetchSuppliers();
  }, [accessToken]);

  const handleDelete = async (supplierId) => {
    try {
      await axios.delete(`https://localhost:5001/api/Supplier/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setSuppliers(suppliers.filter(supplier => supplier.supplierId !== supplierId));
      console.log('Supplier deleted successfully');
      success('Supplier deleted successfully')
    } catch (error) {
      console.error('Error deleting supplier:', error.response || error.message);
      alertError('Error deleting supplier!');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-600 flex-grow text-center">All Suppliers</h1>
        <Link to="/create-supplier" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Supplier
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Supplier ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Certificate</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">Loading...</td>
              </tr>
            ) : (
              suppliers.map(supplier => (
                <tr key={supplier.supplierId}>
                  <td className="border px-4 py-2">{supplier.supplierId}</td>
                  <td className="border px-4 py-2">{supplier.name}</td>
                  <td className="border px-4 py-2">{supplier.location}</td>
                  <td className="border px-4 py-2">{supplier.description}</td>
                  <td className="border px-4 py-2">
                    <img src={supplier.certificateProductUrl} alt="Certificate" className="w-24 h-24" />
                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/update-supplier/${supplier.supplierId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(supplier.supplierId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                  </td>
                </tr>
              ))
            )}
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

export default Supplier;
