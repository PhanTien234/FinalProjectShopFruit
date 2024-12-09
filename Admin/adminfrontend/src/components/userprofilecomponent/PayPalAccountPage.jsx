import React, { useState, useEffect } from "react";
import axios from "axios";
import SetupPayPalAccountModal from "../payment/SetupPayPalAccountModel";
import { useAuth } from "../../components/AuthContext"; // Access user and token

const PayPalAccountPage = () => {
  const { user, accessToken } = useAuth(); // Get user and token
  const [paypalAccount, setPaypalAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal visibility

  useEffect(() => {
    const fetchPayPalAccount = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5002/api/Payment/seller-paypal-account/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Auth token
            },
          }
        );
        setPaypalAccount(response.data);
      } catch (error) {
        console.error("Failed to fetch PayPal account:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayPalAccount();
  }, [user.userId, accessToken]);

  const handleModalClose = () => setShowModal(false);
  const handleModalSuccess = () => {
    setLoading(true);
    setPaypalAccount(null); // Reset state to trigger re-fetch
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">PayPal Account</h2>
      {!paypalAccount ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p>No PayPal account linked yet.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create PayPal Account
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <p>
            <strong>First Name:</strong> {paypalAccount.payPalFirstName}
          </p>
          <p>
            <strong>Last Name:</strong> {paypalAccount.payPalLastName}
          </p>
          <p>
            <strong>Email:</strong> {paypalAccount.payPalEmail}
          </p>
        </div>
      )}
      {showModal && (
        <SetupPayPalAccountModal
          userId={user.userId}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};

export default PayPalAccountPage;
