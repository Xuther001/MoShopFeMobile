import React, { useState, useEffect } from 'react';
import axios from '../../configs/axiosConfig';

const ProductReviews = () => {
  const [productId, setProductId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  const fetchReviews = async () => {
    if (!productId || isNaN(productId)) {
      setError('Please enter a valid product ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/products/${productId}/reviews`);
      setReviews(response.data);
    } catch (err) {
      setError(err.message || 'Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReviews();
  };

  return (
    <div className="reviews-container">
      <h3>Product Reviews</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={handleInputChange}
        />
        <button type="submit">Fetch Reviews</button>
      </form>

      {loading && <div>Loading reviews...</div>}
      {error && <div>Error: {error}</div>}

      {!loading && !error && reviews.length > 0 && (
        <div className="reviews">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p><strong>{review.username}</strong>: {review.comment} ({review.rating}/5)</p>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div>No reviews found for this product.</div>
      )}
    </div>
  );
};

export default ProductReviews;