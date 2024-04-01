// Home.jsx
import React from 'react';
import Navbar from '../layout/Navbar';
import Banner from '../layout/Banner';
import ProductGrid from '../layout/ProductGrid';
import Footer from '../layout/Footer';

const Home = () => {
  return (
    <div>
        <Navbar />
        {/* <Banner /> */}
        <ProductGrid />
        <Footer />
    </div>
  );
};

export default Home;
