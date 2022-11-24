// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   Touchable,
//   TouchableOpacity,
//   CheckBox,
//   Button,
//   Alert,
// } from "react-native";
// import { colors } from "./color";
// import { AntDesign } from "@expo/vector-icons";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
// } from "firebase/auth";
// import { auth } from "../firebase";
// import React, { useState } from "react";
// import { RadioButton } from "react-native-paper";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { Ionicons } from "@expo/vector-icons";
// const axios = require("axios").default;

// export default function ConfirmEmail({ navigation }) {
//     async function signUp() {
//         try {
//           await createUserWithEmailAndPassword(auth, value.email, value.password);

//           navigation.navigate("Home", { username: value.email });
//         } catch (error) {
//           Alert.alert("Lỗi", "Email đã tồn tại, vui lòng nhập email khác.", [
//             {
//               text: "Xác nhận",
//               style: "cancel",
//             },
//           ]);
//         }
//       }
//   return (
//     <View style={styles.root}>
//       <Image
//         source={{
//           uri: "https://res.cloudinary.com/daoyryngu/image/upload/v1668668980/logoPoPo_k3safb.png",
//         }}
//         style={{
//           width: "90%",
//           height: "25%",
//           resizeMode: "contain",
//           marginTop: 10,
//         }}
//       />
//       <ScrollView>
//         <View style={[styles.input, { marginTop: 0 }]}>
//           <TouchableOpacity style={styles.container} onPress={signUp}>
//             <Text style={styles.text}>Gửi Lại Link Xác Thực</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.container} onPress={signUp}>
//             <Text style={styles.text}>Đăng Nhập</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     padding: 20,
//     backgroundColor: colors.lightGrey,
//   },
//   input: {
//     backgroundColor: "white",
//     width: "100%",

//     borderColor: "#e8e8e8",
//     borderWidth: 1,
//     borderRadius: 5,

//     paddingHorizontal: 10,
//     marginVertical: 5,
//     paddingVertical: 8,
//   },
//   gender: {
//     marginTop: 8,
//   },
//   container: {
//     width: "100%",
//     padding: 15,
//     marginVertical: 5,
//     justifyContent: "center",
//     borderRadius: 5,
//     backgroundColor: colors.orangeMain,
//     marginTop: 20,
//     flexDirection: "row",
//   },
//   text: {
//     fontWeight: "bold",
//     color: "white",
//   },
//   icon: {
//     height: 20,
//     width: 20,
//     resizeMode: "contain",
//     marginRight: 10,
//   },
//   error: {
//     marginTop: 10,
//     padding: 10,
//     color: "red",
//     backgroundColor: colors.lightGrey,
//   },
//   date: {
//     marginTop: 10,
//     color: "black",
//     height: 60,
//     fontSize: 18,
//     borderWidth: 2,
//     borderColor: "#0091ff",
//     marginLeft: 20,
//     marginRight: 20,
//     borderRadius: 10,
//     paddingStart: 15,
//     backgroundColor: "white",
//     flexDirection: "row",
//   },
// });
