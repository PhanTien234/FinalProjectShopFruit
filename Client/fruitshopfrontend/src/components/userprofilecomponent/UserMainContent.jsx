import React from 'react';
import ProfilePage from "../../components/Profile";
// import PendingOrders from '../components/PendingOrders';
// import CompletedOrders from '../components/CompletedOrders';
// import Notifications from '../components/Notifications';
// import Vouchers from '../components/Vouchers';
// import Rewards from '../components/Rewards';

const UserMainContent = ({ activeComponent }) => {
  return (
    <main className="flex-grow p-8 bg-white shadow-lg rounded-lg">
      {/* Dynamically render components based on the activeComponent prop */}
      {activeComponent === "profile-overview" && <ProfilePage />}
      {/* {activeComponent === 'pending-orders' && <PendingOrders />}
      {activeComponent === 'completed-orders' && <CompletedOrders />}
      {activeComponent === 'notifications' && <Notifications />}
      {activeComponent === 'vouchers' && <Vouchers />}
      {activeComponent === 'rewards' && <Rewards />} */}
    </main>
  );
};

export default UserMainContent;
