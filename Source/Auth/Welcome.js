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
import { LoginManager, AccessToken, LoginButton } from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  setLoggedIn,
  setToken,
  setUserType,
} from "../store/action/auth/action";
import {
  login,
  addusermasterdata,
  requestUserPermission,
  getFcmToken,
} from "../Utils/apiconfig";
import { connect } from "react-redux";
import qs from "qs";
import Spinner from "react-native-loading-spinner-overlay";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: "active",
      fcmtoken: "",
      isLoading: false,
    };
  }

  GoogleConfig = async () => {
    this.setState({ isLoading: true });
    console.log("GoogleSignin", GoogleSignin);
    // await GoogleSignin.signOut();
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
        IMEI: this.state.fcmtoken,
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
          IMEI: this.state.fcmtoken,
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
  componentWillUnmount() {
    AppState.removeEventListener("change");
  }
  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.FcmMessage();
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        webClientId:
          "89731374087-idru0s62rve5tunsnct7ms341ea0lcib.apps.googleusercontent.com",
        iosClientId:
          "89731374087-mqu077dj9pk7221n4ijrikkce4vm7s38.apps.googleusercontent.com",
      });
    });
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
        <Spinner visible={this.state.isLoading} />

        <ImageBackground
          source={require("../../assets/plan_app_images/bg/welcome-screen.jpeg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: 'pink',
              flex: 0.3,
              marginTop: 100,
            }}
          >
            <Image
              source={require("../../assets/fiddle-leaf-fig-plant-resource-logo.png")}
              resizeMode="contain"
              style={{ height: 200, width: "30%" }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 0.3,
            }}
          >
            <Text style={{ fontSize: 45, color: "#323232" }}>Welcome</Text>
          </View>
          <Button
            onPress={() => this.props.navigation.navigate("Login")}
            title="Sign In With Email ID"
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
          <View
            style={{
              flex: 0.3,
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
const mapStateToProps = (state, ownProps) => ({
  // contacts: state.contactReducer.contacts,
  // parentid: state.parentidReducer.parentid,
});

const mapDispatchToProps = {
  setLoggedIn,
  setToken,
  setUserType,
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
