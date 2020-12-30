import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from "./app/MainScreen";
import { Provider } from "react-redux";

import store from "./store";
import { Text } from "react-native";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
