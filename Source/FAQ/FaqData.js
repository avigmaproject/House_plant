// import React, { Component } from "react";
// import { Text, View, TouchableOpacity } from "react-native";
// import AntDesign from "react-native-vector-icons/AntDesign";

// export default class FaqData extends Component {
//   render() {
//     // alert(this.props.show);
//     return (
//       <View
//         style={{
//           borderBottomColor: "lightgray",
//           borderBottomWidth: 1,
//           paddingVertical: 20,
//           flexDirection: "row",
//           // justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             // backgroundColor: "red",
//             width: "90%",
//             paddingHorizontal: 20,
//           }}
//           onPress={this.props.onpress}
//         >
//           <Text
//             style={{
//               lineHeight: 25,
//               fontFamily: "Roboto-Medium",
//               color: "#323232",
//               fontSize: 14,
//             }}
//           >
//             {this.props.question}
//           </Text>
//           {this.props.show && this.props.id == this.props.id && (
//             <View style={{ marginTop: 10 }}>
//               <Text
//                 style={{
//                   lineHeight: 25,
//                   fontFamily: "Roboto-Medium",
//                   color: "gray",
//                   fontSize: 14,
//                 }}
//               >
//                 {this.props.answer}
//               </Text>

//             </View>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => this.props.onpress}>
//           {this.props.show && this.props.id == this.props.id ? (
//             <AntDesign name={"down"} size={20} color="#323232" />
//           ) : (
//             <AntDesign name={"right"} size={20} color="#323232" />
//           )}
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
