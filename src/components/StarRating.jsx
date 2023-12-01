import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, maxRating }) => {
  if (rating === 0) {
    return <div className="text-sm">Not yet rated</div>;
  }

  const filledStars = Math.floor(rating);
  const emptyStars = maxRating - filledStars;

  const starElements = [];
  for (let i = 0; i < filledStars; i++) {
    starElements.push(
      <span key={i} className="star filled-star">
        <FaStar className="text-brand-blue text-2xl" />{" "}
      </span>
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    starElements.push(
      <span key={i + filledStars} className="star empty-star">
        <FaStar className="text-brand-grey text-2xl" />{" "}
      </span>
    );
  }

  return <div className="star-rating flex">{starElements}</div>;
};

export default StarRating;
