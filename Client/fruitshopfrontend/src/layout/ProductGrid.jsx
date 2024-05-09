import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null); // Define hoveredProductId state variable
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/Product/getallproducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
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

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.productId} className="bg-white shadow overflow-hidden rounded-lg" 
               // Add onMouseEnter and onMouseLeave event handlers to change border color on hover
               onMouseEnter={() => setHoveredProductId(product.productId)}
               onMouseLeave={() => setHoveredProductId(null)}
               // Add onClick event handler to redirect to ProductDetails component
               onClick={() => handleProductClick(product.productId)}
               // Add style to change border color based on hover
               style={{ boxShadow: hoveredProductId === product.productId ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : '0px 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>
            <img src={product.cloudImage.imagePath} alt={product.name} className="w-full h-48 object-cover" />
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
    </div>
  );
};

export default ProductGrid;
