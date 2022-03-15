import { Image, StyleSheet, View } from "react-native";

import StarIcon from "../../assets/start-icon.png";

const Star = () => (
  <Image
    style={{
      width: 25,
      height: 25,
    }}
    source={StarIcon}
  />
);

type StarProps = {
  rating: number | null;
};

export default ({ rating }: StarProps) => {
  const width = rating ? (rating * 250) / 10 : 0;

  return (
    <View style={[styles.star, { width }]}>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
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
