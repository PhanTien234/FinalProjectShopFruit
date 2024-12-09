import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { configureAlerts, ToastContainer } from '../../alert/alert';
import UpdatePaymentMethodForm from '../../components/paymentmethodcomponent/UpdatePaymentMethodForm';
import SuccessModal from '../../alert/SuccessAlertModal';
import { FaEdit, FaTrash } from "react-icons/fa";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [currentPaymentMethodId, setCurrentPaymentMethodId] = useState(null);
  const { success, alertError } = configureAlerts();

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get('https://localhost:5002/api/PaymentMethods');
        setPaymentMethods(response.data);
      } catch (error) {
        alertError('Failed to fetch payment methods.');
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleDelete = async (paymentMethodId) => {
    try {
      await axios.delete(`https://localhost:5002/api/PaymentMethods/${paymentMethodId}`);
      setPaymentMethods(paymentMethods.filter(pm => pm.id !== paymentMethodId));
      success('Payment Method deleted successfully!');
    } catch (error) {
      alertError('Error deleting payment method!');
    }
  };

  const handleEdit = (paymentMethodId) => {
    setCurrentPaymentMethodId(paymentMethodId);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Payment Methods</h1>
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
        <table className="w-full border border-gray-300 shadow-md text-sm">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border px-4 py-2 text-center">ID</th>
              <th className="border px-4 py-2 text-center">Name</th>
              <th className="border px-4 py-2 text-center">Description</th>
              <th className="border px-4 py-2 text-center">Created At</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((pm, index) => (
              <tr key={pm.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border px-4 py-2 text-center">{pm.id}</td>
                <td className="border px-4 py-2 text-center">{pm.name}</td>
                <td className="border px-4 py-2 text-center">{pm.description}</td>
                <td className="border px-4 py-2 text-center">{new Date(pm.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(pm.id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(pm.id)}
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

      {showModal && (
        <UpdatePaymentMethodForm
          paymentMethodId={currentPaymentMethodId}
          setShowModal={setShowModal}
          setSuccessModal={setSuccessModal}
        />
      )}
      {successModal && <SuccessModal handleClose={() => setSuccessModal(false)} />}

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

export default PaymentMethods;
