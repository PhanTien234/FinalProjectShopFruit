import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaymentByPayPalModal = ({ totalPayment, onClose }) => {
  const handleApprove = (details) => {
    alert(`Transaction completed by ${details.payer.name.given_name}`);
    onClose(); // Close the modal after successful payment
  };

  const handleError = (error) => {
    console.error("PayPal Checkout Error:", error);
    alert("An error occurred during the PayPal transaction.");
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
        
        <PayPalScriptProvider options={{ "client-id": "your-paypal-client-id" }}>
          <div className="mt-4">
            <PayPalButtons
              style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPayment.toFixed(2), // Total payment amount
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(handleApprove);
              }}
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
