import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import StarIcon from "../../assets/star-icon.png";
import StartFullIcon from "../../assets/star-icon-full.jpg";

type StarRenderProps = {
  img: any;
  rate: number;
  onRate?: (rate: number) => void;
};

const StarRender = ({ img, rate, onRate }: StarRenderProps) => (
  <TouchableOpacity onPress={() => onRate(rate)}>
    <Image
      style={{
        width: 25,
        height: 25,
      }}
      source={img}
    />
  </TouchableOpacity>
);

type StarProps = {
  rating?: number | null;
  userRating?: number;
  onRate: (rate: number) => void;
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
              rate={i + 1}
              onRate={onRate}
            />
          ))
        : stars.map((_, i) => (
            <StarRender
              img={StartFullIcon}
              key={i}
              rate={i + 1}
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
});
