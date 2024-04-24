import React, { useState, useEffect } from 'react';
import bannerImage1 from '../assets/images/banner1.jpg';
import bannerImage2 from '../assets/images/backgroundimage.png';
import bannerImage3 from '../assets/images/banner2.jpg';

const images = [bannerImage1, bannerImage2, bannerImage3];

const Banner = () => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIdx((currentImageIdx + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [currentImageIdx]);

  const handleDotClick = (index) => {
    setCurrentImageIdx(index);
  };

  const goToPrev = () => {
    const index = currentImageIdx > 0 ? currentImageIdx - 1 : images.length - 1;
    setCurrentImageIdx(index);
  };

  const goToNext = () => {
    setCurrentImageIdx((currentImageIdx + 1) % images.length);
  };

  return (
    <div className="relative w-full flex justify-center items-center mt-4 overflow-hidden">
      <img
        className="w-full object-cover transition-opacity duration-500 ease-in-out"
        src={images[currentImageIdx]}
        alt="Banner"
        style={{ height: '500px' }}
      />
      <div className="absolute inset-0 flex justify-between items-center">
        <button
          className="bg-black bg-opacity-20 hover:bg-opacity-40 transition-opacity duration-300 p-4 text-white focus:outline-none"
          onClick={goToPrev}
        >
          &#x3c; {/* Left arrow */}
        </button>
        <button
          className="bg-black bg-opacity-20 hover:bg-opacity-40 transition-opacity duration-300 p-4 text-white focus:outline-none"
          onClick={goToNext}
        >
          &#x3e; {/* Right arrow */}
        </button>
      </div>
      <div className="absolute bottom-0 mb-4 flex justify-center w-full">
        {images.map((_, index) => (
          <span
            key={index}
            className={`inline-block h-3 w-3 mx-1 rounded-full cursor-pointer ${
              currentImageIdx === index ? 'bg-red-600' : 'bg-white'
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
