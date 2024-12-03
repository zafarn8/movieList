
import axios from "axios";
import { SWAPI_URL, OMDBAPI_URL, OMDBAPI_KEY } from "../constants/urls";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(SWAPI_URL);
    const starWarsMovies = response.data.results;

    // Fetch OMDb data for each movie
    const omdbPromises = starWarsMovies.map(async (movie) => {
      const omdbResponse = await axios.get(
        `${OMDBAPI_URL}?t=${encodeURIComponent(movie.title)}&apikey=${OMDBAPI_KEY}`
      );
      return {
        ...movie,
        poster: omdbResponse.data.Poster,
        ratings: omdbResponse.data.Ratings,
        averageRating: calculateAverageRating(omdbResponse.data.Ratings),
      };
    });

    const moviesWithOmdbData = await Promise.all(omdbPromises);
    return moviesWithOmdbData;
  } catch (error) {
    throw new Error("Failed to fetch movie list. Please try again later.");
  }
};

const calculateAverageRating = (ratings) => {
  if (!ratings) return "N/A";
  const validRatings = ratings.map((r) => {
    const value = r.Value.includes("/") ? parseFloat(r.Value.split("/")[0]) : parseFloat(r.Value);
    return value / 10;
  });
  const average = validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length;
  return (average * 10).toFixed(1);
};
