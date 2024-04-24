// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import CreateProductForm from './components/CreateProductForm'; 
import Products from './components/Products';
import UpdateProductForm from './components/UpdateProductForm'; 
import CreateCategoryForm from './components/CreateCategoryForm'; 
import Categories from './components/Categories'; 
import UpdateCategoryForm from './components/UpdateCategoryForm'; 
import ProfilePage from './components/Profile';
import SellerRegistrationPage from './components/SellerRegistrationPage';
import { AuthProvider } from './components/AuthContext';


const App = () => {
  return (
    <AuthProvider> {/* Wrap Routes with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create-product" element={<CreateProductForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/update-product/:productId" element={<UpdateProductForm />} />
          <Route path="/create-category" element={<CreateCategoryForm />} /> 
          <Route path="/categories" element={<Categories />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/update-category/:categoryId" element={<UpdateCategoryForm />} />
          <Route path="/sellerRegistration" element={<SellerRegistrationPage/>}   />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
