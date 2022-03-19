import { StyleSheet, Text, View } from "react-native";

type CastingListProps = {
  casting: {
    name: string;
    character: string;
  }[];
};

export default ({ casting = [] }: CastingListProps) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Casting</Text>
    {casting.map((actor: any) => (
      <Text key={actor.id}>{`${actor.name} as ${actor.character}`}</Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  subtitle: { fontSize: 20 },
  section: {
    marginBottom: 20,
  },
});
