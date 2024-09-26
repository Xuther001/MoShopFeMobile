import React, { useState, useEffect } from 'react';
import axios from '../../configs/axiosConfig';
import StarRating from '../StarRating/StarRating';
import './ProductDetails.css';

const ProductDetails = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [canReview, setCanReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // Track hover state
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await axios.get(`/api/products/${productId}`);
        setProduct(productResponse.data);

        const reviewsResponse = await axios.get(`/api/products/${productId}/reviews`);
        setReviews(reviewsResponse.data);

        if (username) {
          const purchaseResponse = await axios.get(`/api/purchases/check`, {
            params: { username, productId }
          });
          setCanReview(purchaseResponse.data.purchased);

          const userReviewResponse = await axios.get(`/api/products/${productId}/reviews/user`, {
            params: { username }
          });
          setHasReviewed(userReviewResponse.data.length > 0);
        }
      } catch (err) {
        setError(err.message);
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
      const response = await axios.post(`/api/products/reviews`, reviewData);
      alert('Review submitted successfully!');

      setReviews([...reviews, response.data]);
      setHasReviewed(true);
      setRating(0);
    } catch (err) {
      console.error(err);
      setError('Failed to submit review.');
    }
  };

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

      {canReview && !hasReviewed && (
        <div className="review-prompt">
          <p>You have purchased this item. If you want, you can leave a review below:</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleReviewSubmit({
              productId,
              username,
              rating: rating,
              comment: e.target.comment.value
            });
          }}>
            <StarRating rating={rating} setRating={setRating} hoverRating={hoverRating} setHoverRating={setHoverRating} />
            <label>Comment:</label>
            <textarea name="comment" required></textarea>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}

      {hasReviewed && <p>You have already reviewed this item.</p>}

      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {reviews.length ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p><strong>{review.username}</strong>: {review.comment}</p>
              <StarRating rating={review.rating} setRating={() => {}} />
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