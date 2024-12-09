import React from 'react';
import ProfilePage from "../../components/Profile";
import PayPalAccountPage from "../userprofilecomponent/PayPalAccountPage"; 
import AdminDashBoardHomeImage from "../admincomponent/AdminDashBoardHomeImage";
import AllCategories from "../Categories";
import CreateCategory from "../CreateCategoryForm";
import AllUnits from "../UnitFruits";
import CreateUnit from "../CreateUnitFruit";
import AllSupplier from "../pages/supplier/Supplier";
import AllPaymentMethods from "../../components/paymentmethodcomponent/PaymentMethods";
import CreatePaymentMethod from "../../components/paymentmethodcomponent/CreatePaymentMethodForm";
import UserTable from "../../components/userscomponent/UsersTable";
import BankAccount from "../userprofilecomponent/PayPalAccountPage";

// import PendingOrders from '../components/PendingOrders';
// import CompletedOrders from '../components/CompletedOrders';
// import Notifications from '../components/Notifications';
// import Vouchers from '../components/Vouchers';
// import Rewards from '../components/Rewards';

const AdminMainContent = ({ activeComponent  }) => {
  return (
    <main className="flex-grow p-8 bg-gray-50 shadow-lg rounded-lg">
      {/* Dynamically render components based on the activeComponent prop */}
      {activeComponent === 'home' && <AdminDashBoardHomeImage />}
      {activeComponent === "profile-overview" && <ProfilePage />}
      {activeComponent === "bank-account" && <PayPalAccountPage />}
      {activeComponent === "categories" && <AllCategories />}
      {activeComponent === "create-category" && <CreateCategory />}
      {activeComponent === "units" && <AllUnits />}
      {activeComponent === "create-unit" && <CreateUnit />}
      {activeComponent === "suppliers" && <AllSupplier />}
      {activeComponent === "paymentmethods" && <AllPaymentMethods />}
      {activeComponent === "create-paymentmethod" && <CreatePaymentMethod />}
      {activeComponent === "userslist" && <UserTable />}
      {activeComponent === "bank-account" && <BankAccount />}

      

      
      
      
    </main>
  );
};

export default AdminMainContent;
