import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

import MovieDetailScreen from "../screens/MovieDetailScreen";
import MoviesListScreen from "../screens/MoviesListScreen";
import FavoriteMoviesListScreen from "../screens/FavoriteMoviesListScreen";

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="Root">
    <Stack.Screen
      name="Root"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Group screenOptions={{ presentation: "modal" }}>
      <Stack.Screen name="Details" component={MovieDetailScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <BottomTab.Navigator initialRouteName="ListOfMovies">
    <BottomTab.Screen
      name="ListOfMovies"
      component={MoviesListScreen}
      options={() => ({
        title: "List of movies",
        tabBarIcon: () => <AntDesign name="bars" size={24} color="black" />,
      })}
    />
    <BottomTab.Screen
      name="Favorites"
      component={FavoriteMoviesListScreen}
      options={{
        title: "My Favorites",
        tabBarIcon: ({ color }) => (
          <AntDesign name="heart" size={24} color="black" />
        ),
      }}
    />
  </BottomTab.Navigator>
);
