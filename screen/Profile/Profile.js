import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../color";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AuthContext } from "../Home";

const axios = require("axios").default;

export default function Profile() {
  const [infoUser, setInfoUser] = useState("");
  const navigation = useNavigation();
  var { userId } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    axios
      .get("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" + userId)
      .then((todo) => setInfoUser(todo.data));
  }, []);

  useEffect(() => {
    //Update  state you want to be updated
    axios
      .get("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" + userId)
      .then((todo) => setInfoUser(todo.data));
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text></Text>
        <Text style={styles.profile}>Hồ sơ</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("UpdateProfile", infoUser)}
        >
          <FontAwesome5 name="user-edit" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewAvatarAndName}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: infoUser.avatar }}
            style={styles.imageAvatar}
          ></Image>
        </View>
        <View style={styles.viewName}>
          <Text style={styles.infoName}>{infoUser.fullname}</Text>
        </View>
      </View>
      <View style={styles.viewBottom}>
        
          <View style={styles.viewGenderBirthday}>
          <Text style={styles.genderBirthday}>Ngày sinh: </Text>
          <Text style={styles.infoGenderBirthday}>{infoUser.birthday}</Text>
        </View>
        <View style={styles.viewGenderBirthday}>
          <Text style={styles.genderBirthday}>Giới tính: </Text>
          <Text style={styles.infoGenderBirthday}>{infoUser.gender}</Text>
        </View>
      
        <TouchableOpacity
          style={styles.dangxuat}
          onPress={() => navigation.navigate("Welcome")}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.selection}>Đăng xuất </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(229,229,229)",
  },
  header: {
    height: 65,
    backgroundColor: colors.orangeMain,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  profile: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  viewAvatarAndName: {
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 10,
  },
  avatar: {
    height: 210,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageAvatar: {
    height: 200,
    width: 200,
    borderRadius: 40,
  },
  viewName: {
    height: 50,
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
    height: 50,
    paddingTop: 20,
  },
  genderBirthday: {
    fontSize: 22,
    fontWeight: "bold",
    width: 120,
  },
  infoGenderBirthday: {
    fontSize: 22,
    width:245
  },
  viewlist: {
    padding: 5,
    backgroundColor: "rgb(229,229,229)",
    marginHorizontal: 20,
    borderRadius: 10,
  },

  viewBottom: {
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 20,
  },
  selection: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingVertical: 7,
    color: "white",
    
  },
  dangxuat: {
    
    padding: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 80,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orangeMain,
  },
});
