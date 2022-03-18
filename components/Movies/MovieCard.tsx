import { Image, StyleSheet, Text, View } from "react-native";

import { IMovie } from "../../types/movie";
import Star from "../Star";

type MovieCardProps = {
  movie: IMovie;
};

export default ({ movie }: MovieCardProps) => (
  <View style={styles.card}>
    <Image
      style={styles.img}
      source={{
        uri: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      }}
    />
    <Text style={styles.title}>{movie.title}</Text>
    <Star rating={movie.vote_average} />
    <Text>Release Date: {movie.release_date}</Text>
    <Text>Rating: {movie.vote_average}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    marginVertical: 15,
    padding: 2,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: "#f7f7f8",
  },
  title: {
    fontWeight: "bold",
  },
  img: {
    width: "100%",
    height: 300,
  },
});
