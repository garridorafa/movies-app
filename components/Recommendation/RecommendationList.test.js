import React from "react";
import { render } from "@testing-library/react-native";

import RecommendationList from "./RecommendationList";

describe("RecommendationList", () => {
  let recommendations;
  const mockHandler = jest.fn();

  beforeAll(() => {
    recommendations = [
      {
        id: 1,
        title: "Matrix",
      },
      {
        id: 2,
        title: "Batman",
      },
    ];
  });

  test("should render content", () => {
    const component = render(
      <RecommendationList
        recommendations={recommendations}
        handlePress={mockHandler}
      />
    );

    component.getByText(new RegExp(`${recommendations[0].title}`, "i"));
  });
});
