import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../color";
import ItemProduct from "../Product/ItemProduct";

import { useNavigation } from "@react-navigation/native";

const dataTemp = [
  {
    id: "id1",
    diaChi: "217/11/3/4 Nguyễn Văn Bảo,Gò Vấp, TP.Hồ Chí Minh",
    sdt: "0123456789",
    ngayMua: "17/11/2022",
    danhSachMua: [
      { ten: "sp1fffffffffffffffffhgfsdfsdfsđsfdfffffffffffffffffffffff" },
      { ten: "sp2" },
      { ten: "sp3" },
      { ten: "sp4" },
    ],
  },
  {
    id: "id2",
    diaChi: "217/11/3/4 Nguyễn Văn Bảo,Gò Vấp,TP.Hồ Chí Minh",
    sdt: "0123456789",
    ngayMua: "17/11/2022",
    danhSachMua: [
      { ten: "sp1" },
      { ten: "sp2" },
      { ten: "sp3" },
      { ten: "sp4" },
    ],
  },
  {
    id: "id3",
    diaChi: "217/11/3/4 Nguyễn Văn Bảo,Gò Vấp,TP.Hồ Chí Minh",
    sdt: "0123456789",
    ngayMua: "17/11/2022",
    danhSachMua: [
      { ten: "sp1" },
      { ten: "sp2" },
      { ten: "sp3" },
      { ten: "sp4" },
    ],
  },
  {
    id: "id4",
    diaChi: "217/11/3/4 Nguyễn Văn Bảo,Gò Vấp,TP.Hồ Chí Minh",
    sdt: "0123456789",
    ngayMua: "17/11/2022",
    danhSachMua: [
      { ten: "sp1" },
      { ten: "sp2" },
      { ten: "sp3" },
      { ten: "sp4" },
    ],
  },
  {
    id: "id5",
    diaChi: "217/11/3/4 Nguyễn Văn Bảo,Gò Vấp,TP.Hồ Chí Minh",
    sdt: "0123456789",
    ngayMua: "17/11/2022",
    danhSachMua: [
      { ten: "sp1" },
      { ten: "sp2" },
      { ten: "sp3" },
      { ten: "sp4" },
    ],
  },
  {
    id: "id6",
    diaChi: "217/11/3/4 Nguyễn Văn Bảo,Gò Vấp,TP.Hồ Chí Minh",
    sdt: "0123456789",
    ngayMua: "17/11/2022",
    danhSachMua: [
      { ten: "sp1" },
      { ten: "sp2" },
      { ten: "sp3" },
      { ten: "sp4" },
    ],
  },
  {
    id: "id7",
    diaChi: "217/11/3/4 Nguyễn Văn Bảo,Gò Vấp,TP.Hồ Chí Minh",
    sdt: "0123456789",
    ngayMua: "17/11/2022",
    danhSachMua: [
      { ten: "sp1" },
      { ten: "sp2" },
      { ten: "sp3" },
      { ten: "sp4" },
    ],
  },
  {
    id: "id8",
    diaChi:
      "217/11/3/4 Nguyễn Văn Bảo,GòVấpàgafdgadfgadfgfsdfsdfsgdbnjkfdbdjasdfghjkjhgfd fasdfas",
    sdt: "0123456789",
    ngayMua: "17/11/2022",
    danhSachMua: [
      { ten: "sp1", gia: "100" },
      { ten: "sp2", gia: "100" },
      { ten: "sp3", gia: "100" },
      { ten: "sp4", gia: "100" },
    ],
  },
];

export default function Order() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtDSHD}>Danh sách hóa đơn</Text>
      </View>
      <View style={styles.viewListOrder}>
        <FlatList
          data={dataTemp}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemOrder}>
                <View style={styles.viewItemOrder}>
                  <Text style={styles.txtInfoItemOrder}>Ngày mua: </Text>
                  <Text style={styles.infoItemOrder}>{item.ngayMua}</Text>
                </View>

                <View>
                  <Text style={styles.txtInfoItemOrder}>Sản phẩm đã mua: </Text>
                  <FlatList
                    data={item.danhSachMua}
                    renderItem={({ item, index }) => {
                      return (
                        <View>
                          <Text style={styles.infoItemOrder}>- {item.ten}</Text>
                        </View>
                      );
                    }}
                  ></FlatList>
                 
                </View>
                <View>
                  <Text style={styles.infoItemOrder}>
                    <Text style={styles.txtInfoItemOrder}>
                      Địa chỉ giao hàng:
                    </Text>{" "}
                    {item.diaChi}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View style={styles.viewItemOrder}>
                      <Text style={styles.txtInfoItemOrder}>
                        Số điện thoại:{" "}
                      </Text>
                      <Text
                        style={[styles.infoItemOrder, { paddingBottom: 20 }]}
                      >
                        {item.sdt}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.viewChiTiet}>
                    <Text style={styles.chiTiet}>Chi Tiết</Text>
                  </View>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
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
    justifyContent: "center",
  },
  txtDSHD: {
    fontSize: 30,
    color: "white",
  },
  viewListOrder: {
    height: 550,
  },
  itemOrder: {
    backgroundColor: "rgb(229,229,229)",
    margin: 10,
    paddingLeft: 10,
    borderRadius: 20,
  },
  viewChiTiet: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orangeMain,
    borderTopLeftRadius: 15,
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
  },
  infoItemOrder: {
    fontSize: 20,
  },
});
