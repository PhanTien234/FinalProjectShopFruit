import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the productId from the URL
import ProductInfo from './ProductInfo';
import ProductGallery from './ProductGallery';
import ColorOptions from './ColorOptions';
import ActionButtons from './ActionButtons';
import SocialShare from './SocialShare';
import SellerInfo from './SellerProductInfo';
import ProductDescription from './ProductDescription';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const ProductDetailPage = () => {
  const { productId } = useParams(); // Get the productId from the URL


  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
      <div className="md:flex md:space-x-6">
          {/* Left Section: Product Gallery */}
          <div className="md:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-lg">
              <ProductGallery productId={productId} />
            </div>
            <SocialShare />
          </div>
          {/* Right Section: Product Info */}
          <div className="md:w-1/2 space-y-4">
            <ProductInfo productId={productId} />
            <ColorOptions />
            <ActionButtons productId={productId} />
          </div>
        </div>
        <div>
            <SellerInfo productId={productId}/>
        </div>
        <div>
            <ProductDescription productId={productId}/>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProductDetailPage;
