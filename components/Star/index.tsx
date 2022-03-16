import { Image, StyleSheet, View } from "react-native";

import StarIcon from "../../assets/star-icon.png";
import StartFullIcon from "../../assets/star-icon-full.jpg";

type StarRenderProps = {
  img: any;
};

const StarRender = ({ img }: StarRenderProps) => (
  <Image
    style={{
      width: 25,
      height: 25,
    }}
    source={img}
  />
);

type StarProps = {
  rating?: number | null;
  userRating?: number;
};

export default ({ rating, userRating }: StarProps) => {
  const width = rating ? (rating * 250) / 10 : 0;

  const stars = Array(10).fill(0);

  return (
    <View style={[styles.star, { width }]}>
      {userRating !== undefined
        ? stars.map((_, i) => (
            <StarRender
              img={i >= userRating ? StarIcon : StartFullIcon}
              key={i}
            />
          ))
        : stars.map((_, i) => <StarRender img={StartFullIcon} key={i} />)}
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
