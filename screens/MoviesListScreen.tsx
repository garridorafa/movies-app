import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { IMovie } from "../types/movie";
import { ScreenProps } from "../types/screen";
import Movies from "../components/Movies";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";

export default ({ navigation }: ScreenProps) => {
  const { data, error, isLoading } = useFetch("movie/now_playing");
  const handlePress = (movieId: number): void => {
    navigation.navigate("Details", { movieId });
  };

  if (error) throw error;

  const unsortedMovies = data?.results;

  const movies = unsortedMovies?.sort(function (a: IMovie, b: IMovie) {
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
