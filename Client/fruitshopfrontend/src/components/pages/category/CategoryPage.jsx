import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../layout/Navbar";
import Banner from "../../../layout/Banner";
import Footer from "../../../layout/Footer";
import ProductGrid from "../../../layout/ProductGridCategory";

const CategoryPage = () => {
  const { categoryId } = useParams(); // categoryId is a string
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // For pagination in ProductGrid

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get("https://localhost:5001/api/Product/getallproducts");
        const productsByCategory = response.data.filter(
          (product) => product.category.id === categoryId // Compare as string
        );
        if (productsByCategory.length > 0) {
          setCategory(productsByCategory[0].category);
        }
        setFilteredProducts(productsByCategory);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <div>
      <Navbar />
      <Banner />
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
        <ProductGrid
          searchQuery={""} // No search in CategoryPage
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          initialProducts={filteredProducts} // Pass filtered products
        />
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
