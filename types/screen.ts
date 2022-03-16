import { IMovie } from "./movie";

export type ScreenProps = {
  navigation: {
    navigate: (ScreenName: string, data: {}) => void;
    pop: () => void;
    getParam: (paramName: string) => number;
  };
};
