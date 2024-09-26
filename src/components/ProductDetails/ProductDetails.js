import React, { useState, useEffect } from 'react';
import axios from '../../configs/axiosConfig';
import './ProductDetails.css';

const ProductDetails = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [canReview, setCanReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await axios.get(`/api/products/${productId}`);
        setProduct(productResponse.data);

        const reviewsResponse = await axios.get(`/api/products/${productId}/reviews`);
        setReviews(reviewsResponse.data);

        const purchaseResponse = await axios.get(`/api/purchases/check`, {
          params: { username, productId }
        });
        setCanReview(purchaseResponse.data.purchased);

        const userReviewResponse = await axios.get(`/api/products/${productId}/reviews/user`, {
          params: { username }
        });
        
        setHasReviewed(userReviewResponse.data.length > 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId, username]);

  const handleAddToCart = async () => {
    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    if (quantity > product.stock) {
      alert(`Quantity exceeds available stock. Only ${product.stock} item(s) left in stock.`);
      return;
    }

    try {
      await axios.post(`/cart/add`, {
        username,
        productId,
        quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Product added to cart!');

      const updatedProduct = await axios.get(`/api/products/${productId}`);
      setProduct(updatedProduct.data);

      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to add product to cart.');
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await axios.post(`/api/products/reviews`, reviewData);
      alert('Review submitted successfully!');
      setHasReviewed(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit review.');
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="product-details">
      <button className="close-button" onClick={onClose}>Close</button>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className={product.stock <= 100 ? "low-stock" : ""}>
        Stock: {product.stock} <span className="left-text">left</span>
      </p>

      <div className="quantity-selector">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
          max={product.stock}
        />
      </div>

      <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>

      {canReview ? (
        hasReviewed ? (
          <p>You have already reviewed this item.</p>
        ) : (
          <div className="review-prompt">
            <p>You have purchased this item. Would you like to leave a review?</p>
            <button onClick={() => handleReviewSubmit({ productId, username, rating: 5, comment: 'Great product!' })}>
              Review
            </button>
          </div>
        )
      ) : null}

      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {reviews.length ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p><strong>{review.username}</strong>: {review.comment} ({review.rating}/5)</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;