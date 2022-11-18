import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { colors } from "../color";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import ReadMore from "react-native-read-more-text";

export default function ProductDetail({ route, navigation }) {
  const { item } = route.params;
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
        <Text style={styles.title}>Thông tin sản phẩm</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Ionicons name="cart-sharp" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity>
          <Image source={{ uri: item.image }} style={styles.imgProduct} />
        </TouchableOpacity>
        <Text style={styles.nameProduct}>{item.name}</Text>
        <Text style={styles.priceProduct}>
          ${" "}
          {item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
            " đ"}
        </Text>
        <Text style={styles.titleGeneral}>Thông tin</Text>
        <View style={styles.contentGeneral}>
          <View style={styles.spaceRow}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Nhà sản xuất
            </Text>
            <Text>{item.brand}</Text>
          </View>
          <View style={styles.spaceRow}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Số lượng có sẵn
            </Text>
            <Text>{item.amount}</Text>
          </View>
        </View>
        <Text style={styles.titleGeneral}>Mô tả</Text>
        <View style={{ height: 8 }}></View>
        <ReadMore
          numberOfLines={5}
          renderTruncatedFooter={renderTruncatedFooter}
          renderRevealedFooter={renderRevealedFooter}
        >
          <Text style={styles.descProduct}>{item.description}</Text>
        </ReadMore>
        <View style={{ height: 20 }}></View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        <TouchableOpacity style={styles.btnAdd}>
          <Text style={styles.txtAdd}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const renderTruncatedFooter = (handlePress) => {
  return (
    <Text style={{ color: "grey" }} onPress={handlePress}>
      Đọc thêm
    </Text>
  );
};
const renderRevealedFooter = (handlePress) => {
  return (
    <Text style={{ color: "grey" }} onPress={handlePress}>
      Ẩn bớt
    </Text>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  spaceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
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
  imgProduct: {
    height: 250,
    resizeMode: "contain",
  },
  nameProduct: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  priceProduct: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.orangeMain,
    marginTop: 10,
  },
  descProduct: {
    fontSize: 15,
    marginTop: 8,
  },
  titleGeneral: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  contentGeneral: {
    backgroundColor: colors.lightGrey,
    marginTop: 8,
    padding: 10,
    borderRadius: 10,
  },
  btnAdd: {
    backgroundColor: colors.orangeMain,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  txtAdd: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
