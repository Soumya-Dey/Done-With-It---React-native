import React, { useEffect, useState } from "react";
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
import { getAllProducts, getProductsByCategory } from "../../actions/product";
import Splash from "./Splash";
import ProductCard from "../components/ProductCard";
import CategoryPill from "../components/CategoryPill";
import { categories } from "../../utils/categoryList";

const Home = ({
  logout,
  getAllProducts,
  getProductsByCategory,
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

  const filterProductsByCategory = ({ category }) => {
    getProductsByCategory({ category });
  };

  const navigateToProductDetails = () => navigation.navigate("ProductDetails");

  const renderProductItem = ({ item }) => (
    <ProductCard
      item={item}
      navigateToProductDetails={navigateToProductDetails}
    />
  );

  const renderPill = ({ category, key }) => (
    <CategoryPill
      category={category}
      key={key}
      filterProductsByCategory={filterProductsByCategory}
      clearProductFilter={getAllProducts}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.pillContainer} horizontal={true}>
        <TouchableOpacity
          activeOpacity={0.2}
          style={styles.categoryPill}
          onPress={() => logout()}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
        {categories.map((category, index) =>
          renderPill({ category, key: index })
        )}
      </ScrollView>
      {isAuthenticated &&
      !authLoading &&
      !productLoading &&
      user &&
      products ? (
        products.length > 0 ? (
          <FlatList
            style={styles.productList}
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item._id}
            refreshing={productLoading}
            onRefresh={() => getAllProducts()}
            bounces={true}
          ></FlatList>
        ) : (
          <Text>no products</Text>
        )
      ) : (
        <Splash />
      )}

      {/* <Text>{user.email || user.phone.phoneNumber}</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 18,
  },
  pillContainer: {
    marginHorizontal: 18,
    marginBottom: 18,
    minHeight: 34,
    maxHeight: 34,
  },
  categoryPill: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    paddingBottom: 10,
    height: 34,
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

export default connect(mapStateToProps, {
  logout,
  getAllProducts,
  getProductsByCategory,
})(Home);
