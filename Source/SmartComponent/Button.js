import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          // flex: 0.1,
        }}
      >
        <LinearGradient
          colors={[this.props.color1, this.props.color2]}
          style={{
            flexDirection: "row",
            width: "80%",
            borderRadius: 8,
          }}
        >
          <View
            style={{
              width: "20%",
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name={this.props.icon}
              size={20}
              color="#fff"
            />
          </View>
          <View
            style={{
              width: "80%",
              justifyContent: "center",
              marginLeft: 15,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: RFPercentage(2.3),
              }}
            >
              {this.props.title}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
