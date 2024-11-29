import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import NavbarCart from '../layout/NavbarCart';
import Footer from '../layout/Footer';
import {SearchIcon, PlusIcon, MinusIcon, ShoppingCartIcon} from '@heroicons/react/outline';
import FruitShopLogo from '../assets/images/Fruitshoplogo.png';
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { accessToken } = useAuth(); // Access the access token from AuthContext
  const [userId, setUserId] = useState(null); // Store userId
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/Cart', {
          headers: {
            Authorization: `Bearer ${accessToken}` // Send the access token in the request headers
          }
        });
        setCartItems(response.data.cart.items);
        setUserId(response.data.cart.userId);
        // Initialize all items as selected
      const initialSelectedItems = {};
      response.data.cart.items.forEach(item => {
        initialSelectedItems[item.productId] = true;
      });
      setSelectedItems(initialSelectedItems);
      } catch (error) {
        console.error('Error fetching cart items:', error.response || error.message);
      }
    };

    fetchCartItems();
  }, [accessToken]); // Include accessToken in the dependency array

  const handleCheckout = () => {
    // Filter selected items
    const selectedOrderItems = cartItems.filter((item) => selectedItems[item.productId]);

    if (selectedOrderItems.length === 0) {
      alert('Please select at least one item to order.');
      return;
    }

    if (!userId) {
      alert('Unable to fetch user details. Please try again.');
      return;
    }

    // Navigate to OrderPage with selected items
    navigate(`/checkoutcart/${userId}`, { state: { orderItems: selectedOrderItems } });
  };
  
  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`https://localhost:5001/api/Cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}` // Send the access token in the request headers
        }
      });
      setCartItems(cartItems.filter(item => item.productId !== productId));
      // Update selected items
    const updatedSelectedItems = { ...selectedItems };
    delete updatedSelectedItems[productId];
    setSelectedItems(updatedSelectedItems);
    } catch (error) {
      console.error('Error removing item from cart:', error.response || error.message);
    }
  };

  const handleQuantityChange = async (productId, delta) => {
    setCartItems(currentItems =>
      currentItems.map(item => {
        if (item.productId === productId) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(newQuantity, 1) }; // Ensure quantity is at least 1
        }
        return item;
      })
    );
  
    const updatedItem = cartItems.find(item => item.productId === productId);
    const newQuantity = updatedItem.quantity + delta;
  
    // Ensure quantity is at least 1
    if (newQuantity < 1) return;
  
    try {
      // Call the updateCartItem API
      await axios.put(
        'https://localhost:5001/api/Cart/updateCartItem',
        {
          productId: productId,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send the access token in the request headers
          },
        }
      );
  
      console.log('Cart item updated successfully!');
    } catch (error) {
      console.error('Error updating cart item:', error.response || error.message);
    }
  };

  const handleSelectItem = (productId) => {
    setSelectedItems(currentSelectedItems => ({
      ...currentSelectedItems,
      [productId]: !currentSelectedItems[productId]
    }));
  };

  const getTotalPrice = () => {
    return cartItems
      .filter(item => selectedItems[item.productId])
      .reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const selectAllItems = (isSelected) => {
    const newSelectedItems = {};
    cartItems.forEach(item => {
      newSelectedItems[item.productId] = isSelected;
    });
    setSelectedItems(newSelectedItems);
  };

  const isSelectedAll = Object.keys(selectedItems).length === cartItems.length &&
                        Object.values(selectedItems).every(Boolean);

  return (
    <>
      <NavbarCart />
        {/* Sub-navigation bar with search */}
      <div className="bg-white shadow py-5"> {/* Increased padding for overall height */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between"> {/* Removed h-40 */}
            {/* Brand Logo and Cart Indicator */}
            <div className="flex items-center">
              {/* Brand Logo */}
              <Link to="/" className="flex-shrink-0">
                <img className="h-16 w-auto" src={FruitShopLogo} alt="FruitShop Logo" /> {/* Adjusted logo height */}
              </Link>
              <div className="ml-3 flex items-center">
                <span className="text-red-600 font-bold text-3xl">|</span> {/* Single separator with increased size */}
                <span className="text-red-600 font-bold text-3xl ml-3">Shopping Cart</span> {/* Increased text size for "Giỏ hàng" */}
              </div>
            </div>
            {/* Search input */}
            <div className="flex justify-center flex-grow lg:max-w-2xl"> {/* Made search bar grow to use available space */}
              <label htmlFor="search-cart" className="sr-only">Search</label>
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon className="h-8 w-8 text-red-600" aria-hidden="true" /> {/* Icon size is appropriate */}
                </span>
                <input 
                  id="search-cart" 
                  name="search-cart"
                  className="block w-full py-2 text-xl text-red-600 placeholder-red-600 bg-transparent border-b-4 border-red-600 rounded-md pl-12 focus:outline-none focus:border-red-700" 
                  placeholder="Search Product..." 
                  autoComplete="off" 
                /> {/* Extended placeholder to make it more visible */}
              </div>
            </div>
            {/* Icons and User Info - Hidden in CartPage */}
          </div>
        </div>
      </div>
      {/* Add your code here*/}
      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                      type="checkbox"
                      checked={isSelectedAll}
                      onChange={(e) => selectAllItems(e.target.checked)}
                      className="mr-2 leading-tight"
                    />
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PricePerUnit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map(item => (
                  <tr key={item.productId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <input
                        type="checkbox"
                        checked={selectedItems[item.productId]}
                        onChange={() => handleSelectItem(item.productId)}
                        className="mr-2 leading-tight"
                      />
                      <div className="flex items-center">
                        <img src={item.imageUrl} alt={item.name} className="h-10 w-10 rounded-full" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.price} USD</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button onClick={() => handleQuantityChange(item.productId, -1)} className="text-indigo-600 hover:text-indigo-900">
                          <MinusIcon className="h-5 w-5" />
                        </button>
                        <div className="mx-2 text-sm text-gray-900">{item.quantity}KG</div>
                        <button onClick={() => handleQuantityChange(item.productId, 1)} className="text-indigo-600 hover:text-indigo-900">
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{(item.price * item.quantity).toLocaleString()} USD</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleRemoveFromCart(item.productId)} className="text-red-600 hover:text-red-900">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-right px-6 py-4 whitespace-nowrap text-sm font-medium">
                    Total Price: {getTotalPrice().toLocaleString()} USD
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={handleCheckout}
                      className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Make Order
                      <ShoppingCartIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
        <Footer /> {/* Render Footer component */}
    </>
  );
};

export default CartPage;
