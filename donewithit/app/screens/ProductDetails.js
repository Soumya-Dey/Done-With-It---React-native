import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

import Splash from "./Splash";

const ProductDetails = ({ product, productLoading, navigation }) => {
  return !productLoading && product ? (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.6}
        onPress={() => navigation.pop()}
      >
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView>
        <Image
          source={{ uri: product.imageUrls[0] }}
          style={styles.productImage}
        ></Image>
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{product.title}</Text>
          <Text style={styles.priceText}>${product.priceInDollar}</Text>
          <Text style={styles.descText}>{product.description}</Text>

          <View style={styles.userContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/54" }}
              style={styles.avatarImage}
            ></Image>
            <View style={styles.userDetails}>
              <Text style={styles.username}>{product.seller.name}</Text>
              <Text style={styles.altText}>
                {product.seller.productListings} product listing(s)
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.6}
            onPress={() => {}}
          >
            <Text style={styles.btnText}>Contact Seller</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    // marginTop: Constants.statusBarHeight + 18,
  },
  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 18,
    left: 18,
    height: 42,
    width: 42,
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
  productImage: {
    width: "100%",
    height: 300,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#404040",
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1dd1a1",
    marginBottom: 16,
  },
  descText: {
    fontSize: 14,
    color: "gray",
  },
  userContainer: {
    marginVertical: 18,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
  },
  userDetails: {
    display: "flex",
    justifyContent: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    color: "#404040",
    marginBottom: 4,
  },
  altText: {
    fontSize: 14,
    color: "gray",
  },
  submitBtn: {
    backgroundColor: "#ff6b6b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
    letterSpacing: 1,
  },
});

const mapStateToProps = (state) => ({
  product: state.product.product,
  productLoading: state.product.productLoading,
});

export default connect(mapStateToProps)(ProductDetails);
