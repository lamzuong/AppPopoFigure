import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../color";
import { Ionicons } from "@expo/vector-icons";
import ReadMore from "react-native-read-more-text";
const axios = require("axios").default;

export default function ProductDetail({ route, navigation }) {
  const { item } = route.params;
  const [cart, setCart] = useState([]);
  const [rerender, setRerender] = useState(false);
  const id = 1;
  useEffect(() => {
    axios
      .get("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/cart/" + id)
      .then((todo) => setCart(todo.data.listProduct));
  }, [rerender]);
  function addToCart() {
    var duplicate = false;
    cart.forEach((e) => {
      if (e.id == item.id) {
        e.amount++;
        duplicate = true;
        axios
          .put("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/cart/" + id, {
            listProduct: cart,
          })
          .then(setRerender(!rerender));
      }
    });
    if (duplicate == false) {
      var obj = item;
      obj["amount"] = 1;
      axios
        .put("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/cart/" + id, {
          listProduct: [...cart, obj],
        })
        .then(setRerender(!rerender));
    }
    ToastAndroid.show("Thêm sản phẩm thành công!", ToastAndroid.SHORT);
  }
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
          {item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
            " đ"}
        </Text>
        <Text style={styles.titleGeneral}>Thông tin chi tiết</Text>
        <View style={styles.infoDetail}>
          <View style={styles.spaceRow}>
            <Text style={styles.labelProduct}>Nhà sản xuất</Text>
            <Text style={styles.descProduct}>{item.brand}</Text>
          </View>
          <Text style={styles.labelProduct}>Mô tả</Text>
          <View style={{ height: 8 }}></View>
          <ReadMore
            numberOfLines={5}
            renderTruncatedFooter={renderTruncatedFooter}
            renderRevealedFooter={renderRevealedFooter}
          >
            <Text style={styles.descProduct}>{item.description}</Text>
          </ReadMore>
        </View>

        <View style={{ height: 20 }}></View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => {
            addToCart();
          }}
        >
          <Text style={styles.txtAdd}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
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
  spaceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
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
    fontSize: 17,
    marginTop: 8,
  },
  labelProduct: {
    fontSize: 17,
    fontWeight: "bold",
  },
  titleGeneral: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  infoDetail: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
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
