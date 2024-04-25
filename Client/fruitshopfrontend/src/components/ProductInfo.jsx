// ProductInfo.js
import React from 'react';

const ProductInfo = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Hộp đựng bàn chải đánh răng tiện dụng mang đi du lịch cầm tay</h1>
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold text-red-600">13.000đ - 15.600đ</span>
        <span className="text-sm line-through text-gray-500">14.477đ - 25.000đ</span>
      </div>
      <div className="flex items-center">
        <div className="text-sm bg-red-200 text-red-600 py-1 px-2 rounded-full">8% GIẢM</div>
        {/* ...additional discount info */}
      </div>
      {/* ...other product details */}
    </div>
  );
};

export default ProductInfo;
