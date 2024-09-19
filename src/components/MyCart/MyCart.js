import React, { useState, useEffect } from 'react';
import axios from '../../configs/axiosConfig';
import './MyCart.css';

function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`/cart/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCartItems(response.data.cartItems || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCart();
  }, [username, token]);

  const handleRemoveFromCart = async (productId) => {
    console.log(productId, username);
    try {
      if (!productId) {
        throw new Error("Product ID is missing");
      }
      await axios.post(`/cart/remove`, null, {
        params: { productId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await axios.get(`/cart/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data.cartItems || []);
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError(err.message);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-cart-container">
      <h2>My Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.productName} className="cart-item">
            <img src={item.productImageUrl} alt={item.productName} />
            <div className="cart-item-details">
              <p className="item-value item-name">{item.productName}</p>
              <p className="item-label">Description:</p>
              <p className="item-value item-description">{item.productDescription}</p>
              <div className="quantity-row">
                <p className="item-label">Quantity:</p>
                <p className="item-value item-quantity">{item.quantity}</p>
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
        ))
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
    </div>
  );
}

export default MyCart;