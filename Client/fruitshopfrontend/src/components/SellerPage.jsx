import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import NavbarSeller from '../layout/NavbarSeller';
// Import your subpage components here
// import Orders from './Orders';
// import Products from './Products';
// ... other imports

const SidebarLink = ({ to, children }) => (
  <Link to={to} className="block px-4 py-2 hover:bg-gray-200">
    {children}
  </Link>
);

const SellerPage = () => {
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isMarketingDropdownOpen, setMarketingDropdownOpen] = useState(false);
  const [isFinancialDropdownOpen, setFinancialDropdownOpen] = useState(false);
  const [isDataDropdownOpen, setDataDropdownOpen] = useState(false);
  const [isShopInfoDropdownOpen, setShopInfoDropdownOpen] = useState(false);


  return (
  <div className="flex flex-col min-h-screen">
    <NavbarSeller />
    <div className="flex flex-grow">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-md">
          <div className="p-4">
            <p className="font-bold text-lg mb-4">Quản lý Shop</p>
            <div>
              <button onClick={() => setOrdersDropdownOpen(!isOrdersDropdownOpen)} className="w-full text-left">
                Quản lý đơn hàng
              </button>
              {isOrdersDropdownOpen && (
                <div>
                  <SidebarLink to="/batch-shipments">Giao Hàng Loạt</SidebarLink>
                  <SidebarLink to="/cancellations">Đơn Hủy</SidebarLink>
                  <SidebarLink to="/returns-refunds">Trả hàng/Hoàn tiền</SidebarLink>
                  <SidebarLink to="/shipping-settings">Cài đặt vận chuyển</SidebarLink>
                </div>
              )}
            </div>
            <div>
              <button onClick={() => setProductsDropdownOpen(!isProductsDropdownOpen)} className="w-full text-left">
                Quản lý sản phẩm
              </button>
              {isProductsDropdownOpen && (
                <div>
                  <SidebarLink to="/all-products">Tất cả sản phẩm</SidebarLink>
                  <SidebarLink to="/add-product">Thêm sản phẩm</SidebarLink>
                </div>
              )}
            </div>
            <div>
              <button onClick={() => setMarketingDropdownOpen(!isMarketingDropdownOpen)} className="w-full text-left">
              Kênh Marketing
              </button>
              {isMarketingDropdownOpen && (
                <div>
                  <SidebarLink to="/marketing">Manage all Banners</SidebarLink>
                </div>
              )}
            </div>
            <div>
              <button onClick={() => setFinancialDropdownOpen(!isFinancialDropdownOpen)} className="w-full text-left">
              Tài chính
              </button>
              {isFinancialDropdownOpen && (
                <div>
                  <SidebarLink to="/totalMoneyPaid">Tổng doanh thu của Shop</SidebarLink>
                </div>
              )}
            </div>
            <div>
              <button onClick={() => setDataDropdownOpen(!isDataDropdownOpen)} className="w-full text-left">
              Dữ liệu
              </button>
              {isDataDropdownOpen && (
                <div>
                  <SidebarLink to="/statisticsell">Phân tích bán hàng</SidebarLink>
                  <SidebarLink to="/effectiveSell">Hiệu quả bán hàng</SidebarLink>
                </div>
              )}
            </div>
            <div>
              <button onClick={() => setShopInfoDropdownOpen(!isShopInfoDropdownOpen)} className="w-full text-left">
              Quản lý Shop
              </button>
              {isShopInfoDropdownOpen && (
                <div>
                  <SidebarLink to="/shopinformation">Information of Shop</SidebarLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      {/* Main content */}
      <main className="flex-grow p-8">
        <Routes>
          {/* Replace divs with your actual components and pass props as needed */}
          <Route path="/batch-shipments" element={<div>Batch Shipments Content</div>} />
          <Route path="/cancellations" element={<div>Cancellations Content</div>} />
          <Route path="/returns-refunds" element={<div>Returns and Refunds Content</div>} />
          {/* ... other Route elements */}
          {/* Default Route */}
          <Route path="/" element={<div>Welcome to Seller Dashboard</div>} />
        </Routes>
      </main>
    </div>
      <Footer />
  </div>
  );
};

export default SellerPage;