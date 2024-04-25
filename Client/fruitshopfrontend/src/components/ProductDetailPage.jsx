import React from 'react';
import ProductInfo from './ProductInfo';
import ProductGallery from './ProductGallery';
import ColorOptions from './ColorOptions';
import ActionButtons from './ActionButtons';
import SocialShare from './SocialShare';

const ProductDetailPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="md:flex md:space-x-6">
        <div className="md:w-1/2">
          <ProductGallery />
          <SocialShare />
        </div>
        <div className="md:w-1/2 space-y-4">
          <ProductInfo />
          <ColorOptions />
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
