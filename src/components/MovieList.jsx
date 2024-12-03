import React from "react";
import StarRating from "./StarRating";

const MovieList = ({ movies, onSelect }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div
          key={movie.episode_id}
          className="d-flex flex-column flex-md-row align-items-md-center justify-content-between border rounded p-3 mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => onSelect(movie)}
        >
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <span className="badge bg-primary me-2">EPISODE {movie.episode_id}</span>
            <strong>{movie.title}</strong>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-md-center">
            <div className="me-md-3">
              <StarRating rating={movie.averageRating || 0} />
            </div>
            <div className="text-muted">{new Date(movie.release_date).toLocaleDateString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
