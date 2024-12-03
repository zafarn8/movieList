
import React from "react";
import { shallow } from "enzyme";
import MovieDetails from "../MovieDetails";  

const mockMovie = {
  title: "A New Hope",
  episode_id: 4,
  release_date: "1977-05-25",
  director: "George Lucas",
  description: "A story of hope and rebellion...",
  ratings: [
    { Source: "Internet Movie Database", Value: "8.6/10" },
    { Source: "Rotten Tomatoes", Value: "92%" },
    { Source: "Metacritic", Value: "90/100" },
  ],
  poster: "https://via.placeholder.com/300",
  averageRating: 8.7,
};

describe("MovieDetails Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MovieDetails movie={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders fallback text when no movie is selected", () => {
    const wrapper = shallow(<MovieDetails movie={null} />);
    expect(wrapper.text()).toContain("Select a movie to see the details.");
  });

  it("renders details of the selected movie", () => {
    const wrapper = shallow(<MovieDetails movie={mockMovie} />);
    expect(wrapper.find(".movie-title").text()).toBe(mockMovie.title);
    expect(wrapper.find(".movie-director").text()).toContain(mockMovie.director);
    expect(wrapper.find(".movie-poster").prop("src")).toBe(mockMovie.poster);
  });
});
