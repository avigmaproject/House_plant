import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";

export default class InputText extends Component {
  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        {this.props.title && (
          <View
            style={{
              marginBottom: 10,
              alignSelf: "flex-start",
              paddingHorizontal: 35,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Roboto-Light",
                color: "gray",
              }}
            >
              {this.props.title}
            </Text>
          </View>
        )}
        <View
          style={{
            backgroundColor: "#fff",
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            width: "85%",
            borderRadius: 50,
          }}
        >
          <TextInput
            style={{ height: 50, width: "95%", paddingLeft: 20 }}
            keyboardType={this.props.keyboardType}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
            placeholder={this.props.placeholder}
            placeholderTextColor="#4E4E4E"
            maxLength={this.props.maxLength}
            secureTextEntry={this.props.secureTextEntry}
            editable={this.props.editable}
          />
        </View>
        {this.props.error && (
          <View style={{ width: "90%" }}>
            <Text style={{ color: "red", marginTop: 5, marginRight: 30 }}>
              {this.props.error}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
