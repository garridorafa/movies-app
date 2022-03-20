import React from "react";
import { render } from "@testing-library/react-native";

import RecommendationCard from "./RecommendationCard";

describe("RecommendationCard", () => {
  let recommendation;
  const mockHandler = jest.fn();

  beforeAll(() => {
    recommendation = {
      id: 1,
      title: "Matrix",
      poster_path: "uri",
    };
  });

  test("should render content", () => {
    const component = render(
      <RecommendationCard movie={recommendation} handlePress={mockHandler} />
    );

    component.getByText(new RegExp(`${recommendation.title}`, "i"));
  });
});
