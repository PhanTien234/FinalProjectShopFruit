import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { configureAlerts, ToastContainer } from '../alert/alert';
import { FaEdit, FaTrash } from "react-icons/fa";

const UnitFruits = () => {
  const [unitFruits, setUnitFruits] = useState([]);
  const { success, alertError } = configureAlerts();

  useEffect(() => {
    const fetchUnitFruits = async () => {
      try {
        const response = await axios.get('https://localhost:5002/api/UnitFruits');
        setUnitFruits(response.data);
      } catch (error) {
        console.error('Error fetching Unit Fruits:', error);
      }
    };

    fetchUnitFruits();
  }, []);

  const handleDelete = async (unitFruitId) => {
    try {
      await axios.delete(`https://localhost:5002/api/UnitFruits/${unitFruitId}`);
      setUnitFruits(unitFruits.filter(unitFruit => unitFruit.id !== unitFruitId));
      success('UnitFruit deleted successfully!');
    } catch (error) {
      alertError('Error deleting UnitFruit!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Unit Fruits</h1>
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
        <table className="w-full border border-gray-300 shadow-md text-sm">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">Unit ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Created At</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {unitFruits.map((unitFruit, index) => (
              <tr key={unitFruit.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border px-4 py-2 text-center">{unitFruit.id}</td>
                <td className="border px-4 py-2 text-center">{unitFruit.name}</td>
                <td className="border px-4 py-2 text-center">{new Date(unitFruit.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2 text-center flex justify-center gap-2">
                  <Link
                    to={`/update-unit/${unitFruit.id}`}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(unitFruit.id)}
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

export default UnitFruits;
