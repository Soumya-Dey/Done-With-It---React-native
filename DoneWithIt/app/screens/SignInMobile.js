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
import Alert from "../components/Alert";

const SignInMobile = ({ navigation, login, loading }) => {
  const [otpVisibility, setOtpVisibility] = useState(true);
  const [otpTextBoxVisibility, setOtpTextBoxVisibility] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Alert />
        <Formik
          initialValues={{ phone: "", otp: "" }}
          onSubmit={async (values, actions) => {
            try {
              Keyboard.dismiss();
              if (!values.otp && values.phone) {
                setOtpTextBoxVisibility(true);
              } else {
              }
              // TODO: ADD ACTIONS AND REDUCERS FOR LOGIN WITH OTP
              console.log(values);
              //   login(values);
              // actions.resetForm();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(props) => (
            <View>
              <View style={styles.textContainer}>
                <Ionicons name="md-call" size={20} color="gray" />
                <TextInput
                  placeholder="Enter Phone Number"
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                  editable={!otpTextBoxVisibility}
                  onChangeText={props.handleChange("phone")}
                  value={props.values.phone}
                  style={styles.textInput}
                />
              </View>

              {otpTextBoxVisibility && (
                <View style={{ ...styles.textContainer, borderRadius: 80 }}>
                  <Ionicons name="md-lock" size={24} color="gray" />
                  <TextInput
                    textContentType="oneTimeCode"
                    secureTextEntry={!otpVisibility}
                    keyboardType="numeric"
                    placeholder="Enter OTP"
                    onChangeText={props.handleChange("otp")}
                    value={props.values.otp}
                    style={styles.textInput2}
                  />
                  <Ionicons
                    name={otpVisibility ? "md-eye" : "md-eye-off"}
                    size={24}
                    color="gray"
                    style={styles.eyeIcon}
                    onPress={() => setOtpVisibility(!otpVisibility)}
                  />
                </View>
              )}

              <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.6}
                onPress={props.handleSubmit}
              >
                {!loading ? (
                  <Text style={styles.btnText}>Submit</Text>
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
                onPress={() => navigation.push("Login")}
              >
                <Text style={styles.btnText2}>Sign In with email instead</Text>
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
    height: 80,
    paddingVertical: 10,
    marginLeft: 12,
    fontSize: 32,
    textAlign: "center",
    letterSpacing: 8,
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

export default connect(mapStateToProps, { login })(SignInMobile);
