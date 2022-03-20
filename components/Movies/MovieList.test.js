import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import MovieList from "./MovieList";

describe("MoviesList", () => {
  let movies;
  const mockHandler = jest.fn();

  beforeAll(() => {
    movies = [
      {
        title: "Matrix",
        vote_average: 8.5,
        id: 1,
        release_date: "12-12-2012",
      },
      {
        title: "Batman",
        vote_average: 8.5,
        id: 2,
        release_date: "12-12-2013",
      },
    ];
  });

  test("should render content", () => {
    const component = render(
      <MovieList movies={movies} handlePress={mockHandler} />
    );

    component.getAllByText(/Rating/i);
  });

  test("should render all movies", () => {
    const component = render(
      <MovieList movies={movies} handlePress={mockHandler} />
    );

    expect(component.getAllByText(/Rating/i)).toHaveLength(movies.length);
  });

  test("should click the cards calls event handler once", async () => {
    const component = render(
      <MovieList movies={movies} handlePress={mockHandler} />
    );

    const movieCard = component.getAllByText("Matrix");

    fireEvent.press(movieCard[0]);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
