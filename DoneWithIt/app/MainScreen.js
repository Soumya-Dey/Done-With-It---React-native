import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SignIn from "./screens/SignIn";
import SignInMobile from "./screens/SignInMobile";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import AddProduct from "./screens/AddProduct";
import { loadUser } from "../actions/auth";
import { Text, View } from "react-native";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Sign In"
      component={SignInMobile}
      options={{
        title: "Sign In",
        headerTitleAlign: "center",
      }}
    ></AuthStack.Screen>
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

const FeedStack = createStackNavigator();
const FeedStackScreen = () => (
  <FeedStack.Navigator headerMode="none">
    <FeedStack.Screen
      name="Home"
      component={Home}
      options={{ title: "Home", headerTitleAlign: "center" }}
    ></FeedStack.Screen>
  </FeedStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Profile", headerTitleAlign: "center" }}
    ></ProfileStack.Screen>
  </ProfileStack.Navigator>
);

const AddProductStack = createStackNavigator();
const AddProductStackScreen = () => (
  <AddProductStack.Navigator>
    <AddProductStack.Screen
      name="Add Product"
      component={AddProduct}
      options={{ title: "Add Product", headerTitleAlign: "center" }}
    ></AddProductStack.Screen>
  </AddProductStack.Navigator>
);

const HomeBottomTabs = createBottomTabNavigator();
const HomeBottomTabsScreen = () => (
  <HomeBottomTabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Feed")
          iconName = focused ? "home-variant" : "home-variant-outline";
        else if (route.name === "Add Product") iconName = "plus-circle";
        else if (route.name === "Profile")
          iconName = focused ? "account-box" : "account-box-outline";

        // You can return any component that you like here!
        return route.name === "Add Product" ? (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 100,
              padding: 6,
              marginBottom: 14,
            }}
          >
            <View
              style={{
                backgroundColor: "#1dd1a1",
                borderRadius: 100,
                padding: 6,
              }}
            >
              <MaterialCommunityIcons name={iconName} size={36} color="white" />
            </View>
          </View>
        ) : (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: "#1dd1a1",
      inactiveTintColor: "gray",
      showLabel: false,
      style: { height: 56 },
    }}
  >
    <HomeBottomTabs.Screen
      name="Feed"
      component={FeedStackScreen}
    ></HomeBottomTabs.Screen>
    <HomeBottomTabs.Screen
      name="Add Product"
      component={AddProductStackScreen}
    ></HomeBottomTabs.Screen>
    <HomeBottomTabs.Screen
      name="Profile"
      component={ProfileStackScreen}
    ></HomeBottomTabs.Screen>
  </HomeBottomTabs.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ isAuthenticated, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <RootStack.Navigator headerMode="none">
      {isAuthenticated ? (
        <RootStack.Screen
          name="Home"
          component={HomeBottomTabsScreen}
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
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser })(RootStackScreen);
