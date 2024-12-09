import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">About Fruit Shop</h2>
          <p className="text-sm text-white mb-4">
           Fruit Shop is a high-quality premium fruit brand, offering a variety of products to meet every need...
            {/* Truncate the text or expand as needed */}
          </p>
          {/* Include any images/logos if needed */}
          <p className="text-sm text-white">Copyright © Morning Fruit LLC</p>
          {/* Other details */}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">Branches</h2>
          {/* List of branches */}
          <div className="text-sm text-white">
            <p>1st Floor, 43 Nguyen Thai Hoc...</p>
            {/* Additional addresses */}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">Customer Support</h2>
          {/* List of customer support links */}
          <ul className="text-sm text-white">
            <li>Search</li>
            <li>Brand Story</li>
            {/* ... other items */}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">Customer Care</h2>
          <p className="text-sm text-white mb-4">0865660775</p>
          <p className="text-sm text-white mb-4">hello@fruitshop.com</p>
          
          <h2 className="text-lg font-semibold mb-4 text-white">Follow Us</h2>
          <div className="flex">
            <FaFacebookF className="h-6 w-6 fill-current text-white mr-4" />
            <FaInstagram className="h-6 w-6 fill-current text-white mr-4" />
            <FaYoutube className="h-6 w-6 fill-current text-white mr-4" />
            {/* Add other social icons as needed */}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center">
        <p className="text-sm text-white">Copyright © 2024 Fruit Shop - High-Quality Fruits</p>
      </div>
    </footer>
  );
};

export default Footer;