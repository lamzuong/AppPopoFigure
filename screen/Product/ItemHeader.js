import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../color";

export default function ItemHeader(props) {
  const item = props.item;
  const brand = props.brand;
  return (
    <View
      style={[
        styles.itemHeader,
        brand == item ? { backgroundColor: colors.orangeMain } : null,
      ]}
    >
      <Text style={brand == item ? { color: "white" } : null}>{item}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  itemHeader: {
    backgroundColor: colors.lightGrey,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
