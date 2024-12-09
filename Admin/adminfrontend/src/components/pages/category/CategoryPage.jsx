import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../layout/Navbar";
import Footer from "../../../layout/Footer";
import ProductGrid from "../../../layout/ProductGridCategory";

const CategoryPage = () => {
  const { categoryId } = useParams(); // categoryId is a string
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // For pagination in ProductGrid

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categoryResponse = await axios.get(`https://localhost:5001/api/Category/${categoryId}`);
        setCategory(categoryResponse.data); // Set category details
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    const fetchCategoryProducts = async () => {
      try {
        const productsResponse = await axios.get("https://localhost:5001/api/Product/getallproducts");
        const productsByCategory = productsResponse.data.filter(
          (product) => product.category.id === categoryId // Compare as string
        );
        setFilteredProducts(productsByCategory);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategoryDetails();
    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-4">
        {category && (
          <div className="text-center my-8">
            <h2 className="text-3xl font-bold relative inline-block">
              <span className="before:block before:absolute before:-inset-1 before:border-t-2 before:border-gray-300">
                &nbsp;
              </span>
              <span className="relative z-10 text-gray-700">
                -------------{category.name}-------------
              </span>
            </h2>
          </div>
        )}
        {filteredProducts.length > 0 ? (
          <ProductGrid
            searchQuery={""} // No search in CategoryPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            initialProducts={filteredProducts} // Pass filtered products
          />
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>Not have any products for display</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
