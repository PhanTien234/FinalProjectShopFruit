import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { configureAlerts, ToastContainer } from '../../../alert/alert';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, alertError } = configureAlerts();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('https://localhost:5002/api/Supplier/getallsuppliers', {
        });
        setSuppliers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suppliers:', error.response || error.message);
        alertError('Error fetching suppliers!');
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (supplierId) => {
    try {
      await axios.delete(`https://localhost:5002/api/Supplier/${supplierId}`, {
      });
      setSuppliers(suppliers.filter(supplier => supplier.supplierId !== supplierId));
      success('Supplier deleted successfully');
    } catch (error) {
      alertError('Error deleting supplier!');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold text-gray-600 text-center mb-6">All Suppliers</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Supplier ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Certificate</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              suppliers.map(supplier => (
                <tr key={supplier.supplierId}>
                  <td className="px-4 py-2 border">{supplier.supplierId}</td>
                  <td className="px-4 py-2 border">{supplier.name}</td>
                  <td className="px-4 py-2 border">{supplier.location}</td>
                  <td className="px-4 py-2 border">{supplier.description}</td>
                  <td className="px-4 py-2 border">
                    <img src={supplier.certificateProductUrl} alt="Certificate" className="w-16 h-16 object-cover" />
                  </td>
                  <td className="px-4 py-2 border">
                    <button onClick={() => handleDelete(supplier.supplierId)} className="bg-red-500 text-white px-4 py-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Supplier;
