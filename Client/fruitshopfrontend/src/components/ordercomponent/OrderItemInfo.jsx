import React from 'react';

const OrderItemInfo = ({ item }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Product Image and Details */}
        <div className="col-span-1 flex items-center space-x-4">
          <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm">{item.description}</p>
            <p className="text-sm text-gray-600">Loại: {item.type}</p>
          </div>
        </div>

        {/* Price, Quantity, and Total */}
        <div className="col-span-2 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Đơn giá</p>
            <p className="text-lg font-semibold">{item.price}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Số lượng</p>
            <p className="text-lg font-semibold">{item.quantity}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Thành tiền</p>
            <p className="text-lg font-semibold">{item.total}</p>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div>
          <span className="font-medium">Đơn vị vận chuyển:</span>
          <span className="ml-2 text-sm">{item.shipping}</span>
        </div>
        <div>
          <span className="font-medium">Phí vận chuyển:</span>
          <span className="ml-2 text-sm">{item.shippingCost}</span>
        </div>
      </div>

      {/* Total Cost */}
      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">Tổng số tiền (sản phẩm + ship): {item.grandTotal}</p>
      </div>
    </div>
  );
};

export default OrderItemInfo;
