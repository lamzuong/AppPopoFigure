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
import React from "react";
import Swiper from "react-native-swiper";
import { colors } from "./color";

export default function Welcome({ navigation }) {
  return (
    <Swiper showsPagination={false}>
      <View style={styles.slide1}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/daoyryngu/image/upload/v1668668980/logoPoPo_k3safb.png",
          }}
          style={{
            width: "100%",
            height: "50%",

            borderWidth: 1,
          }}
        />
      </View>
      <View style={styles.slide2}>
        <StatusBar></StatusBar>
        <Image
          source={{
            uri: "https://m.media-amazon.com/images/M/MV5BMWM4Njg2MjUtODU3OS00MGNmLWIyNTctZGZkNTdjN2JhNmU2XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_UY1200_CR85,0,630,1200_AL_.jpg",
          }}
          style={{
            width: "100%",
            height: "75%",
            resizeMode: "contain",
          }}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.txt}>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { marginTop: 20 }]}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.txt}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide2: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 30,
  },
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    marginBottom: 20,
    margin: 10,
    maxHeight: 100,
    maxWidth: 100,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff9166",
  },
  title: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
  },
  logo: {
    marginTop: 20,
    marginBottom: 30,
    maxHeight: 80,
    maxWidth: 80,
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
  btn: {
    backgroundColor: "#ff9166",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: "6%",
    borderRadius: 20,
  },
  txt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
