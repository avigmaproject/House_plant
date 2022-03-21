import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default class ButtonView extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          // flex: 0.1,
          alignSelf: "baseline",
        }}
      >
        <LinearGradient
          colors={["#53a20a", "#53a20a"]}
          style={{
            flexDirection: "row",
            // width: "80%",
            borderRadius: 50,
            paddingVertical: this.props.icon ? "12%" : "4%",
            paddingHorizontal: "11%",
          }}
        >
          <View
            style={{
              // width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.props.icon && (
              <MaterialCommunityIcons
                name="image-plus"
                size={30}
                color="#fff"
              />
            )}
            {this.props.title && (
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                {this.props.title}
              </Text>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
