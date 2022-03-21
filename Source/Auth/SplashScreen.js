import React, { Component } from "react";
import { View, ImageBackground, Image } from "react-native";
import { connect } from "react-redux";
import { setHomeData } from "../store/action/homedata/action";
import { gethouseplant } from "../Utils/apiconfig";

class SplashScreen extends Component {
  componentDidMount() {
    this.GetHousePlant();
  }
  GetHousePlant = async () => {
    this.setState({ isLoading: true });
    let data = {
      HP_pkeyID: 1,
      Type: 1,
    };
    console.log("gethouseplant", data, this.props.token);
    await gethouseplant(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0]);
        this.props.setHomeData(res[0]);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ isLoading: false });
          console.log("error.response", error.response);
        } else if (error.request) {
          this.setState({ isLoading: false });
          console.log("request error", error.request);
        } else if (error) {
          alert("Server Error");
          this.setState({ isLoading: false });
        }
      });
  };
  render() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/login.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/fiddle-leaf-fig-plant-resource-logo.png")}
              resizeMode={"contain"}
              style={{ height: 100, width: "30%" }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  data: state.homedataReducer.data,
});

const mapDispatchToProps = {
  setHomeData,
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
