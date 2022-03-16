import { Button, Image, StyleSheet, Text, View } from "react-native";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";
import { IGenre } from "../types/movie";

import { ScreenProps } from "../types/screen";

type GenresListProps = {
  genres: IGenre[];
};

const GenresList = ({ genres }: GenresListProps) => (
  <View style={styles.genres}>
    {genres.map((genre) => (
      <Text key={genre.id}>{genre.name}</Text>
    ))}
  </View>
);

export default ({ navigation }: ScreenProps) => {
  const movieId = navigation.getParam("movieId");

  const { data: movie, error } = useFetch(`/movie/${movieId}`);

  if (error) throw error;

  return (
    <View style={styles.screen}>
      {!!movie ? (
        <>
          <Text style={styles.title}>{movie?.title}</Text>
          <Image
            style={{
              width: 400,
              height: 400,
            }}
            source={{
              uri: `http://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
          />
          <Text>{movie?.release_date}</Text>
          <GenresList genres={movie?.genres} />
          <Text>{movie?.adult ? "Only +18" : "Family Movie"}</Text>
          <Text style={styles.description}>Description: {movie?.overview}</Text>
          <Button
            title="Back"
            onPress={() => {
              navigation.pop();
            }}
          />
        </>
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
    marginTop: 40,
  },
  title: { marginBottom: 20, fontWeight: "bold", fontSize: 50 },
  description: { margin: 20 },
  genres: {
    flexDirection: "row",
    gap: 10,
  },
});
