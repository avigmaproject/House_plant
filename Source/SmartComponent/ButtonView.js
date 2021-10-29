import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

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
            paddingVertical: "4%",
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
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
              {this.props.title}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
