import Navigation from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { fetchSessionId } from "./redux/auth-slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSessionId());
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
