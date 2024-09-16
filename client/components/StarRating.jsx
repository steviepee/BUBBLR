import React, { useState } from 'react';
import '../styling/StarRating.css';

const StarRating = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState(null);

  const handleRatingClick = (index) => {
    const newRating = index + 1; // Stars are 1-indexed
    setRating(newRating);
    onRatingChange(newRating);
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="star-rating" onMouseLeave={handleMouseLeave}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < rating ? 'filled' : ''} ${index <= (hovered !== null ? hovered : rating - 1) ? 'highlighted' : ''}`}
          onClick={() => handleRatingClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
