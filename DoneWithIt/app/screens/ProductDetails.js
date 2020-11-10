import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";

import Splash from "./Splash";

const ProductDetails = ({ product, productLoading }) => {
  return !productLoading && product ? (
    <SafeAreaView style={styles.container}>
      {/* TODO: ADD A GO BACK BUTTON AT TOP LEFT CORNER OF SCREEN */}
      <Text>{product.title}</Text>
    </SafeAreaView>
  ) : (
    <Splash />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 18,
    marginTop: Constants.statusBarHeight + 18,
  },
});

const mapStateToProps = (state) => ({
  product: state.product.product,
  productLoading: state.product.productLoading,
});

export default connect(mapStateToProps)(ProductDetails);
