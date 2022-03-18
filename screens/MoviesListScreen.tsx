import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

import { fetchAllMovies } from "../redux/movies-slice";
import { IMovie } from "../types/movie";
import { ScreenProps } from "../types/screen";
import Movies from "../components/Movies";
import Spinner from "../components/Spinner";

export default ({ navigation }: ScreenProps) => {
  const dispatch = useDispatch();
  const { movies: data, isLoading } = useSelector((state) => state.movies);

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

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <Movies movies={movies} handlePress={handlePress} />
      ) : (
        <Spinner />
      )}
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
  header: { padding: 20, fontSize: 40 },
});
