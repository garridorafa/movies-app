import React from "react";
import { render } from "@testing-library/react-native";

import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  test("should render content", () => {
    const movie = {
      title: "Matrix",
      vote_average: 8.5,
      id: 1,
      release_date: "12-12-2012",
    };

    const component = render(<MovieCard movie={movie} />);

    component.getByText(new RegExp(`${movie.title}`, "i"));
    component.getByText(new RegExp(`${movie.vote_average}`, "i"));
    component.getByText(new RegExp(`${movie.release_date}`, "i"));
  });
});
