import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import StarIcon from "../../assets/star-icon.png";
import StartFullIcon from "../../assets/star-icon-full.jpg";

type StarRenderProps = {
  img: any;
  rating: number;
  onRate?: (rating: number) => void;
};

const StarRender = ({ img, rating, onRate }: StarRenderProps) => (
  <>
    {onRate ? (
      <TouchableOpacity
        onPress={() => {
          onRate(rating);
        }}
      >
        <Image style={styles.img} source={img} />
      </TouchableOpacity>
    ) : (
      <View>
        <Image style={styles.img} source={img} />
      </View>
    )}
  </>
);

type StarProps = {
  rating?: number | null;
  userRating?: number;
  onRate?: (rating: number) => void;
};

export default ({ rating, userRating, onRate }: StarProps) => {
  const width = rating ? (rating * 250) / 10 : 0;

  const stars = Array(10).fill(0);

  return (
    <View style={[styles.star, { width }]}>
      {userRating !== undefined
        ? stars.map((_, i) => (
            <StarRender
              img={i >= userRating ? StarIcon : StartFullIcon}
              key={i}
              rating={i + 1}
              onRate={onRate}
            />
          ))
        : stars.map((_, i) => (
            <StarRender
              img={StartFullIcon}
              key={i}
              rating={i + 1}
              onRate={onRate}
            />
          ))}
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  img: {
    width: 25,
    height: 25,
  },
});
