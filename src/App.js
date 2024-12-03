import React, { useState, useEffect } from "react";
import { fetchMovies } from "./api/api"; // Import the fetchMovies function
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import FilterSortControls from "./components/FilterSortControls";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredMovies(movies); // Reset if search is cleared
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(lowerTerm) ||
        String(movie.episode_id).includes(lowerTerm) ||
        movie.release_date.includes(lowerTerm)
    );
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedMovies = await fetchMovies();
        setMovies(fetchedMovies);
        setFilteredMovies(fetchedMovies);
      } catch (err) {
        setError("Failed to fetch movie list. Please try again later.");
        console.error("Error fetching movie data:", err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="text-center my-4">Star Wars Movie App</h1>
      <FilterSortControls
        searchTerm={searchTerm}
        setSearchTerm={handleSearch}
        sortOption=""
        handleSort={(option) => {
          const sorted = [...filteredMovies].sort((a, b) => {
            if (option === "Year") return new Date(a.release_date) - new Date(b.release_date);
            if (option === "Episode") return a.episode_id - b.episode_id;
            return 0;
          });
          setFilteredMovies(sorted);
        }}
      />
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && filteredMovies.length === 0 && (
        <div className="alert alert-warning text-center">
          No movies match your search criteria.
        </div>
      )}
      {!loading && !error && filteredMovies.length > 0 && (
        <div className="row">
          <div className="col-md-6">
            <MovieList movies={filteredMovies} onSelect={setSelectedMovie} selectedMovie={selectedMovie} />
          </div>
          <div className="col-md-6">
            <MovieDetails movie={selectedMovie} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
