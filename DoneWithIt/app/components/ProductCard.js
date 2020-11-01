import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCard = () => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.cardContainer}>
      <Image
        source={require("../assets/demo_product_2.jpg")}
        style={styles.productImage}
      ></Image>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.productName}>Black Woolen Sweater</Text>
          <Text style={styles.productDesc}>
            Black Woolen Sweater with nice texture...
            {/* TODO: fix max length to 42 including the 3 dots */}
          </Text>
        </View>
        <Text style={styles.productPrice}>$109.99</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 22,
  },
  productImage: {
    width: "100%",
    height: 140,
    opacity: 0.95,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  infoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#505050",
    marginBottom: 6,
  },
  productDesc: {
    color: "#606060",
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1dd1a1",
  },
});

export default ProductCard;
