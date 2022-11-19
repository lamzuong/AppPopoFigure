import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../color";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ChiTietHoaDon() {
  const [orderDetail, setOrderDetail] = useState("");
  const [info, setInfo] = useState("");
  const [tongThanhTien, setTongThanhTien] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    setInfo(route.params.infoUser);
    setOrderDetail(route.params.orderDetail);

    let tongTemp = 0;
    route.params.orderDetail.products.forEach((e) => {
      tongTemp += e.price * e.amount;
    });

    setTongThanhTien(tongTemp);
  }, []);

  function currencyFormat(num) {
    let numFormat = parseInt(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return numFormat;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Order")}>
          <Ionicons name="arrow-back-outline" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.txtCTHD}>Hóa đơn</Text>
        <Text></Text>
      </View>
      <View style={styles.viewInfoUser}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.info}>
            <Text style={styles.txtInfo}>Tên khách hàng: </Text>
            {info.fullname}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.info}>
            <Text style={styles.txtInfo}>Số điện thoại: </Text>
            {orderDetail.phone}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.info}>
            <Text style={styles.txtInfo}>Ngày mua: </Text>
            {orderDetail.createDate}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.info}>
            <Text style={styles.txtInfo}>Địa chỉ nhận hàng: </Text>
            {orderDetail.address}
          </Text>
        </View>
      </View>
      <View style={styles.itemProduct}>
        <FlatList
          data={orderDetail.products}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <View style={{ flex: 0.35, height: 130 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ flex: 1 }}
                    resizeMode="contain"
                  ></Image>
                </View>
                <View style={{ flex: 0.72 }}>
                  <View>
                    <Text style={styles.txtInfoProduct}>{item.name}</Text>
                  </View>
                  <View style={styles.priceAndAmount}>
                    <Text style={styles.infoProduct}>
                      {currencyFormat(item.price)} đ
                    </Text>
                    <Text style={styles.infoAmount}>
                      x{currencyFormat(item.amount)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
      <View style={styles.viewBottomThanhToan}>
        <View style={styles.thanhToanTien}>
          <Text style={styles.txtThanhToan}>Tổng tiền hàng:</Text>
          <Text style={styles.txtThanhToan}>
            {currencyFormat(tongThanhTien)} đ
          </Text>
        </View>
        <View style={styles.thanhToanTien}>
          <Text style={styles.txtThanhToan}>Phí vận chuyển:</Text>
          <Text style={styles.txtThanhToan}>{currencyFormat(25000)} đ</Text>
        </View>
        <View style={styles.thanhToanTien}>
          <Text style={styles.txtTongTien}>Thành tiền:</Text>
          <Text style={styles.txtTongTien}>
            {currencyFormat(tongThanhTien + 50000)} đ
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 65,
    flexDirection: "row",
    backgroundColor: colors.orangeMain,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },

  txtCTHD: {
    fontSize: 30,
    color: "white",
  },
  viewInfoUser: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  txtInfo: {
    lineHeight: 35,
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    lineHeight: 25,
    fontSize: 18,
  },
  txtInfoProduct: {
    fontSize: 17,
    lineHeight: 25,
    paddingBottom: 10,
  },
  infoProduct: {
    fontSize: 20,
    color: colors.orangeMain,
    fontWeight: "bold",
  },
  itemProduct: {
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 300,
    backgroundColor: "white",
  },
  infoAmount: {
    fontSize: 17,
  },
  txtThanhToan: {
    fontSize: 19,
  },
  txtTongTien: {
    fontSize: 20,
    fontWeight: "bold",
  },
  thanhToanTien: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 35,
  },
  viewBottomThanhToan: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
    paddingTop: 10,
  },
  priceAndAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
