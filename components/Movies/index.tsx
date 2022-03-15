import React from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { IMovie } from "../../types/movie";
import MovieCard from "./MovieCard";

type MoviesProps = {
  movies: IMovie[] | undefined;
  handlePress: (item: {}) => void;
};

export default ({ movies, handlePress }: MoviesProps) => (
  <FlatList
    data={movies}
    renderItem={(itemData) => (
      <TouchableOpacity onPress={() => handlePress(itemData.item)}>
        <MovieCard movie={itemData.item} />
      </TouchableOpacity>
    )}
    keyExtractor={(itemData) => itemData.id.toString()}
  />
);
