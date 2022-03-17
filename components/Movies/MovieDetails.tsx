import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ICast, IGenre, IMovie } from "../../types/movie";
import Star from "../Star";
import useRate from "../../hooks/useRate";

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

type CastingListProps = {
  casting: {
    name: string;
    character: string;
  }[];
};

const CastingList = ({ casting = [] }: CastingListProps) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Casting</Text>
    {casting.map((actor: any) => (
      <Text key={actor.id}>{`${actor.name} as ${actor.character}`}</Text>
    ))}
  </View>
);

type MovieDetailsProps = {
  movieDetail: IMovie;
  casting: { cast: ICast[] };
  navigation: { pop: () => void };
};
export default ({ movieDetail, casting, navigation }: MovieDetailsProps) => {
  const { userRating, setUserRating } = useRate(movieDetail?.id);

  const handleRate = (rate: number) => {
    setUserRating(rate);
  };

  const classification = movieDetail?.adult ? "Only +18" : "Family Movie";
  return (
    <View>
      <Text style={styles.title}>{movieDetail?.title}</Text>
      <Image
        style={{
          width: 400,
          height: 400,
        }}
        source={{
          uri: `http://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`,
        }}
      />
      <Text>{movieDetail?.release_date}</Text>
      <GenresList genres={movieDetail?.genres} />
      <Text>{classification}</Text>
      <Text style={styles.description}>
        Description: {movieDetail?.overview}
      </Text>
      <CastingList casting={casting?.cast} />
      <View style={styles.section}>
        <Text style={styles.subtitle}>Rate it</Text>
        <Star rating={10} userRating={userRating} onRate={handleRate} />
      </View>
      <View>
        <ScrollView>{}</ScrollView>
      </View>
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
