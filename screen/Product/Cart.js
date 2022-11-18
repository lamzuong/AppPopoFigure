import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Ionicons, EvilIcons, AntDesign } from "@expo/vector-icons";
import { colors } from "../color";
import { useIsFocused } from "@react-navigation/native";
import { ListOrderContext } from "./Product";
import ReadMore from "react-native-read-more-text";
import { Checkbox } from "react-native-paper";
const axios = require("axios").default;

export default function Cart({ navigation }) {
  const [listRender, setListRender] = useState([]);
  const [hideDelete, setHideDelete] = useState(false);
  var { listOrder } = useContext(ListOrderContext);
  useEffect(() => {
    setListRender(listOrder);
    setHideDelete(true);
  }, [rerender]);

  const [itemChoose, setItemChoose] = useState([]);
  const isItemSelected = (item) => {
    // xem có id trong itemChoose không, trả về true false
    return itemChoose.some((selectedItem) => selectedItem.id === item.id);
  };
  const onItemPress = (item) => {
    if (isItemSelected(item)) {
      // remove it from selected
      // Lấy những phần tử khác item.id trong mảng có sẵn
      setItemChoose(
        itemChoose.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setItemChoose([...itemChoose, item]);
    }
  };

  const [tempPrice, setTempPrice] = useState(0);
  useEffect(() => {
    var priceNow = 0;
    itemChoose.forEach((e) => {
      priceNow += e.amount * e.price;
    });
    setTempPrice(priceNow);
    console.log(itemChoose.length);
  }, [itemChoose.length, rerender]);

  const [rerender, setRerender] = useState(false);
  const handleUpdate = async (id, listProduct) => {
    await axios
      .put("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/cart/" + id, {
        listProduct: listProduct,
      })
      .then(setRerender(!rerender));
    setRerender(!rerender);
  };
  function add(index) {
    var amount = Number.parseInt(listRender[index].amount) + 1;
    listOrder[index].amount = amount + "";
    handleUpdate(1, listRender);
  }
  function sub(index) {
    var amountNow = Number.parseInt(listRender[index].amount);
    if (amountNow == 1) {
    } else {
      var amount = Number.parseInt(listRender[index].amount) - 1;
      listOrder[index].amount = amount + "";
      handleUpdate(1, listRender);
    }
  }
  //-----------------------------
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
        <Text style={styles.title}>Giỏ hàng</Text>
        <View style={{ width: 24 }}></View>
      </View>
      {listRender.length > 0 ? (
        <View style={styles.titleItems}>
          <Text style={styles.txtTitleItems}>Thông tin sản phẩm</Text>
          <TouchableOpacity
            onPress={() => {
              setHideDelete(!hideDelete);
            }}
          >
            {hideDelete ? (
              <Text style={styles.txtTitleItems}>Sửa</Text>
            ) : (
              <Text style={styles.txtTitleItems}>Xong</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        {listRender.map((item, index) => (
          <View style={styles.items} key={index}>
            <View style={styles.subItems}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  status={isItemSelected(item) ? "checked" : "unchecked"}
                  color={colors.orangeMain}
                  onPress={() => {
                    onItemPress(item);
                  }}
                />
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100, resizeMode: "contain" }}
                />
                <View style={{ marginLeft: 10, width: "60%" }}>
                  <ReadMore
                    numberOfLines={2}
                    renderTruncatedFooter={renderTruncatedFooter}
                    renderRevealedFooter={renderRevealedFooter}
                  >
                    <Text style={{ fontSize: 15 }}>{item.name}</Text>
                  </ReadMore>
                  <Text style={styles.priceProduct}>
                    ${" "}
                    {item.price
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ"}
                  </Text>
                  <View style={styles.viewAmount}>
                    <TouchableOpacity
                      onPress={() => {
                        sub(index);
                      }}
                    >
                      <Text style={styles.txtAmount}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtAmount}>{item.amount}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        add(index);
                      }}
                    >
                      <Text style={styles.txtAmount}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View></View>
            </View>
            {hideDelete ? null : (
              <TouchableOpacity style={styles.btnDelete}>
                <Text style={styles.txtDelete}>Xóa</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={{ padding: 10, borderTopWidth: 0.2 }}>
        <View style={styles.viewPrice}>
          <Text style={styles.price}>Tạm tính</Text>
          <Text style={styles.price}>
            {tempPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
              " đ"}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnOrder}>
          <Text style={styles.txtOrder}>Tiến hành thanh toán</Text>
        </TouchableOpacity>
      </View>
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
  titleItems: {
    flexDirection: "row",
    backgroundColor: colors.lightGrey,
    padding: 10,
    justifyContent: "space-between",
  },
  txtTitleItems: {
    fontSize: 16,
  },
  items: {
    flexDirection: "row",
    marginVertical: 7,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  subItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  priceProduct: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.orangeMain,
    marginTop: 5,
  },
  viewAmount: {
    flexDirection: "row",
    width: 80,
    marginTop: 8,
  },
  txtAmount: {
    width: 30,
    height: 25,
    textAlign: "center",
    fontSize: 14.5,
    fontWeight: "bold",
    borderWidth: 0.5,
    borderColor: "grey",
    paddingVertical: 2,
  },
  btnDelete: {
    paddingHorizontal: 10,
    backgroundColor: colors.orangeMain,
    justifyContent: "center",
  },
  txtDelete: {
    color: "white",
    fontSize: 15,
  },
  btnOrder: {
    backgroundColor: colors.orangeMain,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  txtOrder: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
