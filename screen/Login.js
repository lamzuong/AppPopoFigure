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

  async function signIn() {
    console.log("Login");
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Vui lòng nhập email và password!",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Home", { username: value.email });
    } catch (error) {
      console.log(error);
      setValue({
        ...value,
        error: error.message,
      });
    }
  }
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
      <View style={[styles.input, { marginTop: 50 }]}>
        <TextInput
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.container} onPress={signIn}>
        <Text style={styles.text}>Đăng Nhập</Text>
      </TouchableOpacity>
      {!!value.error && (
        <View style={styles.error}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            {value.error}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          flexDirection: "column",
          alignItems: "center",
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
      {/* <TouchableOpacity
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
          Đăng Nhập bằng Google
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
          Đăng Nhập bằng Facebook
        </Text>
      </TouchableOpacity> */}
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
