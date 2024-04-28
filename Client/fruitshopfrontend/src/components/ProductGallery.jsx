import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductGallery = ({ productId }) => {
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        // Fetch product details to get the image path
        const response = await axios.get(`https://localhost:5001/api/Product/${productId}`);
        const productData = response.data;

        // Assuming productData.cloudImage is the image path
        if (productData.cloudImage && productData.cloudImage.imagePath) {
          setSelectedImage(productData.cloudImage.imagePath); // Set the image path
        }
      } catch (error) {
        console.error('Error fetching product image:', error);
      }
    };

    fetchProductImage();
  }, [productId]);

  return (
    <div className="flex flex-col items-center md:flex-row">  
      <div className="w-full md:w-2/3">
        <img
          src={selectedImage}
          alt="Main product"
          className="w-full h-auto object-contain"
        />
      </div>
      {/* Assuming there's no need for a thumbnail gallery if there's only one image */}
    </div>
  );
};

export default ProductGallery;
