import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Về Morning Fruit</h2>
          <p className="text-sm text-gray-600 mb-4">
            Morning Fruit là thương hiệu trái cây tự chọn chất lượng cao, với đa dạng sản phẩm phục vụ mọi nhu cầu...
            {/* Truncate the text or expand as needed */}
          </p>
          {/* Include any images/logos if needed */}
          <p className="text-sm text-gray-600">Bản quyền của Công ty TNHH Morning Fruit</p>
          {/* Other details */}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Chi nhánh</h2>
          {/* List of branches */}
          <div className="text-sm text-gray-600">
            <p>Lầu 1, 43 Nguyễn Thái Học...</p>
            {/* Additional addresses */}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h2>
          {/* List of customer support links */}
          <ul className="text-sm text-gray-600">
            <li>Tim kiếm</li>
            <li>Câu chuyện thương hiệu</li>
            {/* ... other items */}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Chăm sóc khách hàng</h2>
          <p className="text-sm text-gray-600 mb-4">0865660775</p>
          <p className="text-sm text-gray-600 mb-4">hello@morningfruit.com.vn</p>
          
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex">
            <FaFacebookF className="h-6 w-6 fill-current text-blue-600 mr-4" />
            <FaInstagram className="h-6 w-6 fill-current text-pink-600 mr-4" />
            <FaYoutube className="h-6 w-6 fill-current text-red-600 mr-4" />
            {/* Add other social icons as needed */}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center">
        <p className="text-sm text-gray-600">Copyright © 2024 Morning Fruit - Trái Cây Chất Lượng Cao</p>
      </div>
    </footer>
  );
};

export default Footer;
