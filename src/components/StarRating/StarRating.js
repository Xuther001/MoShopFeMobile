import React from 'react';
import './StarRating.css'; // Add a separate CSS file for StarRating component

const StarRating = ({ rating, setRating, hoverRating, setHoverRating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < (hoverRating || rating) ? 'filled' : ''}`}
          onClick={() => setRating(index + 1)}
          onMouseEnter={() => setHoverRating && setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating && setHoverRating(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;