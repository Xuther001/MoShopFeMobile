import React, { useState, useEffect } from 'react';
import axios from '../../configs/axiosConfig';

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
        setCartItems(response.data.cartItems);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCart();
  }, [username, token]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>My Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id}>
            <p>Product ID: {item.productId}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: ${item.totalPrice}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default MyCart;
