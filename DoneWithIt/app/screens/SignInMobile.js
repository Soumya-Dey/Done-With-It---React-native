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
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

import { signInPhone, verifyOtp } from "../../actions/auth";
import Alert from "../components/Alert";

const SignInMobile = ({ navigation, signInPhone, verifyOtp, loading }) => {
  const [otpVisibility, setOtpVisibility] = useState(true);
  const [otpTextBoxVisibility, setOtpTextBoxVisibility] = useState(false);

  const width = Dimensions.get("window").width - 84;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Alert />
        <Formik
          initialValues={{ countryCode: "+91", phoneNumber: "", otp: "" }}
          onSubmit={async (values, actions) => {
            try {
              const { countryCode, phoneNumber, otp } = values;
              const phone = countryCode + phoneNumber;
              Keyboard.dismiss();

              if (!otp && phoneNumber) {
                signInPhone({ phone });
                setOtpTextBoxVisibility(true);
              } else if (otp && phoneNumber) {
                verifyOtp({ phone, code: otp });
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(props) => (
            <View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    ...styles.textContainer,
                    width: width * 0.3,
                    marginRight: 12,
                  }}
                >
                  <Ionicons name="md-call" size={20} color="gray" />
                  <TextInput
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    editable={!otpTextBoxVisibility}
                    onChangeText={props.handleChange("countryCode")}
                    value={props.values.countryCode}
                    style={styles.textInput}
                  />
                </View>
                <View
                  style={{
                    ...styles.textContainer,
                    paddingHorizontal: 8,
                    width: width * 0.7,
                  }}
                >
                  <TextInput
                    placeholder="Enter Phone Number"
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    editable={!otpTextBoxVisibility}
                    onChangeText={props.handleChange("phoneNumber")}
                    value={props.values.phoneNumber}
                    style={styles.textInput}
                  />
                </View>
              </View>

              {otpTextBoxVisibility && (
                <View style={{ ...styles.textContainer, borderRadius: 80 }}>
                  <Ionicons name="md-lock" size={24} color="gray" />
                  <TextInput
                    textContentType="oneTimeCode"
                    secureTextEntry={!otpVisibility}
                    keyboardType="numeric"
                    placeholder="OTP"
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
  textBoxContainer: {
    width: "100%",
    flexDirection: "row",
  },
  textContainer: {
    position: "relative",
    width: "100%",
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 16,
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

export default connect(mapStateToProps, { signInPhone, verifyOtp })(
  SignInMobile
);
