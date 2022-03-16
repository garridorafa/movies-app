import { Image, StyleSheet, View } from "react-native";

import StarIcon from "../../assets/start-icon.png";

type StarProps = {
  rating: number | null;
};

export default ({ rating }: StarProps) => {
  const width = rating ? (rating * 250) / 10 : 0;

  const stars = Array(10).fill(0);

  return (
    <View style={[styles.star, { width }]}>
      {stars.map((_, i) => (
        <Image
          style={{
            width: 25,
            height: 25,
          }}
          source={StarIcon}
          key={i}
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
