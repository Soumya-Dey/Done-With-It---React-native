import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

import { login } from "../../actions/auth";

const SignIn = ({ navigation, login, loading }) => {
  const [passwordVisibility, setpasswordVisibility] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, actions) => {
            try {
              Keyboard.dismiss();
              login(values);
              // actions.resetForm();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(props) => (
            <View>
              <View style={styles.textContainer}>
                <Ionicons name="md-mail" size={18} color="gray" />
                <TextInput
                  placeholder="Enter email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  style={styles.textInput}
                />
              </View>

              <View style={styles.textContainer}>
                <Ionicons name="md-lock" size={24} color="gray" />
                <TextInput
                  textContentType="password"
                  secureTextEntry={!passwordVisibility}
                  placeholder="Enter password"
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  style={styles.textInput2}
                />
                <Ionicons
                  name={passwordVisibility ? "md-eye" : "md-eye-off"}
                  size={24}
                  color="gray"
                  style={styles.eyeIcon}
                  onPress={() => setpasswordVisibility(!passwordVisibility)}
                />
              </View>

              <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.6}
                onPress={props.handleSubmit}
              >
                {!loading ? (
                  <Text style={styles.btnText}>Login</Text>
                ) : (
                  <Image
                    source={require("../assets/loading_btn_1.gif")}
                    style={styles.loading}
                  ></Image>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 8,
                }}
                activeOpacity={0.6}
                onPress={() => navigation.push("Register")}
              >
                <Text style={styles.btnText2}>Register Here</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 36,
  },
  textContainer: {
    position: "relative",
    width: "100%",
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 18,
    marginBottom: 18,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: "89%",
    paddingVertical: 10,
    marginLeft: 12,
  },
  textInput2: {
    width: "77%",
    paddingVertical: 10,
    marginLeft: 12,
  },
  eyeIcon: {
    position: "absolute",
    right: 18,
  },
  submitBtn: {
    backgroundColor: "#1dd1a1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 13,
    marginTop: 12,
    marginBottom: 8,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  btnText2: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#202020",
  },
  loading: {
    width: 22,
    height: 22,
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(SignIn);
