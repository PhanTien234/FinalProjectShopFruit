// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import CreateProductForm from './components/CreateProductForm'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create-product" element={<CreateProductForm />} />
      </Routes>
    </Router>
  );
};

export default App;
