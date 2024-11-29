import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const PaymentByPayPalModal = ({ totalPayment, onClose, handleOrderSubmit }) => {
  const handleApprove = async () => {
    try {
        // send payment to the admin
        await axios.post("https://localhost:5001/api/Payment/send-payment", {
          recipientEmail: "sb-yimao34470230@personal.example.com", // Admin PayPal email
          amount: totalPayment, // Total payment amount
        });
      // Post the order after payment is successful
        await handleOrderSubmit();
       console.log("Payment sent successfully to the admin.");
      
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      alert("An error occurred during the transaction.");
    } finally {
      onClose(); // Close the modal after the transaction
    }
  };

  const handleError = (error) => {
    console.error("PayPal Checkout Error:", error);
    alert("An error occurred during the PayPal transaction.");
  };

  const createOrder = async () => {
    try {
      // Call your backend API to create an order
      const response = await axios.post(
        "https://localhost:5001/api/Payment/create-order",
        new URLSearchParams({ amount: totalPayment }) // Send the amount as form data
      );

      if (response.status === 200) {
        // Return the order ID from the backend response
         return response.data.id;
              // Call your backend API to capture the order
      } else {
        throw new Error("Failed to create order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("An error occurred while creating the order.");
      throw error; // Propagate the error to PayPalButtons for handling
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Complete your order</h2>
        <p className="mb-2">Total Amount ($)</p>
        <input
          type="number"
          value={totalPayment.toFixed(2)}
          readOnly
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <PayPalScriptProvider options={{ "client-id": "ASZpqn8e_pG6HMN_2B1_EfsCR7xEiEXad_aH86w5lYxjWiPnBO50j6_DQpQ_EN1FVzPpEYOWZxjKFuDo" }}>
          <div className="mt-4">
            <PayPalButtons
              style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
              // Use the backend API to create the order
              createOrder={async () => {
                return createOrder();
              }}
              onApprove={handleApprove}
              onError={handleError}
            />
          </div>
        </PayPalScriptProvider>

        <button
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentByPayPalModal;
