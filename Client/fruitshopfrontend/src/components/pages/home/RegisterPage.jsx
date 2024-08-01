import React from 'react';
import NavbarLogin from '../../../layout/NavbarLoginAndRegister';
import RegisterForm from '../../Register';
import Footer from '../../../layout/Footer';

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarLogin />
      </header>
      <main className="flex-grow mt-4"> {/* Added margin-top (mt-8) for spacing */}
        <RegisterForm />
      </main>
      <footer className="flex-grow mt-4">
        <Footer />
      </footer>
    </div>
  );
};

export default RegisterPage;