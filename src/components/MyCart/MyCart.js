import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../configs/axiosConfig';
import './MyCart.css';

function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantityInput, setQuantityInput] = useState({});
  const [error, setError] = useState(null);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const fetchedCartItems = response.data.cartItems || [];
        setCartItems(fetchedCartItems);

        const initialQuantities = {};
        fetchedCartItems.forEach(item => {
          initialQuantities[item.productId] = item.quantity;
        });
        setQuantityInput(initialQuantities);
      } catch (err) {
        setError("Failed to fetch cart. Please try again later.");
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [username, token, userId]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        throw new Error("Quantity must be greater than zero");
      }

      await axios.post(`/cart/update`, null, {
        params: { productId, quantity: newQuantity },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const response = await axios.get(`/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data.cartItems || []);
    } catch (err) {
      setError("Error updating quantity. Please try again.");
      console.error("Error updating quantity:", err);
    }
  };

  const handleInputChange = (event, productId) => {
    setQuantityInput({
      ...quantityInput,
      [productId]: event.target.value
    });
  };

  const handleInputBlur = (productId) => {
    const newQuantity = parseInt(quantityInput[productId], 10);
    if (!isNaN(newQuantity)) {
      handleQuantityChange(productId, newQuantity);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.post(`/cart/remove`, null, {
        params: { productId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await axios.get(`/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data.cartItems || []);
    } catch (err) {
      setError("Error removing item from cart. Please try again.");
      console.error("Error removing from cart:", err);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post(`/invoice/checkout`, null, {
        params: { username },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Purchase successful!");
      setCartItems([]);
      navigate('/');
    } catch (err) {
      setError("Error during checkout. Please try again.");
      console.error("Checkout error:", err);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-cart-container">
      <div className="nav-strip">
        <Link to="/" className="home-link">Home Page</Link>
      </div>
      <h2>My Cart</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <img src={item.productImageUrl} alt={item.productName} />
              <div className="cart-item-details">
                <p className="item-value item-name">{item.productName}</p>
                <p className="item-label">Description:</p>
                <p className="item-value item-description">{item.productDescription}</p>
                <div className="quantity-row">
                  <p className="item-label">Quantity:</p>
                  <input
                    type="number"
                    value={quantityInput[item.productId] || ''}
                    min="1"
                    onChange={(e) => handleInputChange(e, item.productId)}
                    onBlur={() => handleInputBlur(item.productId)}
                  />
                </div>
                <div className="price-row">
                  <p className="item-label">Total Price:</p>
                  <p className="item-value item-price">${item.totalPrice.toFixed(2)}</p>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => handleRemoveFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button 
            className="checkout-button" 
            onClick={handleCheckout}
          >
            Simulate a Purchase
          </button>
        </>
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
    </div>
  );
}

export default MyCart;