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
            <p className="text-sm text-gray-600">Category: {item.type}</p>
          </div>
        </div>

        {/* Price, Quantity, and Total */}
        <div className="col-span-2 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Unit Price</p>
            <p className="text-lg font-semibold">{item.price} USD</p>
          </div>
          <div>
            <p className="text-sm font-medium">Quantity</p>
            <p className="text-lg font-semibold">{item.quantity} {item.unit}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Price</p>
            <p className="text-lg font-semibold">{item.total} USD</p>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div>
          <span className="font-medium">Shipping center:</span>
          <span className="ml-2 text-sm">{item.shipping}</span>
        </div>
        <div>
          <span className="font-medium">Shipping fee:</span>
          <span className="ml-2 text-sm">{(item.shippingCost).toFixed(2)} USD</span>
        </div>
      </div>

      {/* Total Cost */}
      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">Total Price (product + ship): {item.grandTotal} USD</p>
      </div>
    </div>
  );
};

export default OrderItemInfo;
