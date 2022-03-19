import { StyleSheet, View } from "react-native";
import { IMovie } from "../../types/movie";
import RecommendationCard from "./RecommendationCard";

type RecommendationsProps = {
  recommendations: IMovie[];
};

export default ({ recommendations }: RecommendationsProps) => (
  <View style={styles.container}>
    {recommendations.map((movie) => (
      <RecommendationCard key={movie.id} movie={movie} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 0,
  },
});
