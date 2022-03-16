import axios from "axios";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Spinner from "../components/Spinner";
import Star from "../components/Star";
import useFetch from "../hooks/useFetch";
import { IGenre } from "../types/movie";

import { ScreenProps } from "../types/screen";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "api_key=572a752b603222159b7f28cfa392076e";

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
  <View style={styles.section}>
    <Text style={styles.subtitle}>Casting</Text>
    {casting.map((actor: any) => (
      <Text key={actor.id}>{`${actor.name} as ${actor.character}`}</Text>
    ))}
  </View>
);

export default ({ navigation }: ScreenProps) => {
  const [userRating, setUserRating] = useState(0);
  const movieId = navigation.getParam("movieId");

  const { data: movie, error } = useFetch(movieId);

  const handleRate = (rate: number) => {
    setUserRating(rate);
    axios
      .get(`${baseUrl}/authentication/guest_session/new?${apiKey}`)
      .then((resp) => {
        const sessionId = resp.data.guest_session_id;
        axios.post(
          `${baseUrl}/movie/${movieId}/rating?${apiKey}&guest_session_id=${sessionId}`,
          { value: rate }
        );
      });
  };

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
          <View style={styles.section}>
            <Text style={styles.subtitle}>Rate it</Text>
            <Star rating={10} userRating={userRating} onRate={handleRate} />
          </View>
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
  section: {
    marginBottom: 20,
  },
});
