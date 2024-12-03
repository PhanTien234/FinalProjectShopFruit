import React, { useState, useEffect  } from 'react';
import Navbar from '../../../layout/Navbar'; // Use your Navbar component
import Footer from '../../../layout/Footer'; // Use your Footer component
import UserSidebar from '../../userprofilecomponent/UserSidebar';
import UserMainContent from '../../userprofilecomponent/UserMainContent';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [activeComponent, setActiveComponent] = useState('overview'); // Default section
  const navigate = useNavigate();

  const handleComponentChange = (component, path) => {
    setActiveComponent(component); // Update active component dynamically
    navigate(path); // Update the URL
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-grow mt-8">
        {/* Sidebar */}
        <UserSidebar handleComponentChange={handleComponentChange} />

        {/* Dynamic Main Content */}
        <UserMainContent activeComponent={activeComponent} />
      </div>

      {/* Footer */}
      <footer className="mt-8">
        <Footer />
      </footer>
    </div>
  );
};

export default UserProfilePage;
