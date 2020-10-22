import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";
import Splash from "./Splash";

const Home = ({ logout, isAuthenticated, loading }) => {
  return isAuthenticated && !loading ? (
    <View style={styles.container}>
      <Text>Home screen</Text>
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
    justifyContent: "center",
    alignItems: "center",
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
});

export default connect(mapStateToProps, { logout })(Home);
