import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ searchQuery, currentPage, setCurrentPage= []   }) => {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null); // Define hoveredProductId state variable
  const navigate = useNavigate(); // Initialize useNavigate
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:5001/api/Product/getallproducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const formatCurrency = (price) => {
    if (typeof price === 'number') {
      return `${price.toFixed(2)} USD`;
    } else {
      return 'Price not available';
    }
  };

  // Function to handle product click
  const handleProductClick = (productId) => {
    // Redirect to ProductDetails component with the productId as a URL parameter
    navigate(`/product/${productId}`);
  };

  // Log searchQuery to verify it's being received correctly
  console.log('Search Query:', searchQuery);

  const filteredProducts = searchQuery && searchQuery.trim() !== ""
    ? products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

    const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageDisplay = 5;

    if (totalPages <= maxPageDisplay) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pageNumbers;
  };


  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <div key={product.productId} className="bg-white shadow overflow-hidden rounded-lg"
            onMouseEnter={() => setHoveredProductId(product.productId)}
            onMouseLeave={() => setHoveredProductId(null)}
            onClick={() => handleProductClick(product.productId)}
            style={{ boxShadow: hoveredProductId === product.productId ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : '0px 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>
            <img
                  src={
                    product.cloudImages.length > 0
                      ? product.cloudImages[0].imagePath
                      : product.cloudVideos.length > 0
                      ? product.cloudVideos[0].videoPath
                      : "default-placeholder-image-url"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">{product.description}</p>
              {product.discountPrice > 0 && (
                <div className="flex items-baseline mb-2">
                  <span className="text-sm line-through text-gray-500">{formatCurrency(product.discountPrice)}</span>
                  <span className="ml-2 text-lg font-bold">{formatCurrency(product.price)}</span>
                </div>
              )}
              {product.discountPrice === 0 && <p className="text-lg font-bold mb-2">{formatCurrency(product.price)}</p>}
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-sm">
                  {Array.from({ length: product.overallRating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>
                <span className="ml-2 text-gray-600 text-sm">{product.reviewCount} reviews</span>
              </div>
              <p className={product.isCertificate ? "text-green-600 mb-4 font-semibold" : "text-red-600 mb-4 font-semibold"}>
                {product.isCertificate ? 'Certified' : 'No Certificate'}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
        <button
          className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
