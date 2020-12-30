import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { getProduct } from "../../actions/product";

const ProductCard = ({ item, getProduct, navigateToProductDetails }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.cardContainer}
      onPress={() => {
        getProduct({ productId: item._id });
        navigateToProductDetails();
      }}
    >
      <Image
        source={{ uri: item.imageUrls[0] }}
        style={styles.productImage}
      ></Image>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productDesc}>
            {item.description}
            {/* TODO: fix max length to 42 including the 3 dots */}
          </Text>
        </View>
        <Text style={styles.productPrice}>${item.priceInDollar}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginHorizontal: 18,
    marginBottom: 18,
  },
  productImage: {
    width: "100%",
    height: 150,
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

export default connect(null, { getProduct })(ProductCard);
