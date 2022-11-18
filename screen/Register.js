import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { colors } from "./color";
import { AntDesign } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";

export default function Register({ navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
    name: "",
  });

  async function signUp() {
    console.log("Register");
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Vui lòng nhập email và password!",
      });
      return;
    }
    if (value.name === "") {
      setValue({
        ...value,
        error: "Vui lòng nhập tên!",
      });
      return;
    }

    setValue({
      ...value,
      error: "",
    });

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Home");
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
      <View style={[styles.input, , { marginTop: 30 }]}>
        <TextInput
          value={value.name}
          onChangeText={(text) => setValue({ ...value, name: text })}
          placeholder="Name"
          style={styles.input}
        />
      </View>
      <View style={[styles.input]}>
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
      {/* <View style={[styles.input]}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
      </View> */}
      <TouchableOpacity style={styles.container} onPress={signUp}>
        <Text style={styles.text}>Đăng Ký</Text>
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
        <Text style={{ color: "grey" }}>Bạn đã có tài khoản? </Text>
        <Text
          style={{
            color: colors.orangeMain,
            textDecorationLine: "underline",
            fontWeight: "bold",
          }}
        >
          Đăng Nhập
        </Text>
      </TouchableOpacity>
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
