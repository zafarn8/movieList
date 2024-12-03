import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const filledStars = Math.round(rating); // Calculate number of filled stars
  const totalStars = 10; // Out of 10 stars

  return (
    <div className="d-flex align-items-center">
      {[...Array(totalStars)].map((_, index) => (
        <FaStar
          key={index}
          className={index < filledStars ? "text-warning" : "text-secondary"}
        />
      ))}
      {/* <span className="ms-2">{rating} / 10</span> */}
    </div>
  );
};

export default StarRating;
