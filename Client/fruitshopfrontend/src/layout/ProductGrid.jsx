import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

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
    // Implement currency formatting logic here
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.productId} className="bg-white shadow overflow-hidden rounded-lg">
            <img src={product.cloudImage.imagePath} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">{product.description}</p>
              {product.discountPrice && (
                <div className="flex items-baseline mb-2">
                  <span className="text-sm line-through text-gray-500">{formatCurrency(product.originalPrice)}</span>
                  <span className="ml-2 text-lg font-bold">{formatCurrency(product.discountPrice)}</span>
                </div>
              )}
              {!product.discountPrice && <p className="text-lg font-bold mb-2">{formatCurrency(product.price)}</p>}
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
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
