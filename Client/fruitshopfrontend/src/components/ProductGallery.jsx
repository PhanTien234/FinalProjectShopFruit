import React, { useState } from 'react';

const images = [
  // Array of image URLs; you will replace these with the actual image paths
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  // ...
];

const ProductGallery = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center md:flex-row">
      <div className="w-full md:w-2/3">
        <img
          src={selectedImage}
          alt="Main product"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="flex justify-center md:flex-col md:w-1/3 mt-4 md:mt-0">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product view ${index + 1}`}
            className={`w-20 h-20 object-contain cursor-pointer ${
              selectedImage === image ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
