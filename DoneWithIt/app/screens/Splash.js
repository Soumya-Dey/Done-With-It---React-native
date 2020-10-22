import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/loading_alt.gif")}
        style={styles.loading}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    width: 54,
    height: 54,
  },
});
