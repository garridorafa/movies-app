import { Button, Image, StyleSheet, Text, View } from "react-native";

import { ScreenProps } from "../types/screen";

export default ({ navigation }: ScreenProps) => {
  const movie = navigation.getParam("movie");
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{movie.title}</Text>
      <Image
        style={{
          width: 400,
          height: 400,
        }}
        source={{
          uri: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }}
      />
      <Text>{movie.adult}</Text>
      <Text>{movie.release_date}</Text>
      <Text>Genre: {movie.genre_ids}</Text>
      <Text style={styles.description}>Description: {movie.overview}</Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.pop();
        }}
      />
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
});
