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
      <Text style={styles.genreText} key={genre.id}>
        {genre.name}
      </Text>
    ))}
  </View>
);

type CastingListProps = {
  casting: {
    name: string;
    character: string;
  }[];
};

const CastingList = ({ casting }: CastingListProps) => (
  <View style={styles.casting}>
    <Text style={styles.subtitle}>Casting</Text>
    {casting.map((actor: any) => (
      <Text key={actor.id}>{`${actor.name} as ${actor.character}`}</Text>
    ))}
  </View>
);

export default ({ navigation }: ScreenProps) => {
  const movieId = navigation.getParam("movieId");

  const { data: movie, error } = useFetch(movieId);

  if (error) throw error;

  const classification = movie?.adult ? "Only +18" : "Family Movie";

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
          <Text>{classification}</Text>
          <Text style={styles.description}>Description: {movie?.overview}</Text>
          <CastingList casting={movie.cast} />
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
    margin: 40,
  },
  title: { marginBottom: 20, fontWeight: "bold", fontSize: 50 },
  subtitle: { fontSize: 20 },
  description: { margin: 20 },
  genres: {
    flexDirection: "row",
  },
  genreText: {
    padding: 5,
  },
  casting: {
    marginBottom: 20,
  },
});
