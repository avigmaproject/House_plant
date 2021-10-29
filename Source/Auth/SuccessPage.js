import React, { Component } from "react";
import { Text, View, ImageBackground, Image, SafeAreaView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Button from "../SmartComponent/Button";
import ButtonView from "../SmartComponent/ButtonView";
export default class SuccessPage extends Component {
  componentDidMount() {
    console.log(this.props.route.params.register);
  }
  render() {
    return (
      <View>
        {this.props.route.params.register ? (
          <ImageBackground
            source={require("../../assets/plan_app_images/bg/myprofile-success.jpg")}
            resizeMode="cover"
            style={{ height: "100%" }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "pink",
                height: "110%",
              }}
            >
              <Image
                source={require("../../assets/fiddle-leaf-fig-plant-resource-logo.png")}
                resizeMode="stretch"
                style={{ height: "15%", width: "30%" }}
              />
              <Text
                style={{
                  fontSize: 40,
                  textAlign: "center",
                  // marginVertical: 20,
                }}
              >
                Account Created Successfully
              </Text>

              <Button
                onPress={() => this.props.navigation.navigate("Login")}
                title="Sign In with Email ID"
                color1="#53a20a"
                color2="#53a20a"
                icon="email"
              />
            </View>
          </ImageBackground>
        ) : (
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
                  <View style={{ marginHorizontal: 20 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 20,
                        color: "#4E4E4E",
                      }}
                    >
                      We sent you link to reset new password. please check your
                      email.
                    </Text>
                  </View>
                  <View style={{ marginTop: 20, alignSelf: "center" }}>
                    <ButtonView
                      onPress={() => this.props.navigation.navigate("Login")}
                      title="Login Now"
                    />
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
        )}
      </View>
    );
  }
}
