import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import MovieDetailScreen from "../screens/MovieDetailScreen";
import MoviesListScreen from "../screens/MoviesListScreen";

const Navigation = createStackNavigator({
  Movies: MoviesListScreen,
  MovieDetail: MovieDetailScreen,
});

export default createAppContainer(Navigation);
