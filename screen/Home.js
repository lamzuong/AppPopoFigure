import { View, Text } from "react-native";
import React from "react";
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

const Tab = createBottomTabNavigator();
export default function Home() {
  return (
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
  );
}
