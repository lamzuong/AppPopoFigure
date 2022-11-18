import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  EvilIcons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "../color";
import ItemProduct from "../Product/ItemProduct";

import { useNavigation } from "@react-navigation/native";

// import axios from "axios";


const axios = require("axios").default;

const logo ="https://res.cloudinary.com/daoyryngu/image/upload/v1668668980/logoPoPo_k3safb.png"
const idUser = 1;
export default function Profile() {
  const navigation = useNavigation();
  const [infoUser, setInfoUser] = useState("");
  useEffect(() => {
    axios
      .get("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" + idUser)
      .then((todo) => setInfoUser(todo.data));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profile}>Hồ sơ</Text>

      </View>
      <View style={styles.avatar}>
        <Image
          source={{ uri: infoUser.avatar }}
          style={styles.imageAvatar}
        ></Image>
      </View>
      <View style={styles.viewName}>
        <Text style={styles.infoName}>{infoUser.fullname}</Text>
      </View>
      <View style={styles.viewGenderBirthday}>
        <Text style={styles.genderBirthday}>Giới tính: </Text>
        <Text style={styles.infoGenderBirthday}>{infoUser.gender}</Text>
      </View>
      <View style={styles.viewGenderBirthday}>
        <Text style={styles.genderBirthday}>Ngày sinh: </Text>
        <Text style={styles.infoGenderBirthday}>{infoUser.birthday}</Text>
      </View>

      <TouchableOpacity
        style={styles.viewlist}
        onPress={() => navigation.navigate("Cart",{infoUser})}
      >
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="cart-sharp"
            size={45}
            color={colors.orangeMain}
            style={{ borderRadius: 5 }}
          />
          <Text style={styles.selection}>Giỏ hàng</Text>
        </View>
        <MaterialCommunityIcons name="greater-than" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewlist}>
        <View style={{ flexDirection: "row" }}>
          <AntDesign name="setting" size={45} color={colors.orangeMain} />
          <Text style={styles.selection}>Cài đặt</Text>
        </View>
        <MaterialCommunityIcons name="greater-than" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.viewlist,
          { marginTop: 50, justifyContent: "center", alignItems: "center" },
        ]}
        onPress={()=>navigation.navigate("Welcome")}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.selection}>Đăng xuất </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 65,
    backgroundColor: colors.orangeMain,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    flexDirection:"row",
    alignItems:"center"
  },

  profile: {
    fontSize: 25,
    color: "white",
  },
  avatar: {
    height: 170,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageAvatar: {
    height: 150,
    width: 150,
    borderRadius: 40,
  },
  viewName: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  infoName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  viewGenderBirthday: {
    paddingLeft: 20,
    flexDirection: "row",
    height: 30,
  },
  genderBirthday: {
    fontSize: 18,
    fontWeight: "bold",
    width: 100,
  },
  infoGenderBirthday: {
    fontSize: 18,
  },
  viewlist: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "rgb(229,229,229)",
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  selection: {
    fontSize: 25,
    paddingLeft: 20,
    paddingTop: 4,
  },
});
