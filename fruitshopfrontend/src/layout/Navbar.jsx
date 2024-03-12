import React from 'react';
import { SearchIcon, UserIcon, ShoppingCartIcon, MenuIcon } from '@heroicons/react/outline';

const Navbar = () => {
  return (
    <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
      <MenuIcon className="h-6 w-6" />
      
      <div className="flex-grow">
        <div className="text-center">
          <a href="/" className="text-2xl font-bold">morningFRUIT</a>
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-4 pr-10 py-2 rounded-full text-gray-700"
            />
            <SearchIcon className="h-5 w-5 absolute top-0 right-0 m-3" />
          </div>
        </div>
      </div>
      
      <div className="text-sm">
        Giảm 25,000 phí ship cho đơn hàng trên 600,000
      </div>

      <div>
        <div className="flex items-center">
          <UserIcon className="h-6 w-6 mx-2" />
          <div>Hotline: 0865660775</div>
          <ShoppingCartIcon className="h-6 w-6 mx-2" />
        </div>
        <div className="flex items-center mt-2">
          <div className="mx-2">Tài khoản</div>
          <div className="mx-2">Giỏ hàng</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
