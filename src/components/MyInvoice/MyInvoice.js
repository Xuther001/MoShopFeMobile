import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../configs/axiosConfig';
import './MyInvoice.css';

function MyInvoice() {
  const [invoices, setInvoices] = useState([]);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`/invoice/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInvoices(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvoices();
  }, [username, token, userId]);

  const formatDate = (dateArray) => {
    return new Date(...dateArray).toLocaleString();
  };

  return (
    <div className="my-invoice-container">
      <div className="nav-strip">
        <Link to="/" className="home-link">Home Page</Link>
      </div>

      <h2>My Invoices</h2>
      {invoices.length > 0 ? (
        invoices.map((invoice) => (
          <div key={invoice.id} className="invoice-card">
            <h3>Invoice ID: {invoice.id}</h3>
            <p><strong>Purchase Date:</strong> {formatDate(invoice.purchaseDate)}</p>
            <p><strong>Total Price:</strong> ${invoice.totalPrice.toFixed(2)}</p>
            <p><strong>Payment Status:</strong> {invoice.paymentStatus}</p>
            <div className="invoice-items">
              <h4>Items:</h4>
              <ul>
                {invoice.items.map(item => (
                  <li key={item.id}>
                    <strong>{item.productName}</strong> - Quantity: {item.quantity}, Total Price: ${item.totalPrice.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="centered-message">No invoices found.</div>
      )}
    </div>
  );
}

export default MyInvoice;