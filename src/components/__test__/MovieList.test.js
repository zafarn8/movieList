
import React from "react";
import { shallow } from "enzyme";
import MovieList from "../MovieList";  

const mockMovies = [
  { title: "A New Hope", episode_id: 4, release_date: "1977-05-25", averageRating: 8.5 },
  { title: "The Empire Strikes Back", episode_id: 5, release_date: "1980-05-17", averageRating: 9.0 },
];

describe("MovieList Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MovieList movies={mockMovies} onSelect={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a list of movies", () => {
    const wrapper = shallow(<MovieList movies={mockMovies} onSelect={jest.fn()} />);
    expect(wrapper.find(".movie-item").length).toBe(mockMovies.length);
  });

  it("calls onSelect when a movie is clicked", () => {
    const mockOnSelect = jest.fn();
    const wrapper = shallow(<MovieList movies={mockMovies} onSelect={mockOnSelect} />);
    wrapper.find(".movie-item").first().simulate("click");
    expect(mockOnSelect).toHaveBeenCalledWith(mockMovies[0]);
  });
});
