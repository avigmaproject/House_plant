import React, { Component } from "react";
import { Text, View, ImageBackground, SafeAreaView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import ButtonView from "../SmartComponent/ButtonView";
import Header from "../SmartComponent/Header";

export default class SuccessPage extends Component {
  render() {
    return (
      <View>
        <Header
          back={true}
          search={false}
          notification={false}
          navigation={this.props.navigation}
        />
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/myprofile-success.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <SafeAreaView style={{ height: "100%" }}>
            <View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 200,
                }}
              >
                <AntDesign name="checkcircleo" size={130} color="#3BB44A" />
                <Text
                  style={{ fontSize: 40, textAlign: "center", marginTop: 20 }}
                >
                  Profile Updated Successfully
                </Text>
                <View style={{ marginTop: 20, alignSelf: "center" }}>
                  <ButtonView
                    onPress={() => this.props.navigation.navigate("Home")}
                    title="Go to home"
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}
