import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentMethodAndTotalPayment = ({ orderItems, setPaymentMethod }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// Calculate total price and total payment dynamically
  const totalPriceProduct = orderItems.reduce((total, item) => total + parseFloat(item.total || 0), 0); // Sum of all item totals
  const shippingCost = orderItems.reduce((total, item) => total + parseFloat(item.shippingCost || 0), 0); // Sum of all shipping costs
  const totalPayment = totalPriceProduct + shippingCost;

  useEffect(() => {
    // Fetch payment methods from the API
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/PaymentMethods');
        const methods = response.data;
        setPaymentMethods(methods);
        if (methods.length > 0) {
          const defaultMethod = methods[0];
          setSelectedPaymentMethod(defaultMethod);// Set the first method as default
          setPaymentMethod(defaultMethod); // Update parent state
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, [setPaymentMethod]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentMethod(method);// Update parent state when payment method changes
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Payment method</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-medium">{selectedPaymentMethod?.name || 'Loading...'}</p>
          <p className="text-sm text-gray-500">{selectedPaymentMethod?.description}</p>
        </div>
        <button
          onClick={handleDropdownToggle}
          className="text-red-500 border border-red-500 rounded px-4 py-2"
        >
          Change
        </button>
      </div>

      {isDropdownOpen && (
        <div className="mt-4 border border-gray-300 rounded-lg shadow-lg bg-white">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handlePaymentMethodChange(method)}
            >
              <p className="font-medium">{method.name}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <p>Total Price Product</p>
          <p>{`${totalPriceProduct.toFixed(2)} USD`}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Shipping fee</p>
          <p>{`${shippingCost.toFixed(2)} USD`}</p>
        </div>
        <div className="flex justify-between mb-2 font-semibold">
          <p>Total payment</p>
          <p className="text-lg text-red-600">{`${totalPayment.toFixed(2)} USD`}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Click on "<span className="font-semibold">Order</span>" that mean you accept follow{' '}
          <a
            href="https://shopee.vn"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            FruitShop Terms
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodAndTotalPayment;
