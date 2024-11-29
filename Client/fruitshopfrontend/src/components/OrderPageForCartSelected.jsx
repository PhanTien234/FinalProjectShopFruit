import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import NavbarOrder from './ordercomponent/NavbarOrder';
import AddressComponent from './ordercomponent/AddressOrder';
import OrderItemInfo from './ordercomponent/OrderItemInfo';
import DiscountComponent from './ordercomponent/DiscountComponent';
import PaymentMethodAndTotalPayment from './ordercomponent/PaymentMethodAndTotalPayment';
import FruitShopLogo from '../assets/images/Fruitshoplogo.png';
import { QuantityContext } from './ordercomponent/QuantityContext';
import Footer from '../layout/Footer';
import axios from 'axios';
import { useAuth } from './AuthContext'; 

const OrderPageForCartSelected = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth(); 
  const { state } = useLocation(); // Retrieve state from navigate
  const { orderItems } = state || {}; // Get the selected items
  const [shippingAddressId, setShippingAddressId] = useState(null); // For AddressComponent
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Store cart items with product details
  const [loading, setLoading] = useState(true); // State for loading indicator
  const {setQuantity} = useContext(QuantityContext);
  const [error, setError] = useState(null); // State for error handling
  const [isModalVisible, setModalVisible] = useState(false);

  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!orderItems || orderItems.length === 0) {
          setError('No items selected for checkout.');
          setLoading(false);
          return;
        }

        const productDetails = await Promise.all(
          orderItems.map(async (item) => {
            const productResponse = await axios.get(
              `https://localhost:5001/api/Product/${item.productId}`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );
            const product = productResponse.data;

            const shippingCost = 5.99; // Example shipping cost
            const total = product.price * item.quantity;
            const grandTotal = total + shippingCost;

            return {
              ...item,
              name: product.name || 'No Name Available',
              description: product.description || 'No Description Available',
              type: product.category?.name || 'Unknown Category',
              price: product.price || 0,
              quantity: item.quantity,
              unit: product.unitFruit.name,
              total: total.toFixed(2),
              image: product.cloudImages?.[0]?.imagePath || 'https://via.placeholder.com/150',
              shipping: "Fast - Guaranteed delivery from May 12 - May 13",
              shippingCost: shippingCost,
              grandTotal: grandTotal.toFixed(2),
            };
          })
        );

        setCartItems(productDetails);
      } catch (err) {
        console.error('Error fetching product details:', err.response || err.message);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [orderItems, accessToken]);

  // Prepare and submit the order
  const handleOrderSubmit = async () => {
    try {
        const totalPrices = cartItems.reduce(
          (sum, item) => sum + parseFloat(item.total), 
          0
        ) + (cartItems[0]?.shippingCost || 0); // Add shipping cost (if applicable)
        const orderPayload = {
            shippingAddressId,
            totalPrices,
            paymentDate: paymentMethod?.name.includes('Pay after receiving') ? null : new Date().toISOString(),
            paymentMethodId: paymentMethod?.id,
            orderItems: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          };

      await axios.post('https://localhost:5001/api/Orders', orderPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token
        },
      });
      setModalVisible(true); // Show success modal
    } catch (err) {
      console.error('Error submitting order:', err.response?.data || err.message);
      alert('Failed to place the order. Please try again.');
    }
  };

    // Handle modal close
    const handleModalClose = () => {
      try {
        // Loop through each ordered item and call the RemoveFromCart API
        for (const item of cartItems) {
          axios.delete(`https://localhost:5001/api/Cart/remove/${item.productId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
            },
          });
        }
        // // Optionally, clear cart items from state to reflect changes in the UI
        // setCartItems([]);        
      } catch (err) {
        console.error('Error removing items from the cart:', err.response?.data || err.message);
        alert('Failed to remove items from the cart. Please try again.');
      } finally {
        setModalVisible(false);
        navigate('/'); // Navigate to the Home Page
      }
    };

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
      <AddressComponent setShippingAddressId={setShippingAddressId} />
      {cartItems.map((item) => (<OrderItemInfo key={item.productId} item={item} />))}                                                      
        <DiscountComponent />
        <PaymentMethodAndTotalPayment
        orderItems={cartItems}
        setPaymentMethod={setPaymentMethod}
        />
      </div>
      <div className="flex justify-center my-8">
        <button
          onClick={handleOrderSubmit}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Place Order1
        </button>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Order Successfully Placed!</h2>
            <p>Thank you for shopping with us.</p>
            <button
              onClick={handleModalClose}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="border-t mt-8">
        <Footer />
      </div>
    </>
  );
};

export default OrderPageForCartSelected;
