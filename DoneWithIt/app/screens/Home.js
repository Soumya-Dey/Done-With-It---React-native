import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";

import { logout } from "../../actions/auth";
import Splash from "./Splash";
import ProductCard from "../components/ProductCard";

const Home = ({ logout, isAuthenticated, loading, user }) => {
  return isAuthenticated && !loading && user ? (
    <View style={styles.container}>
      <ProductCard />
      <ProductCard />
      {/* TODO: add a scrollable list of product cards. USE FLATLIST*/}
      <Text>{user.email || user.phone.phoneNumber}</Text>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
        }}
        activeOpacity={0.6}
        onPress={() => logout()}
      >
        <Text style={styles.btnText2}>Sign out</Text>
      </TouchableOpacity>
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
    padding: 18,
    paddingTop: Constants.statusBarHeight + 18,
  },
  btnText2: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#202020",
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Home);
