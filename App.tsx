const axios = require("axios").default;
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import Spinner from "./components/Spinner";
import StarIcon from "./assets/start-icon.png";
import useHttp from "./hooks/useHttp";

const url = "/movie/now_playing";

export default function App() {
  const { data: movies, error, isLoading } = useHttp(url);

  if (error) throw error;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movie on theatre!</Text>
      {!isLoading ? (
        <FlatList
          data={movies}
          renderItem={(itemData) => (
            <View style={styles.card}>
              <Image
                style={{
                  width: 290,
                  height: 290,
                }}
                source={{
                  uri: `http://image.tmdb.org/t/p/w500/${itemData.item.poster_path}`,
                }}
              />
              <Text style={styles.title}>{itemData.item.title}</Text>
              <View style={styles.star}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  source={StarIcon}
                />
              </View>
              <Text>Fecha de estreno: {itemData.item.release_date}</Text>
              <Text>Puntuación: {itemData.item.vote_average}</Text>
            </View>
          )}
        />
      ) : (
        <Spinner />
      )}
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
  card: {
    flex: 1,
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: "#f7f7f8",
  },
  title: {
    fontWeight: "bold",
  },
  star: {
    flex: 1,
    flexDirection: "row",
    width: (7 * 250) / 10,
    overflow: "hidden",
  },
});
