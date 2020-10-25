import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  const deviceWidth = useWindowDimensions().width;

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <View
        key={alert.id}
        style={{ ...styles.alertContainer, width: deviceWidth }}
      >
        <Text style={styles.alertText}>{alert.msg}</Text>
      </View>
    ))
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ff6b6b80",
    paddingHorizontal: 42,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  alertsuccess: {
    backgroundColor: "#1dd1a160",
  },
  alertdanger: {
    backgroundColor: "#ff6b6b80",
  },
  alertText: {
    color: "#404040",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default connect(mapStateToProps)(Alert);
