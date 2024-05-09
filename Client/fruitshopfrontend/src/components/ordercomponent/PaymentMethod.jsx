import React from 'react';

const PaymentMethod = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Phương thức thanh toán</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="font-medium">Thanh toán khi nhận hàng</p>
        <button className="text-red-500 border border-red-500 rounded px-4 py-2">THAY ĐỔI</button>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <p>Tổng tiền hàng</p>
          <p>₫170.000</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Phí v&acirc;n chuyển</p>
          <p>₫38.000</p>
        </div>
        <div className="flex justify-between mb-2 font-semibold">
          <p>Tổng thanh toán</p>
          <p className="text-lg text-red-600">₫208.000</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">Nhấn "<span className="font-semibold">Đặt hàng</span>" đồng nghĩa với việc bạn đồng ý tuân theo 
          <a href="https://shopee.vn" className="text-blue-500" target="_blank" rel="noopener noreferrer"> Điều khoản Shopee</a>
        </p>
        <button className="bg-red-600 text-white px-6 py-2 rounded">Đặt hàng</button>
      </div>
    </div>
  );
};

export default PaymentMethod;
