// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RegisterPage from './components/pages/home/RegisterPage';
import LoginPage from './components/pages/home/LoginPage';
import CreateProductForm from './components/CreateProductForm';
import AddressList from './components/BAddressListUser';
import Products from './components/Products';
import UpdateProductForm from './components/UpdateProductForm';
import CreateCategoryForm from './components/CreateCategoryForm';
import Categories from './components/Categories';
import UpdateCategoryForm from './components/UpdateCategoryForm';
import SellerRegistrationPage from './components/SellerRegistrationPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import SellerPage from './components/pages/seller/SellerPage';
import OrderPageForProductDetail from './components/OrderPageForProductDetail';
import OrderPageForCartSelected from './components/OrderPageForCartSelected';
import Supplier from './components/pages/supplier/Supplier';
import CreateSupplier from './components/pages/supplier/CreateSupplierForm';
import UpdateSupplier from './components/pages/supplier/UpdateSupplierForm';
import ShopInfomation from './components/pages/seller/ShopInfomation';
import UnitFruits from './components/UnitFruits';
import CreateUnit from './components/CreateUnitFruit';
import UpdateUnit from './components/UpdateUnitFruit';
import { QuantityProvider } from './components/ordercomponent/QuantityContext';
import CategoryPage from './components/pages/category/CategoryPage';
import UserProfilePage from './components/pages/userprofiles/UserProfilePage';
import { AuthProvider } from './components/AuthContext';
//import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const App = () => {
  // const initialOptions = {
  //   clientId: "ASZpqn8e_pG6HMN_2B1_EfsCR7xEiEXad_aH86w5lYxjWiPnBO50j6_DQpQ_EN1FVzPpEYOWZxjKFuDo",
  //   currency: "USD",
  //   intent: "capture",
  //   };

  return (
    <AuthProvider> {/* Wrap Routes with AuthProvider */}
        <QuantityProvider> {/* Wrap the entire application with QuantityProvider */}
          {/* <PayPalScriptProvider options={initialOptions}>Wrap the entire application with PayPalScriptProvider */}
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/create-product" element={<CreateProductForm />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/update-product/:productId" element={<UpdateProductForm />} />
                  <Route path="/create-category" element={<CreateCategoryForm />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/unitfruits" element={<UnitFruits />} />
                  <Route path="/create-unit" element={<CreateUnit />} />
                  <Route path="/update-unit/:unitFruitId" element={<UpdateUnit />} />
                  <Route path="/addressListe" element={<AddressList />} />
                  <Route path="/userprofile/*" element={<UserProfilePage />} />
                  <Route path="/update-category/:categoryId" element={<UpdateCategoryForm />} />
                  <Route path="/sellerRegistration" element={<SellerRegistrationPage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/seller/*" element={<SellerPage />} />
                  <Route path="/shopinfomation" element={<ShopInfomation />} />
                  <Route path="/checkout/:productId" element={<OrderPageForProductDetail />} />
                  <Route path="/checkoutcart/:userId" element={<OrderPageForCartSelected />} />
                  <Route path="/suppliers" element={<Supplier />} />
                  <Route path="/create-supplier" element={<CreateSupplier />} />
                  <Route path="/update-supplier/:supplierId" element={<UpdateSupplier />} />
                </Routes>
              </Router>
            {/* </PayPalScriptProvider> */}
          </QuantityProvider>
      </AuthProvider>
  );
};

export default App;
