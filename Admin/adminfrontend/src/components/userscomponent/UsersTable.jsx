import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaKey, FaLock } from "react-icons/fa";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:5002/api/Users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

  const convertHashToPassword = (hash) => "••••••••"; // Placeholder for security

  const getRoleName = (role) => {
    switch (role) {
      case 0:
        return "Buyer";
      case 1:
        return "Seller";
      case 2:
        return "Admin";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Users List</h1>
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
        <table className="w-full border border-gray-300 shadow-md text-sm">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              {[
                "No.",
                "Full Name",
                "Email",
                "Date of Birth",
                "Gender",
                "Phone Number",
                "Created At",
                "Last Login",
                "Role",
                "Password",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.userId}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {`${user.lastName || ""} ${user.firstName || ""}`.trim() || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.email || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {formatDate(user.doB)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.gender || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.phoneNumber || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {formatDate(user.createdAt)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {formatDate(user.lastLoginAt)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {getRoleName(user.role)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {convertHashToPassword(user.passwordHash)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-y-1">
                  <button
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                    title="Change Password"
                  >
                    <FaKey />
                  </button>
                  <button
                    className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    title="Lock Account"
                  >
                    <FaLock />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
