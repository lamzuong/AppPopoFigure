import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screen/Home";
import Welcome from "./screen/Welcome";
import Cart from "./screen/Product/Cart";
import ProductDetail from "./screen/Product/ProductDetail";
import ProcessingOrder from "./screen/Product/ProcessingOrder";
import Address from "./screen/Product/Address";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="ProcessingOrder"
          component={ProcessingOrder}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{ animation: "fade_from_bottom" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
