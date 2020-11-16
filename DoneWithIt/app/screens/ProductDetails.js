import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

import Splash from "./Splash";

const ProductDetails = ({ product, productLoading, navigation }) => {
  return !productLoading && product ? (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.6}
        onPress={() => navigation.dispatch(CommonActions.goBack())}
      >
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>
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
  backButton: {
    position: "absolute",
    left: 18,
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const mapStateToProps = (state) => ({
  product: state.product.product,
  productLoading: state.product.productLoading,
});

export default connect(mapStateToProps)(ProductDetails);
