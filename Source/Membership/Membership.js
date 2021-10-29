import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../SmartComponent/Header";
import ButtonView from "../SmartComponent/ButtonView";

export default class Membership extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/all-pages-bg.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <SafeAreaView style={{ height: "100%" }}>
            <Header
              back={true}
              search={false}
              notification={false}
              navigation={this.props.navigation}
              title={"Membership"}
            />
            <View style={{ marginTop: "20%" }}>
              <Image
                resizeMode={"stretch"}
                source={{
                  uri: "https://media.ugaoo.com/catalog/product/cache/81d2f56800d33f099d2b369affd8e374/f/i/fiddleleaffigmedium_45.png",
                }}
                style={{
                  width: "60%",
                  height: "60%",
                  marginRight: 15,
                  alignSelf: "center",
                }}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    color: "gray",
                    fontFamily: "Roboto-Light",
                    fontSize: 18,
                    lineHeight: 30,
                  }}
                >
                  Buy Premium Memburship to enjoy
                </Text>
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: 20,
                    fontWeight: "bold",
                    lineHeight: 30,
                  }}
                >
                  ADVANCE FEATURES
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "red",
                    // fontFamily: "CedarvilleCursive-Regular",
                  }}
                >
                  Only for $4.99
                </Text>
              </View>
              <View style={{ marginTop: 20, alignSelf: "center" }}>
                <ButtonView onPress={() => alert("Pay")} title="Pay Now" />
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}
