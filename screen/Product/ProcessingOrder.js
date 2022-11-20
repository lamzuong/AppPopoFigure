import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../color";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import ReadMore from "react-native-read-more-text";
import { AuthContext } from "../Home";

const axios = require("axios").default;
export default function ProcessingOrder({ navigation, route }) {
  const { listItem, tempPrice, ListItemInCartOfUser } = route.params;
  const transferFee = 25000;
  const [address, setAddress] = useState("");
  var { userId } = useContext(AuthContext);
  useEffect(() => {
    if (route.params.address != null) {
      setAddress(route.params.address);
    }
  });

  function handleDatHang() {
    let date = new Date();
    let dateFormat =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    //Thêm vào order

    axios
      .post(
        "https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" +
          userId +
          "/order",
        {
          createDate: dateFormat,
          products: listItem,
          address: address.location,
          nameReceiver: address.name,
          phone: address.phone,
          total: parseInt(tempPrice),
        }
      )
      .then((todo) => {
        let idThem = todo.data.id;
        //Xóa khỏi cart
        axios
          .get("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/cart/" + userId)
          .then((todo2) => {
            let listCartTemp = todo2.data.listProduct;
            let listProductFinal = [];
            for (let index = 0; index < listCartTemp.length; index++) {
              let element = listCartTemp[index];
              if (!listItem.find((e) => e.id == element.id)) {
                listProductFinal.push(element);
              }
            }
            axios
              .put(
                "https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/cart/" +
                  userId,
                {
                  listProduct: listProductFinal,
                }
              )
              .then(() => {
                //Chuyển tới checkout
                axios
                  .get(
                    "https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" +
                      userId +
                      "/order/" +
                      idThem
                  )
                  .then((todo3) => {
                    let orderDetail = todo3.data;
                    navigation.navigate("Checkout", {
                      orderDetail: orderDetail,
                      nameReceiver: address.name,
                    });
                  });
              })
              .catch((errr) => console.log(errr));
          });
      })
      .catch((er) => console.log(er));
  }
  const handleUpdate = async (id, listProduct) => {
    await axios
      .put("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/cart/" + id, {
        listProduct: listProduct,
      })
      .then(setRerender(!rerender));
  };

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
        <Text style={styles.title}>Tiến hành đặt hàng</Text>
        <View style={{ width: 24 }}></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoUser}>
          <View style={styles.row}>
            <View style={styles.row}>
              <Entypo name="location-pin" size={24} color="black" />
              <Text style={styles.txtInfo}>Địa chỉ nhận hàng</Text>
            </View>
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                navigation.navigate("Address", {
                  listItem: listItem,
                  tempPrice: tempPrice,
                });
              }}
            >
              <AntDesign name="edit" size={20} color={colors.orangeMain} />
              <Text style={{ fontWeight: "bold", color: colors.orangeMain }}>
                CHỈNH SỬA
              </Text>
            </TouchableOpacity>
          </View>
          {address == "" ? (
            <View style={{ padding: 5 }}>
              <Text style={styles.txtInfo}>{"<Chưa có địa chỉ>"}</Text>
            </View>
          ) : (
            <View style={{ padding: 5 }}>
              <Text style={styles.txtInfo}>{address.name}</Text>
              <Text style={styles.txtInfo}>{address.phone}</Text>
              <Text style={styles.txtInfo}>{address.location}</Text>
            </View>
          )}
        </View>
        {listItem.map((item, index) => (
          <View style={styles.items} key={index}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <View style={{ marginLeft: 10, width: "70%" }}>
              <ReadMore
                numberOfLines={2}
                renderTruncatedFooter={renderTruncatedFooter}
                renderRevealedFooter={renderRevealedFooter}
              >
                <Text style={{ fontSize: 15 }}>{item.name}</Text>
              </ReadMore>
              <View style={styles.row}>
                <Text style={styles.priceProduct}>
                  {item.price
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ"}
                </Text>
                <Text>x{item.amount}</Text>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.infoUser}>
          <View style={styles.row}>
            <Text style={styles.txtInfo}>Tổng tiền hàng</Text>
            <Text style={styles.txtInfo}>
              {tempPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
                " đ"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.txtInfo, { marginTop: 10 }]}>
              Phí vận chuyển
            </Text>
            <Text style={[styles.txtInfo, { marginTop: 10 }]}>
              {transferFee
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.txtInfo, styles.txtInfoBonus]}>
              Thành tiền
            </Text>
            <Text style={[styles.txtInfo, styles.txtInfoBonus]}>
              {(transferFee + tempPrice)
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ"}
            </Text>
          </View>
        </View>
      </ScrollView>
      {address == "" ? (
        <View
          style={[styles.btnOrder, { backgroundColor: colors.lightOrange }]}
          onPress={() => {}}
        >
          <Text style={styles.txtOrder}>Đặt hàng</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.btnOrder}
          onPress={() => {
            handleDatHang();
          }}
        >
          <Text style={styles.txtOrder}>Đặt hàng</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const renderTruncatedFooter = (handlePress) => {
  return null;
};
const renderRevealedFooter = (handlePress) => {
  return null;
};
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
  infoUser: {
    padding: 10,
    backgroundColor: colors.lightGrey,
    margin: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtInfo: {
    fontSize: 16,
  },
  txtInfoBonus: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 18,
  },
  items: {
    flexDirection: "row",
    marginVertical: 7,
    paddingHorizontal: 10,
  },
  priceProduct: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.orangeMain,
    marginTop: 5,
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
});
