import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Movies from "../components/Movies";
import Spinner from "../components/Spinner";
import useFetchAll from "../hooks/useFetchAll";
import { IMovie } from "../types/movie";
import { ScreenProps } from "../types/screen";

const url = "/movie/now_playing";

export default ({ navigation }: ScreenProps) => {
  const { data: unsortedMovies, error, isLoading } = useFetchAll(url);
  const handlePress = (movie: IMovie): void => {
    navigation.navigate("MovieDetail", { movie });
  };

  if (error) throw error;

  const movies = unsortedMovies?.sort(function (a, b) {
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
      <Text style={styles.header}>List of movies</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: { padding: 20, fontSize: 40 },
});
