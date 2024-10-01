import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { configureAlerts, ToastContainer } from '../alert/alert';

const UnitFruits = () => {
  const [unitFruits, setUnitFruits] = useState([]);
  const { success, alertError } = configureAlerts();

  useEffect(() => {
    const fetchUnitFruits = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/UnitFruits');
        setUnitFruits(response.data);
      } catch (error) {
        console.error('Error fetching Unit Fruits:', error);
      }
    };

    fetchUnitFruits();
  }, []);

  const handleDelete = async (unitFruitId) => {
    try {
      await axios.delete(`https://localhost:5001/api/UnitFruits/${unitFruitId}`);
      setUnitFruits(unitFruits.filter(unitFruit => unitFruit.id !== unitFruitId));
      console.log('UnitFruit deleted successfully');
      success('UnitFruit deleted successfully!')
    } catch (error) {
      console.error('Error deleting category:', error);
      alertError('Error deleting category!');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-600 flex-grow text-center">All Unit Fruits</h1>
        <Link to="/create-unit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Unit
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Unit ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {unitFruits.map(unitFruit => (
              <tr key={unitFruit.id}>
                <td className="border px-4 py-2">{unitFruit.id}</td>
                <td className="border px-4 py-2">{unitFruit.name}</td>
                <td className="border px-4 py-2">{new Date(unitFruit.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2">
                  <Link to={`/update-unit/${unitFruit.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(unitFruit.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
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

export default UnitFruits;
