import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { colors } from "../color";

export default function ItemProduct(props) {
  const item = props.item;
  return (
    <View style={styles.itemProduct}>
      <Image source={{ uri: item.image }} style={styles.imgProduct} />
      <View>
        <Text style={styles.nameProduct}>{item.name}</Text>
        <Text style={styles.priceProduct}>
          {item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
            " đ"}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  itemProduct: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: 160,
    height: 280,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  imgProduct: {
    height: 140,
    width: 130,
    resizeMode: "contain",
  },
  nameProduct: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
    height: 60,
  },
  priceProduct: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.orangeMain,
    marginTop: 10,
  },
});
