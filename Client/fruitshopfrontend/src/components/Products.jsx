import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { configureAlerts, ToastContainer } from "../alert/alert";
import { useAuth } from "../components/AuthContext";

const Products = () => {
  const { accessToken } = useAuth();
  const [products, setProducts] = useState([]);
  const { success, alertError } = configureAlerts();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/Product/getallproductsbyuser",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [accessToken]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://localhost:5001/api/Product/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Update state after deletion
      setProducts(products.filter((product) => product.productId !== productId));
      success("Delete Product Successfully!");
    } catch (error) {
      alertError("Error while deleting product");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-600">All Products</h1>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] bg-white rounded-lg shadow-md">
        <table className="table-auto w-full text-sm text-gray-600">
          <thead>
            <tr>
              {[
                "No.",
                "Image",
                "Name",
                "Description",
                "Price",
                "Discount Price",
                "Rating",
                "Supplier",
                "Available Qty",
                "Certificate",
                "Actions",
              ].map((header, index) => (
                <th key={index} className="px-4 py-2 border-b-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.productId} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <img
                    src={
                      product.cloudImages.length > 0
                        ? product.cloudImages[0].imagePath
                        : "default-placeholder-image-url"
                    }
                    alt={product.name}
                    className="w-24 h-24 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">${product.discountPrice}</td>
                <td className="border px-4 py-2">{product.overallRating}</td>
                <td className="border px-4 py-2">{product.supplier.name}</td>
                <td className="border px-4 py-2">{product.availableQuantity}</td>
                <td className="border px-4 py-2">
                  {product.isCertificate ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2 flex items-center space-x-2">
                  <Link
                    to={`/update-product/${product.productId}`}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.productId)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrash />
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

export default Products;
