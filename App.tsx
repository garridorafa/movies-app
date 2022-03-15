const axios = require("axios").default;
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Movies from "./components/Movies";
import Spinner from "./components/Spinner";
import useHttp from "./hooks/useHttp";

const url = "/movie/now_playing";

export default function App() {
  const { data: movies, error, isLoading } = useHttp(url);

  if (error) throw error;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of movies</Text>
      {!isLoading ? <Movies movies={movies} /> : <Spinner />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: { padding: 20, fontSize: 40 },
});
