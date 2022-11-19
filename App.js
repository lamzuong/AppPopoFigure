import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screen/Home";
import Welcome from "./screen/Welcome";
import Login from "./screen/Login";
import Register from "./screen/Register";
import Cart from "./screen/Product/Cart";
import ProductDetail from "./screen/Product/ProductDetail";
import ProcessingOrder from "./screen/Product/ProcessingOrder";
import Address from "./screen/Product/Address";
import ChiTietHoaDon from "./screen/Order/ChiTietHoaDon";
import Checkout from "./screen/Order/Checkout";
import UpdateProfile from "./screen/Profile/UpdateProfile";

// import { useAuthentication } from "./utils/hooks/useAuthenication";
// import { auth } from "./firebase";
// import "./firebase";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();
export default function App() {
  // const { user } = useAuthentication();
  const user = null;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <Stack.Group>
            {/* <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={Cart} /> */}
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ChiTietHoaDon" component={ChiTietHoaDon} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
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
          </Stack.Group>
        )}
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
