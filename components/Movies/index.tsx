import React from "react";
import { FlatList } from "react-native";

import { IMovie } from "../../types/movie";
import MovieCard from "./MovieCard";

type MoviesProps = {
  movies: IMovie[] | null;
};

export default ({ movies }: MoviesProps) => (
  <FlatList
    data={movies}
    renderItem={(itemData) => <MovieCard movie={itemData.item} />}
    keyExtractor={(itemData) => itemData.id.toString()}
  />
);
