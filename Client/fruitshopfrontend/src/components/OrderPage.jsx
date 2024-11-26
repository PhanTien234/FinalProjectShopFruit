import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavbarOrder from '../components/ordercomponent/NavbarOrder';
import AddressComponent from '../components/ordercomponent/AddressOrder';
import OrderItemInfo from '../components/ordercomponent/OrderItemInfo';
import DiscountComponent from '../components/ordercomponent/DiscountComponent';
import PaymentMethodAndTotalPayment from './ordercomponent/PaymentMethodAndTotalPayment';
import FruitShopLogo from '../assets/images/Fruitshoplogo.png';
import { QuantityContext } from '../components/ordercomponent/QuantityContext';
import Footer from '../layout/Footer';
import axios from 'axios';

const OrderPage = () => {
  const { productId } = useParams(); // Get productId from the route
  const [orderItem, setOrderItem] = useState(null); // State for storing product data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const { quantity, setQuantity } = useContext(QuantityContext);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/Product/${productId}`);
        const product = response.data;
        setOrderItem({
          name: product.name || 'No Name Available',
          description: product.description || 'No Description Available',
          type: product.category.name || 'Unknown Category', // Assuming API has a category field
          price: `${product.price || 0} USD`,
          quantity, // From QuantityContext
          total: `${product.price || 0} USD`,
          image: product.cloudImages?.[0]?.imagePath || 'https://via.placeholder.com/150', // Default placeholder image
          shipping: "Fast - Guaranteed delivery from May 12 - May 13", // Placeholder
          shippingCost: "38.000 USD", // Placeholder
          grandTotal: `${parseInt(product.price || 0) + 38000} USD`, // Example calculation
        });
      } catch (err) {
        console.error('Error fetching product details:', err.response || err.message);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, quantity]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleLogoClick = () => {
    setQuantity(1); // Reset quantity to default when navigating to the homepage
  };

  return (
    <>
      <NavbarOrder />
      <div className="bg-white shadow py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center" onClick={handleLogoClick}>
              <div className="flex-shrink-0">
                <img className="h-16 w-auto" src={FruitShopLogo} alt="FruitShop Logo" />
              </div>
              <div className="ml-3 flex items-center">
                <span className="text-red-600 font-bold text-3xl">|</span>
                <span className="text-red-600 font-bold text-3xl ml-3">CHECKOUT</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 space-y-4">
        <AddressComponent />
        {orderItem && <OrderItemInfo item={orderItem} />}
        <DiscountComponent />
        <PaymentMethodAndTotalPayment />
      </div>
      <div className="border-t mt-8">
        <Footer />
      </div>
    </>
  );
};

export default OrderPage;
