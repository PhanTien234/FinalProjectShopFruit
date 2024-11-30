// Home.jsx
import React, {useState} from 'react';
import Navbar from '../layout/Navbar';
import Banner from '../layout/Banner';
import ProductGrid from '../layout/ProductGridHome';
import Footer from '../layout/Footer';
import AllCategories from '../layout/AllCategories';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(' ')
  const [currentPage, setCurrentPage] = useState(1);


  return (
    <div>
        <Navbar setSearchQuery= {setSearchQuery}/>
        < Banner />
        <AllCategories />
        <ProductGrid searchQuery={searchQuery} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <div>
        <Footer />
        </div>
    </div>
  );
};

export default Home;
