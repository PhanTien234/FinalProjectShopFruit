import React from 'react';
import { HomeIcon } from '@heroicons/react/solid'; // Ensure you have @heroicons/react package installed

const categories = [
  { name: 'Trang chủ', href: '#home', icon: <HomeIcon className="h-5 w-5" /> },
  { name: 'Tất cả sản phẩm', href: '#all-products' },
  // ... other categories
];

const CategoryMenu = () => (
  <div className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto py-3 px-5">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.href}
            className="text-gray-700 hover:text-orange-500 transition-colors duration-300 flex items-center space-x-1"
          >
            {category.icon && category.icon}
            <span>{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const Banner = () => (
  <div className="relative">
    {/* Assuming you're using a full-width image for the banner */}
    <img
      src="/path-to-your-banner-image.jpg"
      alt="Banner"
      className="w-full h-auto object-cover"
    />
    <div className="absolute inset-0 bg-gray-800 bg-opacity-25 flex justify-center items-center">
      <div className="text-white text-xl font-bold p-5">
        {/* Any text you want to overlay on the banner */}
        Tinh túy từng lóc phúc
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <div>
      <CategoryMenu />
      <Banner />
      {/* Other components */}
    </div>
  );
};

export default App;
