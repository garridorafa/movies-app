import { StyleSheet, View } from "react-native";

import { ScreenProps } from "../types/screen";
import MovieDetails from "../components/Movies/MovieDetails";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";

export default ({ navigation }: ScreenProps) => {
  const movieId = navigation.getParam("movieId");

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
  screen: {
    flex: 1,
    alignItems: "center",
    margin: 40,
  },
});
