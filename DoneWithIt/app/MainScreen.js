import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={SignIn}
      options={{
        title: "Login",
        headerTitleAlign: "center",
      }}
    ></AuthStack.Screen>
    <AuthStack.Screen
      name="Register"
      component={SignUp}
      options={{
        title: "Register",
        headerTitleAlign: "center",
      }}
    ></AuthStack.Screen>
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{ title: "Home", headerTitleAlign: "center" }}
    ></HomeStack.Screen>
  </HomeStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ isAuthenticated }) => (
  <RootStack.Navigator headerMode="none">
    {isAuthenticated ? (
      <RootStack.Screen
        name="HOme"
        component={HomeStackScreen}
        // options={{
        //   animationEnabled: false
        // }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        // options={{
        //   animationEnabled: false
        // }}
      />
    )}
  </RootStack.Navigator>
);

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(RootStackScreen);
