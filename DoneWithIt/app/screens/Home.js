import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

import { AuthContext } from "../../context";

export const Home = () => {
  const apiCall = async () => {
    try {
      const res = await axios.get("http://ef38aeb08d3e.ngrok.io/api/auth");
      console.log(res.data);
    } catch (error) {
      console.log("api error");
      console.log(error);
    }
  };

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
        }}
        activeOpacity={0.6}
        onPress={() => signOut()}
      >
        <Text style={styles.btnText2}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
        }}
        activeOpacity={0.6}
        onPress={() => apiCall()}
      >
        <Text style={styles.btnText2}>call server</Text>
      </TouchableOpacity>
    </View>
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
