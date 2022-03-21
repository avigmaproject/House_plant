import React, { Component } from "react";
import { Text, View, SafeAreaView, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import InputText from "../SmartComponent/InputText";
import ButtonView from "../SmartComponent/ButtonView";
import { resetpassword } from "../Utils/apiconfig";
import { Snackbar } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "../SmartComponent/Header";

export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      message: null,
      color: "green",
      visible: false,
      ErrorPassword: null,
      ErrorCPassword: null,
      ErrorCPassword2: null,
      cpassword: null,
      password: null,
      email: null,
      device: 1,
      isLoading: false,
    };
  }
  componentDidMount() {
    console.log("restpassword", this.props.route.params.link);
    const { link } = this.props.route.params;
    const spliturl = link.split("/");
    console.log("spliturl", spliturl[4]);
    this.setState({ email: spliturl[4] });
  }

  onHandleResetPassword = async () => {
    console.log(this.state.email);
    const error = this.Validation();
    if (!error) {
      const { password, email } = this.state;
      this.setState({ isLoading: true });
      if (email && password) {
        let data = {
          User_Email: email,
          Type: 5,
          User_Password: password,
          User_Type: 1,
        };
        console.log(data);
        await resetpassword(data)
          .then((res) => {
            console.log("res: ", JSON.stringify(res));
            this.setState({ isLoading: false });
            this.setState({
              color: "#53a20a",
              visible: true,
              message: "Password Changed Successfully",
            });
            setTimeout(() => {
              this.props.navigation.navigate("SuccessPage", {
                register: false,
              });
            }, 2000);
          })
          .catch((error) => {
            if (error.response) {
              this.setState({
                color: "red",
                visible: true,
                message: "Something went wrong!!!",
              });
              console.log("responce_error", error.response);
              this.setState({ isLoading: false });
            } else if (error.request) {
              this.setState({
                color: "red",
                visible: true,
                message: "Something went wrong!!!",
              });
              this.setState({ isLoading: false });
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
    this.setState({ isLoading: false });
    const { password, cpassword } = this.state;
    const invalidFields = [];
    if (!password) {
      invalidFields.push("password");
      this.setState({ ErrorPassword: "Password is required" });
    } else {
      this.setState({ ErrorPassword: null });
    }
    if (!cpassword) {
      invalidFields.push("ErrorCPassword");
      this.setState({ ErrorCPassword: "Confirm Password is required" });
    } else {
      this.setState({ ErrorCPassword: null });
    }
    if (cpassword != password) {
      invalidFields.push("ErrorCPassword2");
      this.setState({
        ErrorCPassword2: "Confirm Password and Password does not match",
      });
    } else {
      this.setState({ ErrorCPassword2: null });
    }
    return invalidFields.length > 0;
  };
  render() {
    const {
      ErrorPassword,
      ErrorCPassword,
      ErrorCPassword2,
      cpassword,
      password,
    } = this.state;
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/forgot-password.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <SafeAreaView style={{ height: "100%" }}>
            <ScrollView keyboardShouldPersistTaps="always">
              <Header
                back={true}
                search={false}
                notification={false}
                auth={true}
                navigation={this.props.navigation}
              />
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
                  Reset Your Password!
                </Text>
                <Text style={{ fontSize: 15, color: "gray" }}>
                  Please enter your Password.
                </Text>
              </View>

              <InputText
                title={"Password"}
                onChangeText={(password) => this.setState({ password })}
                error={ErrorPassword}
                value={password}
              />
              <InputText
                title={"Confirm Password"}
                onChangeText={(cpassword) => this.setState({ cpassword })}
                error={ErrorCPassword || ErrorCPassword2}
                value={cpassword}
              />

              <View style={{ marginTop: 20, marginLeft: 20 }}>
                <ButtonView
                  onPress={() => this.onHandleResetPassword()}
                  title="Reset Password"
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
