import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDescription = ({ productId }) => {
  const [supplierInfo, setSupplierInfo] = useState(null);
  const [productDescription, setProductDescription] = useState('');

  useEffect(() => {
    const fetchProductAndSupplierInfo = async () => {
      try {
        // Fetch product details
        const productResponse = await axios.get(`https://localhost:5001/api/Product/${productId}`);
        const productData = productResponse.data;

        // Fetch supplier details
        const supplierResponse = await axios.get(`https://localhost:5001/api/Supplier/${productData.supplierId}`);
        const supplierData = supplierResponse.data;

        // Set state with fetched data
        setSupplierInfo({
          name: supplierData.name,
          location: supplierData.location,
          description: supplierData.description,
          certificateUrl: supplierData.certificateProductUrl // Assuming this property is the URL of the certificate image
        });

        setProductDescription(productData.description);
      } catch (error) {
        console.error('Error fetching product and supplier details:', error);
      }
    };

    fetchProductAndSupplierInfo();
  }, [productId]);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold">Chi tiết sản phẩm</h3>
      {supplierInfo && (
        <>
          <p>Tên nhà cung cấp: {supplierInfo.name}</p>
          <p>Địa chỉ: {supplierInfo.location}</p>
          <p>Mô tả nhà cung cấp: {supplierInfo.description}</p>
          <img src={supplierInfo.certificateUrl} alt="Certificate" /> {/* Assuming this is an image URL */}
        </>
      )}
      <h3 className="text-lg font-bold">Mô tả sản phẩm</h3>
      <p>{productDescription}</p>
    </div>
  );
};

export default ProductDescription;
