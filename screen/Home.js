import { View, Text, StatusBar } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Foundation,
  Ionicons,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Product from "./Product/Product";
import Order from "./Order/Order";
import Profile from "./Profile/Profile";
import { colors } from "./color";
const axios = require("axios").default;

const Tab = createBottomTabNavigator();
export var AuthContext = createContext();
export default function Home({ route }) {
  const { username } = route.params;
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user")
      .then((todo) => setUser(todo.data.find((e) => e.username == username)));
  }, []);
  console.log(user);
  AuthContext = createContext({ userId: user?.id });
  return (
    <>
      <AuthContext.Provider value={{ userId: user?.id }} />
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      >
        <Tab.Screen
          name="Product"
          component={Product}
          options={{
            tabBarLabel: () => {
              null;
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Foundation
                  name="home"
                  size={24}
                  color="black"
                  style={{
                    color: focused ? colors.orangeMain : "#c3c3c3",
                    paddingTop: 5,
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Order"
          component={Order}
          options={{
            tabBarLabel: () => {
              null;
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="receipt"
                  size={24}
                  color="black"
                  style={{
                    color: focused ? colors.orangeMain : "#c3c3c3",
                    paddingTop: 5,
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: () => {
              null;
            },
            tabBarIcon: ({ focused }) => {
              return (
                <FontAwesome
                  name="user"
                  size={24}
                  color="black"
                  style={{
                    color: focused ? colors.orangeMain : "#c3c3c3",
                    paddingTop: 5,
                  }}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}
