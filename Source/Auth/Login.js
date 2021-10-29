import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import InputText from "../SmartComponent/InputText";
import ButtonView from "../SmartComponent/ButtonView";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import qs from "qs";
import { connect } from "react-redux";
import {
  setLoggedIn,
  setToken,
  setUserType,
} from "../store/action/auth/action";
import { login } from "../Utils/apiconfig";
import Spinner from "react-native-loading-spinner-overlay";
import { RFPercentage } from "react-native-responsive-fontsize";
// import {
//   InsertUserMaster,
//   queryAllUserMaster,
// } from "../DatabseRealm/allSchemas";
// import * as database from "../DatabseRealm/allSchemas";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      ErrorPassword: null,
      ErrorEmail: null,
      ErrorUserEmail: null,
      form: [],
      usertype: false,
      grant_type: "password",
      access_token: "",
      clientid: 1,
      isLoading: false,
    };
  }
  onPressLogin1() {
    console.log(Math.random(100));
    let data = {
      Id: Math.random(100),
      Password: this.state.form.password,
      Name: this.state.form.email,
    };
    database
      .InsertPatientMaster(data)
      .catch((error) => console.log("insert", error));
  }
  onPressLogin1() {
    database
      .queryAllUserMaster()
      .then((res) => alert(res[0][0].Name))
      .catch((error) => console.log("queryAllUserMaster", error));
  }

  Validation = () => {
    const { email, password } = this.state.form;
    this.setState({ isLoading: false });
    const invalidFields = [];
    if (!email) {
      invalidFields.push("email");
      this.setState({ ErrorEmail: "Email address is required" });
    } else {
      this.setState({ ErrorEmail: null });
    }
    if (!password) {
      invalidFields.push("password");
      this.setState({ ErrorPassword: "Password is required" });
    } else {
      this.setState({ ErrorPassword: null });
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
  onHandleChange = (key, value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: value,
      },
    });
  };
  onSelectUserType = (value) => {
    this.setState({
      usertype: value,
    });
  };
  onPressLogin = async () => {
    this.setState({ isLoading: true });
    const validate = this.Validation();
    if (!validate) {
      const { email, password } = this.state.form;
      this.setState({ isLoading: true });
      let data = qs.stringify({
        grant_type: this.state.grant_type,
        username: email, // 'jainminals@gmail.com', //email,
        password: password, //'12343', //password,
        ClientId: this.state.clientid,
        FirstName: "houseplant",
        Role: 2,
      });
      console.log("loginnnnnn", data);
      await login(data)
        .then((res) => {
          console.log("res: ", JSON.stringify(res));
          this.props.setToken(res.access_token);
          this.props.setLoggedIn(true);
          this.setState({ isLoading: false, access_token: res.access_token });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ isLoading: false });
            console.log("error.response", error.response);
            console.log("responce_error", error.response.data.error);
            if (error.response.data.error == "-90") {
              alert("The Email ID or password is incorrect.");
              this.setState({ isLoading: false });
            }
          } else if (error.request) {
            this.setState({ isLoading: false });
            console.log("request error", error.request);
          } else if (error) {
            alert("Server Error");
            this.setState({ isLoading: false });
          }
        });
    }
  };
  render() {
    const { email, password } = this.state.form;
    const { ErrorPassword, ErrorEmail, ErrorUserEmail, isLoading } = this.state;
    // console.log(this.state.form);
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/login.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <SafeAreaView style={{ height: "100%" }}>
            <ScrollView keyboardShouldPersistTaps="always">
              <Spinner visible={isLoading} />

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 150,
                  marginTop: 70,
                }}
              >
                <Text
                  style={{
                    color: "#4E4E4E",
                    fontSize: RFPercentage(6),
                    fontFamily: "Roboto-Light",
                  }}
                >
                  Welcome
                </Text>
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: RFPercentage(5),
                    fontFamily: "Roboto-Medium",
                    lineHeight: 50,
                  }}
                >
                  Log in !
                </Text>
              </View>
              <View>
                <InputText
                  placeholder="Email Address"
                  onChangeText={(text) => this.onHandleChange("email", text)}
                  error={ErrorEmail || ErrorUserEmail}
                  value={email}
                  keyboardType={"email-address"}
                />
                <InputText
                  placeholder="Password"
                  onChangeText={(text) => this.onHandleChange("password", text)}
                  error={ErrorPassword}
                  value={password}
                  keyboardType={"default"}
                  secureTextEntry={true}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  // alignItems: "center",
                  marginTop: 20,
                  width: "90%",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ForgotPassword")
                  }
                >
                  <Text style={{ fontSize: RFPercentage(2), color: "gray" }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                {/* <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <BouncyCheckbox
                    size={20}
                    fillColor="#53a20a"
                    unfillColor="#FFFFFF"
                    // text="Custom Checkbox"
                    iconStyle={{ borderColor: "#53a20a" }}
                    onPress={(value) => this.onSelectUserType(value)}
                    isChecked={this.state.usertype}
                  />
                  <Text style={{ fontSize: RFPercentage(2), color: "gray" }}>
                    Remember Password
                  </Text>
                  
                </View> */}
              </View>
              <View style={{ marginTop: 20, alignSelf: "center" }}>
                <ButtonView onPress={() => this.onPressLogin()} title="LOGIN" />
              </View>
              <View
                style={{
                  flex: 0.1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginVertical: 20,
                }}
              >
                <Text style={{ fontSize: RFPercentage(2.5), color: "black" }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Signup")}
                >
                  <Text
                    style={{ fontSize: RFPercentage(2.5), color: "#53a20a" }}
                  >
                    {" "}
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  // contacts: state.contactReducer.contacts,
  // parentid: state.parentidReducer.parentid,
});

const mapDispatchToProps = {
  setLoggedIn,
  setToken,
  setUserType,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
