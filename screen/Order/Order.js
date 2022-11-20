import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../color";
import { AuthContext } from "../Home";
import { useIsFocused, useNavigation } from "@react-navigation/native";
const axios = require("axios").default;

export default function Order() {
  const [listOrder, setListOrder] = useState("");
  const [infoUser, setInfoUser] = useState("");
  var { userId } = useContext(AuthContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    axios
      .get(
        "https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" +
          userId +
          "/order"
      )
      .then((todo) => setListOrder(todo.data));
    axios
      .get("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" + userId)
      .then((todo) => setInfoUser(todo.data));
  }, []);

  useEffect(() => {
    //Update  state you want to be updated
    axios
      .get(
        "https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" +
          userId +
          "/order"
      )
      .then((todo) => setListOrder(todo.data));
    axios
      .get("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/user/" + userId)
      .then((todo) => setInfoUser(todo.data));
  }, [isFocused]);

  function currencyFormat(num) {
    let numFormat = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return numFormat;
  }

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtDSHD}>Danh sách hóa đơn</Text>
      </View>
      <View style={styles.viewListOrder}>
        <FlatList
          data={listOrder}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemOrder}>
                <View style={styles.viewItemOrder}>
                  <Text style={styles.txtInfoItemOrder}>Ngày mua: </Text>
                  <Text style={styles.infoItemOrder}>{item.createDate}</Text>
                </View>

                <View>
                  <Text style={styles.txtInfoItemOrder}>Sản phẩm đã mua: </Text>

                  <FlatList
                    data={item.products}
                    renderItem={({ item, index }) => {
                      return (
                        <View>
                          <Text
                            style={[styles.infoItemOrder, { lineHeight: 35 }]}
                          >
                            - {item.name}
                          </Text>
                        </View>
                      );
                    }}
                  ></FlatList>
                </View>
                <View>
                  <Text style={styles.infoItemOrder}>
                    <Text style={styles.txtInfoItemOrder}>Tổng tiền:</Text>{" "}
                    {currencyFormat(item.total)} vnđ
                  </Text>
                </View>
                <View>
                  <Text style={styles.infoItemOrder}>
                    <Text style={styles.txtInfoItemOrder}>
                      Địa chỉ giao hàng:
                    </Text>{" "}
                    {item.address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ paddingBottom: 10 }}>
                    <View style={styles.viewItemOrder}>
                      <Text style={styles.txtInfoItemOrder}>
                        Số điện thoại:{" "}
                      </Text>
                      <Text style={[styles.infoItemOrder]}>{item.phone}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.viewChiTiet}
                    onPress={() =>
                      navigation.navigate("ChiTietHoaDon", {
                        orderDetail: item,
                        infoUser: infoUser,
                      })
                    }
                  >
                    <Text style={styles.chiTiet}>Chi Tiết</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
}
const renderTruncatedFooter = (handlePress) => {
  return (
    <Text style={{ color: "grey", fontSize: 17 }} onPress={handlePress}>
      Đọc thêm
    </Text>
  );
};
const renderRevealedFooter = (handlePress) => {
  return (
    <Text style={{ color: "grey", fontSize: 17 }} onPress={handlePress}>
      Ẩn bớt
    </Text>
  );
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
    justifyContent: "center",
  },
  txtDSHD: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  viewListOrder: {
    height: 550,
  },
  itemOrder: {
    backgroundColor: "rgb(229,229,229)",
    margin: 10,
    paddingLeft: 15,
    borderRadius: 20,
    paddingTop: 10,
    paddingRight: 10,
  },
  viewChiTiet: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orangeMain,
    borderTopLeftRadius: 15,
    marginRight: -10,
  },
  chiTiet: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 20,
  },
  viewItemOrder: {
    flexDirection: "row",
  },
  txtInfoItemOrder: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 35,
  },
  infoItemOrder: {
    fontSize: 20,
    lineHeight: 35,
  },
});
