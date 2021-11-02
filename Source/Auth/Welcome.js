import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  AppState,
} from "react-native";
import Button from "../SmartComponent/Button";
import dynamicLinks from "@react-native-firebase/dynamic-links";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: "active",
    };
  }

  _getInitialUrl = async () => {
    const url = dynamicLinks().onLink(this.handleDynamicLink);
  };
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = async (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this._getInitialUrl();
    }
    this.setState({ appState: nextAppState });
  };
  handleDynamicLink = (link) => {
    if (link.url) {
      this.props.navigation.navigate("ResetPassword", { link: link.url });
    }
  };
  componentDidMount = async () => {
    this._getInitialUrl();
    AppState.addEventListener("change", this._handleAppStateChange);
    await dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link) {
          console.log("Loginlink", link);
          this.props.navigation.navigate("ResetPassword", { link: link.url });
        }
        console.log("Loginlinklink", link);
      });
  };
  render() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/welcome-screen.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: 'pink',
              flex: 0.2,
              marginTop: 100,
            }}
          >
            <Image
              source={require("../../assets/fiddle-leaf-fig-plant-resource-logo.png")}
              resizeMode="stretch"
              style={{ height: "100%", width: "30%" }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 0.2,
            }}
          >
            <Text style={{ fontSize: 45, color: "#323232" }}>Welcome</Text>
          </View>
          <Button
            onPress={() => this.props.navigation.navigate("Login")}
            title="Sign In Email ID"
            color1="#53a20a"
            color2="#53a20a"
            icon="email"
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 15, color: "gray" }}>
              Or Continue with
            </Text>
          </View>
          <Button
            title="Sign In With Facebook"
            color1="#4D6EAD"
            color2="#365084"
            icon="facebook"
          />
          <Button
            title="Sign In Google"
            color1="#DB4939"
            color2="#D44837"
            icon="google-plus"
          />
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 15, color: "gray" }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              <Text style={{ fontSize: 15, color: "#53a20a" }}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
