import React from "react";
import StarRating from "./StarRating";

const MovieDetails = ({ movie }) => {
  if (!movie) {
    return <div className="alert alert-info">Select a movie to see details.</div>;
  }

  return (
    <div>
      <h2 className="mb-3">{movie.title}</h2>
      <div className="d-flex mb-3">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="img-thumbnail me-3"
          style={{ maxWidth: "200px" }}
        />
        <p>{movie.opening_crawl}</p>
      </div>
      <p><strong>Directed by:</strong> {movie.director}</p>
      <div className="mb-3">
        <h5>Average Rating</h5>
        {movie.averageRating ? (
          <StarRating rating={movie.averageRating} />
        ) : (
          <p>No ratings available</p>
        )}
      </div>
      <div>
        <h5>Ratings</h5>
        <ul>
          {movie.ratings.map((rating) => (
            <li key={rating.Source}>
              <strong>{rating.Source}:</strong> {rating.Value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
