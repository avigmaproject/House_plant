import React, { Component } from "react";
import { Text, View, SafeAreaView, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import InputText from "../SmartComponent/InputText";
import ButtonView from "../SmartComponent/ButtonView";
import { forgotpassword } from "../Utils/apiconfig";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { Snackbar } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "../SmartComponent/Header";

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      ErrorEmail: null,
      ErrorUserEmail: null,
      email: null,
      message: null,
      color: "green",
      device: 1,
      isLoading: false,
    };
  }
  componentDidMount() {
    if (Platform.OS === "android") {
      this.setState({
        device: 1,
      });
    } else {
      this.setState({
        device: 2,
      });
    }
  }
  generateLink = async () => {
    const link = await dynamicLinks().buildShortLink({
      link: `https://houseplantrn.page.link/forgetpassword/${this.state.email}`,
      domainUriPrefix: "https://houseplantrn.page.link",
      // ios: {
      //   bundleId: "com.HousePlant",
      //   appStoreId: "1579823021",
      //   fallbackUrl: "https://apps.apple.com/us/app/com.HousePlant/id1535962213",
      // },
      android: {
        packageName: "com.houseplant",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.houseplant",
      },
      navigation: {
        forcedRedirectEnabled: true,
      },
    });
    console.log(link);
    this.setState({ link });
  };
  onHandleForgotPassword = async () => {
    await this.generateLink();
    const error = this.Validation();
    if (!error) {
      const { email, link, device } = this.state;
      this.setState({ isLoading: true });
      if (email && link) {
        let data = {
          EmailID: email,
          Type: 1,
          Email_Url: link,
          Device: device,
        };
        console.log(data);
        await forgotpassword(data)
          .then((res) => {
            console.log("res: ", JSON.stringify(res));
            console.log("res:123", res[0].UserCode);
            this.setState({ isLoading: false });
            if (res[0].UserCode === "Sucesss") {
              this.setState({
                color: "#53a20a",
                visible: true,
                message:
                  "Link sent successfully. Please check your registered email.",
              });
              setTimeout(() => {
                this.props.navigation.navigate("SuccessPage", {
                  register: false,
                });
              }, 2000);
            }
            if (res[0].UserCode === "Error") {
              this.setState({
                color: "red",
                visible: true,
                message: "Please check your email.",
              });
            }
          })
          .catch((error) => {
            if (error.response) {
              console.log("responce_error", error.response);
              this.setState({
                isLoading: false,
                color: "red",
                visible: true,
                message: "Some Response Error",
              });
            } else if (error.request) {
              this.setState({
                isLoading: false,
                color: "red",
                visible: true,
                message: "Some Request Error",
              });
              console.log("request error", error.request);
            }
          });
      } else {
        this.setState({
          color: "red",
          visible: true,
          message: "Something went wrong!!!",
        });
      }
    }
  };
  onDismissSnackBar() {
    this.setState({
      visible: false,
      message: null,
    });
  }
  Validation = () => {
    const { email } = this.state;
    this.setState({ isLoading: false });
    // debugger;
    const invalidFields = [];

    if (!email) {
      invalidFields.push("email");
      this.setState({ ErrorEmail: "Email address is required" });
    } else {
      this.setState({ ErrorEmail: null });
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false && email) {
      invalidFields.push("ErrorUserEmail");
      this.setState({ ErrorUserEmail: "Please enter valid email" });
    } else {
      this.setState({ ErrorUserEmail: null });
    }
    return invalidFields.length > 0;
  };
  render() {
    const { ErrorEmail, ErrorUserEmail, email } = this.state;
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/forgot-password.jpg")}
          resizeMode="stretch"
          style={{ height: "100%" }}
        >
          <SafeAreaView style={{ height: "100%" }}>
            <Header
              back={true}
              search={false}
              notification={false}
              navigation={this.props.navigation}
            />
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={{ paddingHorizontal: 34, marginTop: 150 }}>
                <Spinner visible={this.state.isLoading} />
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: 35,
                    fontFamily: "Roboto-Medium",
                    lineHeight: 50,
                  }}
                >
                  Lost Your Password!
                </Text>
                <Text style={{ fontSize: 15, color: "gray" }}>
                  Please enter your username or email address. You will receive
                  a link to create a new password via email.
                </Text>
              </View>

              <InputText
                title={" Email Address"}
                onChangeText={(email) => this.setState({ email })}
                error={ErrorEmail || ErrorUserEmail}
                value={email}
                onSubmitEditing={() => this.generateLink()}
                onBlur={() => this.generateLink()}
              />

              <View style={{ marginTop: 20, marginLeft: 34 }}>
                <ButtonView
                  onPress={() => this.onHandleForgotPassword()}
                  title="Send Link"
                />
              </View>
            </ScrollView>
            <Snackbar
              visible={this.state.visible}
              onDismiss={() =>
                this.props.navigation.navigate("SuccessPage", {
                  register: false,
                })
              }
              style={{ backgroundColor: this.state.color }}
              duration={1000}
              action={{
                label: "close",
                onPress: () => {
                  this.onDismissSnackBar();
                },
              }}
            >
              {this.state.message}
            </Snackbar>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}
