import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  addFavorite,
  rateMovie,
  removeFavorite,
} from "../../redux/movies-slice";
import { ICast, IGenre, IMovie } from "../../types/movie";
import Star from "../Star";
import useFetchAll from "../../hooks/useFetch";
import CastingList from "../Casting/CastingList";
import RecommendationList from "../Recommendation/RecommendationList";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type GenresListProps = {
  genres: IGenre[];
};

const GenresList = ({ genres = [] }: GenresListProps) => (
  <View style={styles.genres}>
    {genres.map((genre) => (
      <Text style={styles.genreText} key={genre.id}>
        {genre.name}
      </Text>
    ))}
  </View>
);

type MovieDetailsProps = {
  movieDetail: IMovie;
  casting: { cast: ICast[] };
  rating: number;
};

export default ({ movieDetail, casting, rating }: MovieDetailsProps) => {
  const dispatch = useDispatch();
  const [userRating, setUserRating] = useState<number>(rating);
  const { favorites, isLoading } = useSelector((state) => state.movies);
  const navigation = useNavigation();
  const { data: recommendationsData } = useFetchAll(
    `/movie/${movieDetail.id}/recommendations`
  );

  const classification = movieDetail?.adult ? "Only +18" : "Family Movie";

  const recommendations = recommendationsData
    ? recommendationsData?.results?.slice(0, 3)
    : [];

  const isFavorite = favorites.results.some(
    (f: IMovie) => f.id === movieDetail.id
  );

  const handleRate = (newRate: number) => {
    dispatch(rateMovie(newRate));
    setUserRating(newRate);
  };

  const handleAddFavorite = () => {
    dispatch(addFavorite(movieDetail));
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(movieDetail.id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{movieDetail?.title}</Text>
      <Image
        style={styles.img}
        source={{
          uri: `http://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`,
        }}
      />
      <View>
        <Text>{movieDetail?.release_date}</Text>
        <GenresList genres={movieDetail?.genres} />
        <Text style={styles.classification}>{classification}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Rate it</Text>
        <Star rating={10} userRating={userRating} onRate={handleRate} />
      </View>
      <View>
        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.description}>{movieDetail?.overview}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>You may also like</Text>
        <RecommendationList recommendations={recommendations} />
      </View>
      <View>
        <CastingList casting={casting?.cast} />
      </View>
      <View style={styles.buttons}>
        {isFavorite ? (
          <Button
            title="Remove favorite"
            onPress={() => {
              handleRemoveFavorite();
            }}
            disabled={isLoading}
          />
        ) : (
          <Button
            title="Add favorite"
            onPress={() => {
              handleAddFavorite();
            }}
            disabled={isLoading}
          />
        )}
        <Button
          title="Back"
          onPress={() => {
            navigation.pop();
          }}
          color={"red"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f8", marginHorizontal: "auto" },
  title: { marginBottom: 20, fontWeight: "bold", fontSize: 50 },
  subtitle: { fontSize: 20 },
  description: { marginVertical: 10, textAlign: "justify" },
  classification: { alignSelf: "center" },
  genres: {
    flexDirection: "row",
    justifyContent: "center",
  },
  genreText: {
    padding: 5,
  },
  section: {
    marginBottom: 20,
  },
  img: {
    width: 350,
    height: 600,
    marginRight: "auto",
    marginLeft: "auto",
  },
  buttons: {
    justifyContent: "space-between",
    height: 80,
  },
});
