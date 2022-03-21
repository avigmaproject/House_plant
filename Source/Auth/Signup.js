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
import Button from "../SmartComponent/Button";
import ButtonView from "../SmartComponent/ButtonView";
import {
  register,
  login,
  addusermasterdata,
  requestUserPermission,
  getFcmToken,
} from "../Utils/apiconfig";
import {
  setLoggedIn,
  setToken,
  setUserType,
} from "../store/action/auth/action";
import { connect } from "react-redux";
import qs from "qs";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "../SmartComponent/Header";
import { LoginManager, AccessToken, LoginButton } from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      ErrorFirstName: null,
      ErrorLastName: null,
      ErrorCPassword: null,
      ErrorPhoneNumber: null,
      ErrorPassword: null,
      ErrorEmail: null,
      form: [],
      grant_type: "password",
      clientid: 2,
      role: "houseplat",
      isLoading: false,
      fcmtoken: "",
      visible: false,
    };
  }
  onHandleChange = (key, value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: value,
      },
    });
  };
  onDismissSnackBar() {
    this.setState({
      visible: false,
    });
  }
  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.FcmMessage();
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        webClientId:
          "89731374087-idru0s62rve5tunsnct7ms341ea0lcib.apps.googleusercontent.com",
      });
    });
  };
  GoogleConfig = async () => {
    // this.setState({ isLoading: true });

    await GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfoGoogleSignin", userInfo);
      console.log("idToken", userInfo.idToken);
      // alert(userInfo.idToken);
      let data = qs.stringify({
        grant_type: "password",
        username: userInfo.user.email,
        password: "",
        ClientId: 5,
        FirstName: userInfo.user.givenName,
        Role: 2,
        User_Login_Type: 2,
        User_Token_val: userInfo.idToken,
        User_MacID: this.state.fcmtoken,
      });
      console.log("hiiiii", data);
      login(data).then((res) => {
        console.log("res: ", JSON.stringify(res));
        if (res) {
          let info = {
            Type: 9,
            User_FB_Token_val: this.state.fcmtoken,
            User_Name: userInfo.user.givenName,
            User_Image_Path: userInfo.user.photo,
            User_Email: userInfo.user.email,
          };
          console.log("inform user", info, res.access_token);
          addusermasterdata(info, res.access_token).then((response) => {
            this.props.setToken(res.access_token);
            this.props.setLoggedIn(true);
            this.props.setUserType(false);
            console.log("123addusermasterdata", response);
            this.setState({ isLoading: false });
          });
        }
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("SIGN_IN_CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("IN_PROGRESS");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        alert("GOOGLE_ERROR");

        alert(error);
        console.log(JSON.stringify(error));
      }
    }
  };
  FcmMessage = async () => {
    const authStatus = await requestUserPermission();
    if (authStatus) {
      const fcmtoken = await getFcmToken();
      if (fcmtoken) {
        this.setState({ fcmtoken });
      }
    }
  };
  initUser = async (token) => {
    console.log("initUser", token);
    this.setState({ isLoading: true });

    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token=" +
        token
    )
      .then((response) => response.json())
      .then(async (json) => {
        console.log("****json****", json);
        let data = qs.stringify({
          grant_type: "password",
          username: json.email,
          password: "",
          ClientId: 5,
          FirstName: json.name,
          Role: 2,
          User_Login_Type: 3,
          User_Token_val: token,
          User_MacID: this.state.fcmtoken,
        });
        console.log("hiiiii", data, json.picture.data.url);
        login(data).then((res) => {
          if (res) {
            let info = {
              Type: 9,
              User_FB_Token_val: this.state.fcmtoken,
              User_Name: json.name,
              User_Image_Path: json.picture.data.url,
              User_Email: json.email,
            };
            console.log("inform user", info, res.access_token);
            addusermasterdata(info, res.access_token).then((response) => {
              this.props.setToken(res.access_token);
              this.props.setLoggedIn(true);
              this.props.setUserType(false);
              console.log("123addusermasterdata", response);
              this.setState({ isLoading: false });
            });
          }
        });
      })
      .catch((e) => {
        Promise.reject("ERROR GETTING DATA FROM FACEBOOK", e);
      });
  };
  onFBButtonPress = () => {
    LoginManager.logOut();
    LoginManager.logInWithPermissions(["public_profile", "email"])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error("The user cancelled the request"));
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        this.initUser(data.accessToken);
      })
      .catch((error) => {
        const { code, message } = error;
        // console.log(JSON.stringify(error));
        // alert(message);
        console.log(`Facebook login fail with error: ${message} code: ${code}`);
        if (code === "auth/account-exists-with-different-credential") {
          Alert.alert(" Login Error! ", `${message}`, [{ text: "Ok" }], {
            cancelable: false,
          });
        }
      });
  };
  Validation = () => {
    this.setState({ isLoading: false });
    const {
      firstname,
      email,
      cpassword,
      password,
      phonenumber,
    } = this.state.form;
    const invalidFields = [];
    if (!firstname) {
      invalidFields.push("firstname");
      this.setState({ ErrorFirstName: "Name is required." });
    } else {
      this.setState({ ErrorFirstName: null });
    }
    if (!email) {
      invalidFields.push("email");
      this.setState({ ErrorEmail: "Email address is required." });
    } else {
      this.setState({ ErrorEmail: null });
    }
    if (!cpassword) {
      invalidFields.push("cpassword");
      this.setState({ ErrorCPassword: "Confirm Password is required." });
    } else {
      this.setState({ ErrorCPassword: null });
    }
    if (!password) {
      invalidFields.push("password");
      this.setState({ ErrorPassword: "Password is required." });
    } else {
      this.setState({ ErrorPassword: null });
    }
    if (password !== cpassword) {
      invalidFields.push("cpassword");
      this.setState({
        ErrorPassword2: "Password and confirm password do not match.",
      });
    } else {
      this.setState({ ErrorPassword2: null });
    }
    if (phonenumber && phonenumber.length < 10) {
      invalidFields.push("phonenumber");
      this.setState({
        ErrorPhoneNumber: "Phone number must be at least 10 digit.",
      });
    } else {
      this.setState({ ErrorPhoneNumber: null });
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false && email) {
      invalidFields.push("ErrorUserEmail");
      this.setState({ ErrorEmailFormate: "Please enter valid email." });
    } else {
      this.setState({ ErrorEmailFormate: null });
    }
    return invalidFields.length > 0;
  };
  onHandleSignUP = async () => {
    // this.props.navigation.navigate('SuccessPage', {register: true});

    this.setState({ isLoading: true });
    const validate = this.Validation();
    console.log("validate", validate);
    if (!validate) {
      const { firstname, password, phonenumber, email } = this.state.form;

      // this.setState({ isLoading: true });
      let data = qs.stringify({
        grant_type: this.state.grant_type,
        UserName: email,
        Password: password,
        ClientId: this.state.clientid,
        Role: this.state.role,
        FirstName: firstname,
        MobileNumber: phonenumber,
        User_IsActive: 1,
        User_MacID: this.state.fcmtoken,
      });
      console.log(data);
      await register(data)
        .then((res) => {
          console.log("res: ", JSON.stringify(res));
          console.log("res:123", res.access_token);
          if (res.access_token) {
            this.props.navigation.navigate("SuccessPage", { register: true });
            this.setState({ isLoading: false });
          }
          // this.setState({isLoading: false, access_token: res.access_token});
          // const token = res.access_token;
          // this.props.setToken(res.access_token);
          // this.props.setLoggedIn(true);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("responce_error", error.response.data.error);
            if (error.response.data.error == "-99") {
              alert("Email Already Exist.");
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
    const {
      firstname,
      phonenumber,
      cpassword,
      email,
      password,
    } = this.state.form;
    const {
      ErrorFirstName,
      ErrorEmailFormate,
      ErrorCPassword,
      ErrorPhoneNumber,
      ErrorPassword,
      ErrorEmail,
      ErrorPassword2,
      isLoading,
    } = this.state;
    console.log(ErrorCPassword);
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/signup.jpg")}
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
              <Spinner visible={isLoading} />

              <View style={{ marginLeft: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#4E4E4E",
                      fontSize: 15,
                      fontFamily: "Roboto-Medium",
                    }}
                  >
                    Welcome to
                  </Text>
                  <Text
                    style={{
                      color: "#4E4E4E",
                      fontSize: 15,
                      fontFamily: "Roboto-Medium",
                    }}
                  >
                    {" "}
                    FIDDLE LEAF FIG DOCTOR
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#53a20a",
                      fontSize: 20,
                      fontFamily: "Roboto-Medium",
                      lineHeight: 30,
                    }}
                  >
                    Sign up
                  </Text>
                </View>
              </View>
              <View>
                <InputText
                  placeholder="Name"
                  onChangeText={(text) =>
                    this.onHandleChange("firstname", text)
                  }
                  error={ErrorFirstName}
                  value={firstname}
                />
                {/* <InputText
                  placeholder="Last Name"
                  onChangeText={text => this.onHandleChange('lastname', text)}
                  error={ErrorLastName}
                  value={lastname}
                /> */}
                <InputText
                  placeholder="Email Address"
                  onChangeText={(text) => this.onHandleChange("email", text)}
                  error={ErrorEmail || ErrorEmailFormate}
                  value={email}
                  keyboardType={"email-address"}
                />
                <InputText
                  placeholder="Password"
                  onChangeText={(text) => this.onHandleChange("password", text)}
                  error={ErrorPassword || ErrorPassword2}
                  value={password}
                  keyboardType={"default"}
                  secureTextEntry={true}
                />
                <InputText
                  placeholder="Confirm Password"
                  onChangeText={(text) =>
                    this.onHandleChange("cpassword", text)
                  }
                  error={ErrorCPassword}
                  value={cpassword}
                  keyboardType={"default"}
                  secureTextEntry={true}
                />
                <InputText
                  placeholder="Phone Number"
                  onChangeText={(text) =>
                    this.onHandleChange("phonenumber", text)
                  }
                  error={ErrorPhoneNumber}
                  value={phonenumber}
                  keyboardType={"phone-pad"}
                  maxLength={10}
                />
              </View>
              <View style={{ marginTop: 20, alignSelf: "center" }}>
                <ButtonView
                  onPress={() => this.onHandleSignUP()}
                  title="SIGN UP"
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "gray", fontWeight: "bold" }}
                >
                  Or Continue with
                </Text>
              </View>
              <View>
                <Button
                  onPress={() => this.onFBButtonPress()}
                  title="Sign In With Facebook"
                  color1="#4D6EAD"
                  color2="#365084"
                  icon="facebook"
                />
                <Button
                  onPress={() => this.GoogleConfig()}
                  title="Sign In With Google"
                  color1="#DB4939"
                  color2="#D44837"
                  icon="google-plus"
                />
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginVertical: 20,
                }}
              >
                <Text style={{ fontSize: 15, color: "black" }}>
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  <Text style={{ fontSize: 15, color: "#53a20a" }}>
                    {" "}
                    Sign In
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
