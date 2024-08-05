// Home.jsx
import React, {useState} from 'react';
import Navbar from '../layout/Navbar';
import Banner from '../layout/Banner';
import ProductGrid from '../layout/ProductGrid';
import Footer from '../layout/Footer';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(' ')


  return (
    <div>
        <Navbar setSearchQuery= {setSearchQuery}/>
        < Banner />
        <ProductGrid searchQuery={searchQuery}/>
        <div>
        <Footer />
        </div>
    </div>
  );
};

export default Home;
