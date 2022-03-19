import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { IMovie } from "../../types/movie";

type RecommendationCardProps = {
  movie: IMovie;
};

export default ({ movie }: RecommendationCardProps) => {
  const navigation = useNavigation();

  const handleDetails = (movieId: number) => {
    navigation.push("Details", { movieId });
  };

  return (
    <TouchableOpacity
      onPress={() => handleDetails(movie.id)}
      style={styles.container}
    >
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }}
        style={styles.img}
      />
      <Text style={styles.title}>{movie.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  title: { textAlign: "center", width: 100 },
  img: { height: 120, width: 70 },
});
