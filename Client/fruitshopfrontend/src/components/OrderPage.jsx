import React from 'react';
import NavbarOrder from '../components/ordercomponent/NavbarOrder';
import AddressComponent from '../components/ordercomponent/AddressOrder';
import OrderItemInfo from '../components/ordercomponent/OrderItemInfo';
import DiscountComponent from '../components/ordercomponent/DiscountComponent';
import PaymentMethod from '../components/ordercomponent/PaymentMethod';
import {SearchIcon, PlusIcon, MinusIcon, ShoppingCartIcon} from '@heroicons/react/outline';
import FruitShopLogo from '../assets/images/Fruitshoplogo.png';
import Footer from '../layout/Footer';

const OrderPage = () => {
  const orderItem = {
    name: "Dầu gội đầu Clear",
    description: "Dành bay gàu & nhờn ngứa, sáng khoái",
    type: "Hoa Anh Đào",
    price: "₫170.000",
    quantity: 1,
    total: "₫170.000",
    image: "/path/to/product/image.jpg", // Update with actual path
    shipping: "Nhanh - Đảm bảo nhận hàng từ 12 Tháng 5 - 13 Tháng 5",
    shippingCost: "₫38.000",
    grandTotal: "₫208.000"
  };

  return (
    <>
      <NavbarOrder />
     {/* Sub-navigation bar with search */}
      <div className="bg-white shadow py-5"> {/* Increased padding for overall height */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between"> {/* Removed h-40 */}
            {/* Brand Logo and Cart Indicator */}
            <div className="flex items-center">
              {/* Brand Logo */}
              <div className="flex-shrink-0">
                <img className="h-16 w-auto" src={FruitShopLogo} alt="FruitShop Logo" /> {/* Adjusted logo height */}
              </div>
              <div className="ml-3 flex items-center">
                <span className="text-red-600 font-bold text-3xl">|</span> {/* Single separator with increased size */}
                <span className="text-red-600 font-bold text-3xl ml-3">Thanh Toán</span> {/* Increased text size for "Giỏ hàng" */}
              </div>
            </div>
            
            {/* Icons and User Info - Hidden in CartPage */}
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 space-y-4">
        <AddressComponent/>
        <OrderItemInfo item={orderItem} />
        <DiscountComponent />
        <PaymentMethod />
      </div>
      <div className="border-t mt-8">
        <Footer />
      </div>
    </>
  );
};

export default OrderPage;
