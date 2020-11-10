import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";

import { logout } from "../../actions/auth";
import { getAllProducts } from "../../actions/product";
import Splash from "./Splash";
import ProductCard from "../components/ProductCard";

const Home = ({
  logout,
  getAllProducts,
  isAuthenticated,
  productLoading,
  authLoading,
  user,
  products,
  navigation,
}) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const navigateToProductDetails = () => navigation.navigate("ProductDetails");

  const renderItem = ({ item }) => (
    <ProductCard
      item={item}
      navigateToProductDetails={navigateToProductDetails}
    />
  );

  return isAuthenticated && !authLoading && !productLoading && user ? (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.pillContainer} horizontal={true}>
        <TouchableOpacity
          activeOpacity={0.2}
          style={styles.categoryPill}
          onPress={() => logout()}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.2} style={styles.categoryPill}>
          <Text>Cameras</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.2} style={styles.categoryPill}>
          <Text>Furniture</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.2} style={styles.categoryPill}>
          <Text>Books</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.2} style={styles.categoryPill}>
          <Text>Clothes</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.2} style={styles.categoryPill}>
          <Text>Baby Toys</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.2} style={styles.categoryPill}>
          <Text>Mobiles</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshing={productLoading}
        onRefresh={() => getAllProducts()}
        bounces={true}
      ></FlatList>

      {/* <Text>{user.email || user.phone.phoneNumber}</Text> */}
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
  pillContainer: {
    marginHorizontal: 18,
    marginBottom: 18,
  },
  categoryPill: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#eee",
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.authLoading,
  productLoading: state.product.productLoading,
  user: state.auth.user,
  products: state.product.products,
});

export default connect(mapStateToProps, { logout, getAllProducts })(Home);
