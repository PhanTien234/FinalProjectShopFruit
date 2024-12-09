// SellerPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterSeller from '../../../layout/FooterSeller';
import NavbarSeller from '../../../layout/NavbarSeller';
import SellerSidebar from '../../SellerSidebar';
import SellerMainContent from '../../SellerMainContent';

const SellerPage = () => {
  const [activeComponent, setActiveComponent] = useState('home'); // Default section
  const navigate = useNavigate();

  const handleComponentChange = (component, path) => {
    setActiveComponent(component); // Update active component dynamically
    navigate(path); // Update the URL
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <header className="sticky top-0 z-10">
    <NavbarSeller />
    </header>
    <div className="flex flex-grow mt-6">
    <SellerSidebar handleComponentChange={handleComponentChange} />  
    <SellerMainContent activeComponent={activeComponent} />    
    </div>
    <footer className="mt-4">
      <FooterSeller />
    </footer>
  </div>
  );
};

export default SellerPage;
