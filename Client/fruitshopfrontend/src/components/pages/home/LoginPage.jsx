import React from 'react';
import NavbarLogin from '../../../layout/NavbarLoginAndRegister';
import LoginForm from '../../Login';
import Footer from '../../../layout/Footer';


const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarLogin />
      </header>
      <main className="flex-grow mt-4"> {/* Added margin-top (mt-8) for spacing */}
        <LoginForm />
      </main>
      <footer className="flex-grow mt-4">
        <Footer />
      </footer>
    </div>
  );
};

export default LoginPage;