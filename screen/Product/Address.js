import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../color";
import { Ionicons } from "@expo/vector-icons";

export default function Address({ navigation, route }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const { listItem, tempPrice } = route.params;
  const [errorName, setErrorName] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorStreet, setErrorStreet] = useState("");
  const [errorWard, setErrorWard] = useState("");
  const [errorDistrict, setErrorDistrict] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [validAll, setValidAll] = useState(false);

  function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }
  const testName = (fullName) => {
    var re = /^[a-zA-Z ]{1,30}$/;
    return re.test(removeAscent(fullName));
  };
  const validName = (name) => {
    if (testName(name.trim())) {
      setErrorName("");
      return true;
    } else {
      if (name.trim() == "") setErrorName("Họ tên không được để trống");
      else setErrorName("Họ tên chỉ bao gồm chữ cái");
      return false;
    }
  };
  //----------------------
  const testPhone = (phone) => {
    var re = /^[0-9]{10,11}$/;
    return re.test(phone);
  };
  const validPhone = (phone) => {
    if (testPhone(phone.trim())) {
      setErrorPhone("");
      return true;
    } else {
      if (phone.trim() == "")
        setErrorPhone("Số điện thoại không được để trống");
      else setErrorPhone("Số điện thoại phải gồm 10-11 số");
      return false;
    }
  };
  //----------------------
  const validStreet = (street) => {
    if (street.trim() !== "") {
      setErrorStreet("");
      return true;
    } else {
      setErrorStreet("Không được để trống");
      return false;
    }
  };
  //----------------------
  const validWard = (ward) => {
    if (ward.trim() !== "") {
      setErrorWard("");
      return true;
    } else {
      setErrorWard("Không được để trống");
      return false;
    }
  };
  //----------------------
  const validDistrict = (district) => {
    if (district.trim() !== "") {
      setErrorDistrict("");
      return true;
    } else {
      setErrorDistrict("Không được để trống");
      return false;
    }
  };
  //----------------------
  const validCity = (city) => {
    if (city.trim() !== "") {
      setErrorCity("");
      return true;
    } else {
      setErrorCity("Không được để trống");
      return false;
    }
  };
  //----------------------
  useEffect(() => {
    if (
      name != "" &&
      phone != "" &&
      street != "" &&
      ward != "" &&
      district != "" &&
      city != ""
    ) {
      if (
        validName(name) ||
        validPhone(phone) ||
        validStreet(street) ||
        validWard(ward) ||
        validDistrict(district) ||
        validCity(city)
      )
        setValidAll(true);
      else setValidAll(false);
    } else setValidAll(false);
  }, [name, phone, street, ward, district, city]);
  //----------------------
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Địa chỉ nhận hàng</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.label}>Họ tên</Text>
            <View>
              <TextInput
                style={styles.txtInput}
                value={name}
                onChangeText={(text) => {
                  setName(text), validName(text);
                }}
              />
              <Text style={{ color: "red" }}>{errorName}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Số điện thoại</Text>
            <View>
              <TextInput
                style={styles.txtInput}
                value={phone}
                onChangeText={(text) => {
                  setPhone(text), validPhone(text);
                }}
              />
              <Text style={{ color: "red" }}>{errorPhone}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Địa chỉ</Text>
            <View></View>
          </View>
          <View style={styles.subAddress}>
            <View style={[styles.row, { marginHorizontal: 15 }]}>
              <Text style={[styles.label, { color: "grey" }]}>
                Số nhà, đường...
              </Text>
              <View>
                <TextInput
                  style={styles.txtSubAdd}
                  value={street}
                  onChangeText={(text) => {
                    setStreet(text), validStreet(text);
                  }}
                />
                <Text style={{ color: "red" }}>{errorStreet}</Text>
              </View>
            </View>
            <View style={[styles.row, { marginHorizontal: 15 }]}>
              <Text style={[styles.label, { color: "grey" }]}>
                Phường, xã, thị trấn...
              </Text>
              <View>
                <TextInput
                  style={styles.txtSubAdd}
                  value={ward}
                  onChangeText={(text) => {
                    setWard(text), validWard(text);
                  }}
                />
                <Text style={{ color: "red" }}>{errorWard}</Text>
              </View>
            </View>
            <View style={[styles.row, { marginHorizontal: 15 }]}>
              <Text style={[styles.label, { color: "grey" }]}>
                Quận, huyện...
              </Text>
              <View>
                <TextInput
                  style={styles.txtSubAdd}
                  value={district}
                  onChangeText={(text) => {
                    setDistrict(text), validDistrict(text);
                  }}
                />
                <Text style={{ color: "red" }}>{errorDistrict}</Text>
              </View>
            </View>
            <View style={[styles.row, { marginHorizontal: 15 }]}>
              <Text style={[styles.label, { color: "grey" }]}>
                Tỉnh, thành phố...
              </Text>
              <View>
                <TextInput
                  style={styles.txtSubAdd}
                  value={city}
                  onChangeText={(text) => {
                    setCity(text), validCity(text);
                  }}
                />
                <Text style={{ color: "red" }}>{errorCity}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {validAll ? (
        <TouchableOpacity
          style={styles.btnOrder}
          onPress={() => {
            navigation.navigate("ProcessingOrder", {
              listItem: listItem,
              tempPrice: tempPrice,
              address: {
                name: name,
                phone: phone,
                location:
                  street.trim() +
                  ", " +
                  ward.trim() +
                  ", " +
                  district.trim() +
                  ", " +
                  city.trim(),
              },
            });
          }}
        >
          <Text style={styles.txtOrder}>Xác nhận</Text>
        </TouchableOpacity>
      ) : (
        <View
          style={[styles.btnOrder, { backgroundColor: colors.lightOrange }]}
        >
          <Text style={styles.txtOrder}>Xác nhận</Text>
        </View>
      )}
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
    flexDirection: "row",
    backgroundColor: colors.orangeMain,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  info: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  txtInput: {
    borderWidth: 0.8,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
    width: 250,
  },
  btnOrder: {
    backgroundColor: colors.orangeMain,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  txtOrder: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  subAddress: {
    padding: 10,
  },
  txtSubAdd: {
    borderWidth: 0.8,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
    width: 180,
  },
});
