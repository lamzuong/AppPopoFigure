import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { colors } from "./color";
import { AntDesign } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";

export default function Login({ navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassLength, setErrorPassLength] = useState(false);

  async function signIn() {
    if (errorEmail || errorPassLength) {
      Alert.alert("Lỗi", "Vui lòng nhập lại thông tin.", [
        {
          text: "Xác Nhận",
          style: "cancel",
        },
      ]);
      return;
    }
    if (value.email === "") {
      Alert.alert("Lỗi", "Vui lòng nhập email.", [
        {
          text: "Xác Nhận",
          style: "cancel",
        },
      ]);
      return;
    }
    if (value.password === "") {
      Alert.alert("Lỗi", "Vui lòng nhập password.", [
        {
          text: "Xác Nhận",
          style: "cancel",
        },
      ]);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Home", { username: value.email });
    } catch (error) {
      Alert.alert("Lỗi", "Đăng nhập thất bại.", [
        {
          text: "Xác nhận",
          style: "cancel",
        },
      ]);
    }
  }
  const checkEmail = () => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        value.email
      )
    ) {
      setErrorEmail(true);
      return;
    }
    setErrorEmail(false);
  };
  const checkPassLength = () => {
    if (value.password.length < 6) {
      setErrorPassLength(true);
      return;
    }
    setErrorPassLength(false);
  };
  // _signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const { accessToken, idToken } = await GoogleSignin.signIn();
  //     setloggedIn(true);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       alert("Cancel");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       alert("Signin in progress");
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       alert("PLAY_SERVICES_NOT_AVAILABLE");
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
  return (
    <View style={styles.root}>
      <StatusBar />
      <Image
        source={{
          uri: "https://res.cloudinary.com/daoyryngu/image/upload/v1668668980/logoPoPo_k3safb.png",
        }}
        style={{
          width: "90%",
          height: "25%",
          resizeMode: "contain",
          marginTop: 10,
        }}
      />
      <ScrollView style={{ width: "100%" }}>
        <View style={[styles.input, { marginTop: 10 }]}>
          <TextInput
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            placeholder="Email"
            style={styles.input}
            onBlur={checkEmail}
          />
        </View>
        {errorEmail && (
          <View style={[styles.error, { marginTop: 0 }]}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Email không hợp lệ, vui lòng nhập lại.
            </Text>
          </View>
        )}
        <View style={styles.input}>
          <TextInput
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onBlur={checkPassLength}
          />
        </View>
        {errorPassLength && (
          <View style={[styles.error, { marginTop: 0 }]}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Password phải có ít nhất 6 ký tự.
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.container} onPress={signIn}>
          <Text style={styles.text}>Đăng Nhập</Text>
        </TouchableOpacity>
        {/* {!!value.error && (
          <View style={styles.error}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              {value.error}
            </Text>
          </View>
        )} */}
        <TouchableOpacity
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 10,
            flexDirection: "row",
          }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "grey" }}>Bạn chưa có tài khoản? </Text>
          <Text
            style={{
              color: colors.orangeMain,
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            Đăng Ký
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.container,
            { backgroundColor: "white", borderWidth: 0.5, marginTop: 40 },
          ]}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
            }}
            style={styles.icon}
          ></Image>
          <Text style={[styles.text, { color: "black" }]}>
            Đăng Nhập Bằng Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.container, { backgroundColor: "#2b5990" }]}
        >
          <Image
            source={{
              uri: "https://seeklogo.com/images/F/facebook-icon-circle-logo-09F32F61FF-seeklogo.com.png",
            }}
            style={[styles.icon, { marginRight: 0 }]}
          ></Image>
          <Text style={[styles.text, { marginLeft: 15 }]}>
            Đăng Nhập Bằng Facebook
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: colors.lightGrey,
  },
  input: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 8,
  },
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.orangeMain,
    marginTop: 20,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "red",
    backgroundColor: colors.lightGrey,
  },
});
