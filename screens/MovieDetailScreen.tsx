import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { IRatedMovie } from "../types/movie";
import { ScreenProps } from "../types/screen";
import MovieDetails from "../components/Movies/MovieDetails";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";

export default ({ navigation, route }: ScreenProps) => {
  const { ratedMovies } = useSelector((state) => state.movies);
  const { movieId } = route.params;

  const { data: MovieDetail, error: movieError } = useFetch(`movie/${movieId}`);
  const { data: casting, error: castingError } = useFetch(
    `movie/${movieId}/credits`
  );

  if (movieError || castingError) throw new Error("Something went wrong!");

  if (!MovieDetail || !casting) return <Spinner />;

  const ratedMovie = ratedMovies?.find(
    (rm: IRatedMovie) => rm.id === MovieDetail.id
  );

  return (
    <View style={styles.screen}>
      {MovieDetail ? (
        <MovieDetails
          movieDetail={MovieDetail}
          casting={casting}
          rating={ratedMovie?.rating ?? 0}
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
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 500,
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
