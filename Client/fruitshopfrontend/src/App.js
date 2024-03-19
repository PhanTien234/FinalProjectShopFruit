// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import CreateProductForm from './components/CreateProductForm'; 
import Products from './components/Products';
import UpdateProductForm from './components/UpdateProductForm'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/update-product/:productId" element={<UpdateProductForm />} />
      </Routes>
    </Router>
  );
};

export default App;
