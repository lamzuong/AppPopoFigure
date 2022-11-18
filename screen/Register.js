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
  Button,
} from "react-native";
import { colors } from "./color";
import { AntDesign } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
const axios = require("axios").default;

export default function Register({ navigation }) {
  const [birthday, setbirthday] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [gender, setGender] = useState("Nam");
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
    name: "",
  });
  const [icon, seticon] = useState("calendar");
  const addNewUser = async (id) => {
    await axios.post("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/", {
      username: value.email,
      password: value.password,
      fullname: value.name,
      gender: gender,
      birthday: birthday,
      avatar:
        "https://i.pinimg.com/736x/7e/92/df/7e92df16f7bd582a25ac3f0146ba2b6c.jpg",
    });
    await axios.post("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/cart/", {
      username: value.email,
      listProduct: [],
    });
  };

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
    addNewUser();
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setbirthday(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
    seticon("close");
    hideDatePicker();
  };

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
      <View style={[styles.input, , { marginTop: 0 }]}>
        <TextInput
          value={value.name}
          onChangeText={(text) => setValue({ ...value, name: text })}
          placeholder="Nhập Tên"
          style={styles.input}
        />
      </View>
      <View style={styles.input}>
        <View style={[styles.input, { flexDirection: "row" }]}>
          <Text style={styles.gender}>Nam</Text>
          <RadioButton
            value="Nam"
            status={gender === "Nam" ? "checked" : "unchecked"}
            onPress={() => setGender("Nam")}
          />
          <Text style={[styles.gender, { marginLeft: 30 }]}>Nữ</Text>
          <RadioButton
            value="Nữ"
            status={gender === "Nữ" ? "checked" : "unchecked"}
            onPress={() => setGender("Nữ")}
          />
        </View>
      </View>
      <TouchableOpacity style={[styles.input, { flexDirection: "row" }]}>
        <View style={[styles.input, { flexDirection: "row" }]}>
          <TextInput
            value={birthday}
            placeholder="Nhập ngày sinh"
            placeholderTextColor="gray"
            editable={false}
            onChangeText={(text) => {
              setbirthday(text);
            }}
          />
          <TouchableOpacity
            style={{ marginTop: 2, marginLeft: 30 }}
            onPress={() => {
              if (icon === "close") {
                setbirthday("");
                seticon("calendar");
              } else {
                showDatePicker();
              }
            }}
          >
            <Ionicons name={icon} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={[styles.input]}>
        <TextInput
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          placeholder="Nhập Email"
          style={styles.input}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          placeholder="Nhập Password"
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
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
          navigation.navigate("Login");
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
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date(2000, 1, 1)}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
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
  gender: {
    marginTop: 8,
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
  date: {
    marginTop: 10,
    color: "black",
    height: 60,
    fontSize: 18,
    borderWidth: 2,
    borderColor: "#0091ff",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingStart: 15,
    backgroundColor: "white",
    flexDirection: "row",
  },
});
