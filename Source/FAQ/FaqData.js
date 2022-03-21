import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class FaqData extends Component {
  render() {
    return (
      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          paddingVertical: 10,
          flexDirection: "row",
          // justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
          shadowOffset: { width: 0.1, height: 0.1 },
          shadowColor: "gray",
          shadowOpacity: 0.1,
          elevation: 1,
        }}
      >
        <TouchableOpacity
          style={{
            // backgroundColor: "red",
            width: "90%",
            paddingHorizontal: 20,
          }}
          onPress={this.props.onpress}
        >
          <Text
            style={{
              lineHeight: 25,
              fontFamily: "Roboto-Medium",
              color: "#323232",
              fontSize: 14,
            }}
          >
            {this.props.question}
          </Text>
          {this.props.show && this.props.id == this.props.id2 && (
            <View
              style={{
                marginTop: 10,
                // backgroundColor: "red",
                // height: 100,
              }}
            >
              <Text
                style={{
                  lineHeight: 25,
                  fontFamily: "Roboto-Medium",
                  color: "gray",
                  fontSize: 14,
                }}
              >
                {this.props.answer}
                {this.props.link && (
                  <Text style={{ color: "blue" }} onPress={() => alert("hii")}>
                    <Text style={{ position: "ab" }}>{this.props.link}</Text>
                  </Text>
                )}
                {this.props.text1 && this.props.text1}
                {this.props.link2 && (
                  <Text style={{ color: "blue" }} onPress={() => alert("hii")}>
                    <Text style={{ position: "ab" }}>{this.props.link2}</Text>
                  </Text>
                )}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onpress}>
          {this.props.show && this.props.id == this.props.id ? (
            <AntDesign name={"down"} size={20} color="#323232" />
          ) : (
            <AntDesign name={"right"} size={20} color="#323232" />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
