import React, { Component } from "react";
import { Text, View, ImageBackground, SafeAreaView, Alert } from "react-native";
import Header from "../SmartComponent/Header";
import ButtonView from "../SmartComponent/ButtonView";
import { canclesubscription, userprofile } from "../Utils/apiconfig";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { setProfile } from "../store/action/profile/action";
import { Snackbar } from "react-native-paper";

class Plan extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }
  GetUserProfile = async () => {
    this.setState({ isLoading: true });
    let data = {
      Type: 2,
    };
    // console.log("userprofile", data, this.props.token);
    await userprofile(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0][0]);
        this.props.setProfile(res[0][0]);
        alert("Subscription cancelled successfully.");
        this.props.navigation.navigate("Home");
        this.setState({
          isLoading: false,
        });
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
  CancleSubscriptionalert = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel this subscription?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancle"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => this.CancleSubscription(),
        },
      ]
    );
  };
  onDismissSnackBar() {
    this.props.navigation.navigate("Home");
    this.setState({
      visible: false,
    });
  }
  CancleSubscription = async () => {
    this.setState({ isLoading: true });
    let data = {
      Type: 4,
    };
    console.log(data, this.props.token);
    await canclesubscription(data, this.props.token)
      .then((res) => {
        console.log("res: ", res);
        this.setState({ isLoading: false });

        this.GetUserProfile();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
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
      <SafeAreaView style={{ height: "100%", backgroundColor: "#53a20a" }}>
        <ImageBackground
          source={require("../../assets/plan_app_images/background.jpeg")}
          resizeMode="stretch"
          style={{ height: "100%" }}
        >
          <Spinner visible={this.state.isLoading} />

          <Header
            back={true}
            search={false}
            notification={false}
            navigation={this.props.navigation}
            title={"My Plans"}
          />
          <View
            style={{
              marginTop: "10%",
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                // color: "#53a20a",
                fontSize: 20,
                fontWeight: "bold",
                lineHeight: 30,
              }}
            >
              Hi{"  "}
              <Text
                style={{
                  color: "#53a20a",
                  fontSize: 30,
                  fontWeight: "bold",
                  lineHeight: 30,
                }}
              >
                {this.props.profile.User_Name}{" "}
              </Text>
              , we appreciate you being a part of The Fiddle Leaf Fig Community.
              You can cancel your subscription at any time. Thanks!
            </Text>
            <View style={{ marginTop: 20, alignSelf: "center" }}>
              <ButtonView
                onPress={() => this.CancleSubscriptionalert()}
                title="Cancel Subscription"
              />
            </View>
          </View>
        </ImageBackground>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => console.log("close")}
          style={{ backgroundColor: "#53a20a" }}
          duration={1000}
          action={{
            label: "close",
            onPress: () => {
              this.onDismissSnackBar();
            },
          }}
        >
          Subscription cancelled successfully.
        </Snackbar>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  profile: state.profileReducer.profile,
});

const mapDispatchToProps = {
  setProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(Plan);
