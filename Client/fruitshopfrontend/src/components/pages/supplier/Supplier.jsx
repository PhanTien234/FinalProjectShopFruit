import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import { configureAlerts, ToastContainer } from "../../../alert/alert";

const Supplier = () => {
  const { accessToken } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, alertError } = configureAlerts();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/Supplier/getallsuppliersbyuser",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSuppliers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching suppliers:", error.response || error.message);
        alertError("Error fetching suppliers!");
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [accessToken]);

  const handleDelete = async (supplierId) => {
    try {
      await axios.delete(`https://localhost:5001/api/Supplier/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSuppliers(suppliers.filter((supplier) => supplier.supplierId !== supplierId));
      success("Supplier deleted successfully");
    } catch (error) {
      alertError("Error deleting supplier!");
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-semibold text-gray-600 text-center mb-6">
        All Suppliers
      </h1>
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] bg-white rounded-lg shadow-md">
        <table className="table-auto w-full text-sm text-gray-600">
          <thead>
            <tr>
              {["Supplier ID", "Name", "Location", "Description", "Certificate", "Actions"].map((header, index) => (
                <th key={index} className="px-4 py-2 border-b-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier.supplierId} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{supplier.supplierId}</td>
                  <td className="px-4 py-2 border">{supplier.name}</td>
                  <td className="px-4 py-2 border">{supplier.location}</td>
                  <td className="px-4 py-2 border">{supplier.description}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={supplier.certificateProductUrl}
                      alt="Certificate"
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(supplier.supplierId)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
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
