import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.loadingConatiner}>
        <Image
          source={require("../assets/loading_alt.gif")}
          style={styles.loading}
        ></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingConatiner: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  loading: {
    width: 34,
    height: 34,
  },
});
