import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AddProduct = () => {
  return (
    <View style={styles.container}>
      <Text>add product</Text>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
