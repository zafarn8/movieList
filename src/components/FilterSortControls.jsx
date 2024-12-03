import React from "react";
import { FaSearch } from "react-icons/fa";

const FilterSortControls = ({ searchTerm, setSearchTerm, sortOption, handleSort }) => {
  return (
    <div className="d-flex mb-4">
      <select
        className="form-select me-2"
        style={{ width: "150px" }}
        value={sortOption}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="Year">Year</option>
        <option value="Episode">Episode</option>
      </select>
      <div className="input-group">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search movies by title, episode, or release date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterSortControls;
