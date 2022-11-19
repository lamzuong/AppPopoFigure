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
  Modal,
  TouchableWithoutFeedback,
  Button,
  Alert,
} from "react-native";
import { colors } from "../color";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const axios = require("axios").default;

export default function UpdateProfile() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoUser, setInfoUser] = useState("");
  const [imageUser, setImageUser] = useState(img);
  const [birthday, setbirthday] = useState("");
  const [gender, setGender] = useState("Nam");
  const [ten, setTen] = useState("");
  const [icon, seticon] = useState("calendar");
  const [imageUpdate, setImageUpdate] = useState(img);
  const [render, setRender] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  let img = route.params.avatar;
  useEffect(() => {
    setTen(route.params.fullname);
    setInfoUser(route.params);
    setGender(route.params.gender);
    setbirthday(route.params.birthday);
    setImageUser(route.params.avatar);
    setImageUpdate(route.params.avatar);
  }, []);

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

  function updateProfileUser() {
    if (!birthday.trim() || !ten.trim()) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    let imageBase64 = `data:image/jpeg;base64,${imageUpdate.base64}`;
    console.log("startUpdate");
    axios
      .put(
        "https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" + infoUser.id,
        {
          fullname: ten,
          gender: gender,
          avatar: imageBase64,
          birthday: birthday,
        }
      )
      .then(() => {
        setRender(!render);
        console.log("EndUpdate");
        navigation.navigate("Profile");
      })
      .catch((err) => {
        Alert.alert("Avatar có dung lượng quá lớn!");
        return;
      });
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.canceled) {
      setImageUser(result.assets[0].uri);
      setImageUpdate(result.assets[0]);
      setRender(!render);
    }
  };
  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImageUser(result.assets[0].uri);
      setImageUpdate(result.assets[0]);
      setRender(!render);
    } else {
      console.log("lỗi");
    }
  };
  return (
    <View style={styles.root}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  showImagePicker();
                  setModalVisible(!modalVisible);
                }}
              >
                <View styles={{ width: "100%" }}>
                  <FontAwesome
                    name="image"
                    size={25}
                    color="black"
                    style={{ margin: 10, marginTop: 12 }}
                  />
                </View>
                <View styles={{ width: "100%" }}>
                  <Text style={styles.chupanh}>Chọn ảnh từ thư viện</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  openCamera();
                  setModalVisible(!modalVisible);
                }}
              >
                <View styles={{ width: "100%" }}>
                  <AntDesign
                    name="camera"
                    size={25}
                    color="black"
                    style={{ margin: 10, marginTop: 12 }}
                  />
                </View>
                <View>
                  <Text style={styles.chupanh}>Chụp ảnh</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="arrow-back-outline" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.profile}>Cập nhật thông tin</Text>
        <Text></Text>
      </View>

      <View style={styles.viewAvatarAndName}>
        <View style={styles.avatar}>
          <Image source={{ uri: imageUser }} style={styles.imageAvatar}></Image>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <AntDesign
              name="camera"
              size={25}
              color="black"
              style={styles.camera}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.input]}>
        <TextInput
          value={ten}
          onChangeText={(text) => setTen(text)}
          placeholder="Nhập Tên"
          style={[styles.input4]}
        />
      </View>

      <TouchableOpacity style={[styles.input, { flexDirection: "row" }]}>
        <View style={[styles.input3]}>
          <TextInput
            value={birthday}
            placeholderTextColor="gray"
            placeholder="Chọn ngày sinh"
            editable={false}
            style={{ color: "black", fontSize: 20 }}
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
      <View style={styles.input}>
        <View style={styles.input2}>
          <Text style={[styles.gender, { marginRight: 20 }]}>Giới tính: </Text>

          <Text style={styles.gender}>Nam</Text>
          <RadioButton
            value="Nam"
            status={gender === "Nam" ? "checked" : "unchecked"}
            onPress={() => setGender("Nam")}
          />
          <Text style={[styles.gender, { marginLeft: 30 }]}>Nữ</Text>
          <RadioButton
            style={{}}
            value="Nữ"
            status={gender === "Nữ" ? "checked" : "unchecked"}
            onPress={() => setGender("Nữ")}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.container}
        onPress={() => updateProfileUser()}
      >
        <Text style={styles.text}>Cập nhật thông tin</Text>
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
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  profile: {
    fontSize: 25,
    color: "white",
  },
  chupanh: {
    fontSize: 20,
    paddingVertical: 10,
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

  input: {
    backgroundColor: "white",
    width: "100%",
    Color: "#e8e8e8",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 8,
    fontSize: 20,
  },
  input2: {
    backgroundColor: "white",
    width: "100%",
    Color: "#e8e8e8",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 8,
    fontSize: 20,
    flexDirection: "row",
  },
  input3: {
    backgroundColor: "white",
    width: "100%",
    Color: "#e8e8e8",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 8,
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.orangeMain,
  },
  input4: {
    backgroundColor: "white",
    width: "100%",
    Color: "#e8e8e8",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 8,
    fontSize: 20,
    borderWidth: 1,
    borderColor: colors.orangeMain,
  },

  gender: {
    marginTop: 5,
    fontSize: 20,
  },
  camera: {
    margin: 10,
    marginTop: 12,
    bottom: 25,
    backgroundColor: "white",
  },
  container: {
    padding: 15,
    marginVertical: 5,
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: colors.orangeMain,
    marginTop: 20,
    flexDirection: "row",
    marginHorizontal: 20,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  viewAvatarAndName: {
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 10,
  },
  avatar: {
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageAvatar: {
    marginTop: 30,
    height: 200,
    width: 200,
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: "white",
  },
  cam: {
    borderColor: "grey",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 85,
    aspectRatio: 1,
    padding: 1,
    backgroundColor: "white",
    position: "absolute",
    alignSelf: "center",
    bottom: -12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -180,
  },
  modalView: {
    width: "70%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
});
