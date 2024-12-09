import React, { useState, useEffect  } from 'react';
import NavbarAdmin from '../../../layout/NavbarAdmin'; // Use your Navbar component
import FooterAdmin from '../../../layout/FooterAdmin'; // Use your Footer component
import AdminSidebar from '../../admincomponent/AdminSider';
import AdminMainContent from '../../admincomponent/AdminMainContent';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState('home'); // Default section
  const navigate = useNavigate();

  const handleComponentChange = (component, path) => {
    setActiveComponent(component); // Update active component dynamically
    navigate(path); // Update the URL
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <header className="sticky top-0 z-10">
      <NavbarAdmin />
    </header>
    <div className="flex flex-grow mt-6">
      <AdminSidebar handleComponentChange={handleComponentChange} />
      <AdminMainContent activeComponent={activeComponent} />
    </div>
    <footer className="mt-4">
      <FooterAdmin />
    </footer>
  </div>
  );
};

export default AdminPage;
