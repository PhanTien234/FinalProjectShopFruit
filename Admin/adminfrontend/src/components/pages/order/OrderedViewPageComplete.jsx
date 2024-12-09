import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const OrderedViewPageComplete = () => {
  const { accessToken } = useAuth(); // Access token from AuthContext
  const [orders, setOrders] = useState([]); // Store all orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message
  const [productNames, setProductNames] = useState({}); // Store product names by productId

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/Orders/getallordersbyuser",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Use accessToken from context
            },
          }
        );

        // Filter orders to include only those with OrderStatus = 1 (Shipping)
        const pendingOrders = response.data.data.filter(
          (order) => order.orderStatus === 1
        );

        setOrders(pendingOrders); // Store filtered orders
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchOrders();
    }
  }, [accessToken]); // Re-run if accessToken changes

  // Fetch product name by productId
  const fetchProductName = async (productId) => {
    try {
      const response = await axios.get(
        `https://localhost:5001/api/Product/${productId}`
      );
      return response.data.name; // Assuming the API returns a `name` field
    } catch {
      return "Unknown Product";
    }
  };

  // Fetch all product names based on order items
  useEffect(() => {
    const fetchAllProductNames = async () => {
      const productIdSet = new Set();
      orders.forEach((order) =>
        order.orderItems.forEach((item) => productIdSet.add(item.productId))
      );

      const productNameMap = {};
      for (let productId of productIdSet) {
        productNameMap[productId] = await fetchProductName(productId);
      }

      setProductNames(productNameMap);
    };

    if (orders.length > 0) {
      fetchAllProductNames();
    }
  }, [orders]); // Re-run if orders change

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders (Shipping)</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          There is no data available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Order Date</th>
                <th className="border px-4 py-2">Total Prices</th>
                <th className="border px-4 py-2">Order Status</th>
                <th className="border px-4 py-2">Payment Status</th>
                <th className="border px-4 py-2">Payment Date</th>
                <th className="border px-4 py-2">Payment Method</th>
                <th className="border px-4 py-2">Order Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="border px-4 py-2">{order.orderId}</td>
                  <td className="border px-4 py-2">
                    {new Date(order.orderDate).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    ${order.totalPrices.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">Shipping</td>
                  <td className="border px-4 py-2">
                    {order.paymentStatus === 0 ? "Paid" : "Unpaid"}
                  </td>
                  <td className="border px-4 py-2">
                    {order.paymentDate
                      ? new Date(order.paymentDate).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {order.paymentMethod.name}
                  </td>
                  <td className="border px-4 py-2">
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item.orderItemId}>
                          {productNames[item.productId] || "Loading..."} -{" "}
                          {item.quantity} x ${item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderedViewPageComplete;
