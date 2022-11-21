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
import React, { createContext, useEffect, useState } from "react";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../color";
import ItemProduct from "./ItemProduct";
import ItemHeader from "./ItemHeader";
const axios = require("axios").default;
// import axios from "react-native-axios";

export default function Product({ navigation }) {
  const [valueInput, setValueInput] = useState("");
  const [listBrand, setListBrand] = useState([
    "Tất cả",
    "Bandai",
    "Good Smile",
    "Sega",
    "Megahouse",
  ]);
  const [listProduct, setListProduct] = useState([]);
  const [listProductShow, setListProductShow] = useState([]);

  const [chooseBrand, setChooseBrand] = useState("Tất cả");
  const [listProductSearch, setListProductSearch] = useState([]);

  useEffect(() => {
    axios
      .get("https://6375d6c2b5f0e1eb85fab4a2.mockapi.io/api/product")
      .then(
        (todo) => (setListProduct(todo.data), setListProductShow(todo.data))
      );
  }, []);
  useEffect(() => {
    setListProductShow([]);
    var list = [];
    listProduct.forEach((e) => {
      if (e.brand == chooseBrand || chooseBrand == "Tất cả") {
        list.push(e);
      }
    });
    setListProductShow(list);
  }, [chooseBrand]);
  useEffect(() => {
    var list = [];
    listProduct.forEach((e) => {
      if (e.name.toLowerCase().includes(valueInput.toLowerCase())) {
        list.push(e);
      }
    });
    setListProductSearch(list);
    if (valueInput == "") {
      setListProductSearch([]);
    }
  }, [valueInput]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <View style={styles.txtSearch}>
          <EvilIcons name="search" size={28} color="black" />
          <View style={{ marginHorizontal: 2 }}></View>
          <TextInput
            placeholder={"Tìm kiếm..."}
            onChangeText={(text) => setValueInput(text)}
            value={valueInput}
            style={{ width: "75%" }}
          />
          {valueInput && (
            <TouchableOpacity
              onPress={() => {
                setValueInput("");
              }}
            >
              <MaterialIcons name="clear" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Ionicons name="cart-sharp" size={40} color="white" />
        </TouchableOpacity>
      </View>
      {valueInput ? (
        <FlatList
          data={listProductSearch}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.itemFlat}
                onPress={() => {
                  navigation.navigate("ProductDetail", { item: item });
                }}
              >
                <ItemProduct item={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => "@" + index}
          key={"@"}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <>
          <View style={styles.brand}>
            <FlatList
              data={listBrand}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setChooseBrand(item);
                    }}
                  >
                    <ItemHeader item={item} brand={chooseBrand} />
                  </TouchableOpacity>
                );
              }}
              horizontal
              keyExtractor={(item, index) => "#" + index}
              key={"#"}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <FlatList
            data={listProductShow}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.itemFlat}
                  onPress={() => {
                    navigation.navigate("ProductDetail", { item: item });
                  }}
                >
                  <ItemProduct item={item} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => "$" + index}
            key={"$"}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </>
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
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  txtSearch: {
    height: 40,
    width: "85%",
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  brand: {
    paddingHorizontal: 10,
  },
  itemFlat: {
    width: Dimensions.get("window").width / 2,
    alignItems: "center",
  },
});
