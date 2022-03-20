import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

import { fetchAllMovies } from "../redux/movies-slice";
import { IMovie } from "../types/movie";
import { ScreenProps } from "../types/screen";
import MovieList from "../components/Movies/MovieList";
import Spinner from "../components/Spinner";

export default ({ navigation }: ScreenProps) => {
  const dispatch = useDispatch();
  const { favorites: data, isLoading } = useSelector((state) => state.movies);

  const handlePress = (movieId: number): void => {
    navigation.navigate("Details", { movieId });
  };

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, []);

  const unsortedMovies = data?.results;

  const movies = unsortedMovies?.slice().sort(function (a: IMovie, b: IMovie) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  });

  const isEmpty = !movies.length && !isLoading;

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <MovieList movies={movies} handlePress={handlePress} />
      ) : (
        <Spinner />
      )}
      {isEmpty && <Text style={styles.header}>Nothing yet</Text>}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    padding: 20,
    fontSize: 40,
    alignSelf: "center",
  },
});
