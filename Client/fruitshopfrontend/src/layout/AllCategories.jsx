import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://localhost:5001/api/Category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-3 hover:shadow-lg transition duration-200 cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <img
              src={category.cloudImage.imagePath}
              alt={category.name}
              className="w-20 h-20 object-cover rounded-full"
            />
            <p className="text-sm text-center mt-2 font-medium">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
