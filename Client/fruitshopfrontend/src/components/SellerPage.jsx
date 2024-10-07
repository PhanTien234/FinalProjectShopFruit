// SellerPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterSeller from '../layout/FooterSeller';
import NavbarSeller from '../layout/NavbarSeller';
import SellerSidebar from './SellerSidebar';
import SellerMainContent from './SellerMainContent';

const SellerPage = () => {
  const [activeComponent, setActiveComponent] = useState('home');
  const navigate = useNavigate();

  const handleComponentChange = (component, path) => {
    navigate(path); // Change the URL
    setActiveComponent(component); // Update the active component
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarSeller />
      </header>

      <div className="flex flex-grow mt-8">
        {/* Sidebar */}
        <SellerSidebar handleComponentChange={handleComponentChange} />

        {/* Main content */}
        <SellerMainContent activeComponent={activeComponent} />
      </div>

      <footer className="mt-8">
        <FooterSeller />
      </footer>
    </div>
  );
};

export default SellerPage;
