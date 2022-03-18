import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MovieDetailScreen from "../screens/MovieDetailScreen";
import MoviesListScreen from "../screens/MoviesListScreen";

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="List of movies" component={MoviesListScreen} />
      <Stack.Screen name="Details" component={MovieDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
