import { StyleSheet, View } from "react-native";

import { ScreenProps } from "../types/screen";
import MovieDetails from "../components/Movies/MovieDetails";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";

export default ({ navigation, route }: ScreenProps) => {
  const { movieId } = route.params;

  const { data: movieDetail, error: movieDetailError } = useFetch(
    `movie/${movieId}`
  );
  const { data: casting, error: castingError } = useFetch(
    `movie/${movieId}/credits`
  );

  if (movieDetailError || castingError)
    throw new Error("Something went wrong!");

  return (
    <View style={styles.screen}>
      {movieDetail ? (
        <MovieDetails
          movieDetail={movieDetail}
          casting={casting}
          navigation={navigation}
        />
      ) : (
        <Spinner />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 40,
  },
});
