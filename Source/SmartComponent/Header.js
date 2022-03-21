import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  PixelRatio,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;
export default class Header extends Component {
  normalize = (size) => {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  };
  render() {
    return (
      <View
        style={{
          height: this.props.bigtitle ? 50 : 50,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          // backgroundColor: "pink",
        }}
      >
        {this.props.back ? (
          <View style={{ width: "20%", marginLeft: 20 }}>
            {/* {this.props.ans ? ( */}
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: this.props.auth ? "#53a20a" : "#fff",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
              onPress={() =>
                this.props.ans
                  ? this.props.navigation.navigate("Review")
                  : this.props.routes
                  ? this.props.navigation.navigate("Quiz")
                  : this.props.navigation.goBack()
              }
            >
              {this.props.auth ? (
                <Ionicons name="chevron-back" size={30} color="#fff" />
              ) : (
                <Ionicons name="chevron-back" size={30} color="#53a20a" />
              )}
            </TouchableOpacity>
            {/* ) : (
                <TouchableOpacity
                  style={{
                    width: "50%",
                    backgroundColor: this.props.auth ? "#53a20a" : "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                  }}
                  onPress={() => this.props.navigation.goBack()}
                >
                  {this.props.auth ? (
                    <Ionicons name="chevron-back" size={30} color="#fff" />
                  ) : (
                    <Ionicons name="chevron-back" size={30} color="#53a20a" />
                  )}
                </TouchableOpacity>
              )} */}
          </View>
        ) : (
          <TouchableOpacity
            style={{
              width: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Feather name="align-left" size={30} color="#fff" />
          </TouchableOpacity>
        )}
        <View
          style={{
            width:
              this.props.search || this.props.notification
                ? "60%"
                : this.props.bigtitle
                ? "70%"
                : "50%",
            alignItems: this.props.bigtitle ? null : "center",
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              fontSize: this.props.bigtitle ? this.normalize(15) : 30,
              color: "#fff",
              fontFamily: "Roboto-Medium",
              // width: "110%",
            }}
          >
            {this.props.title}
          </Text>
        </View>
        {(this.props.search || this.props.notification) && (
          <View
            style={{
              flexDirection: "row",
              width: "20%",
              justifyContent: this.props.search ? "space-around" : "center",
            }}
          >
            {this.props.search && (
              <TouchableOpacity onPress={this.props.searchdata}>
                <Feather name="search" size={30} color="#fff" />
              </TouchableOpacity>
            )}
            {/* {this.props.search &&
                (this.props.searchdata ? (
                  <TouchableOpacity onPress={this.props.searchdata}>
                    <Feather name="search" size={30} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Home", {
                        filterModal: true,
                      })
                    }
                  >
                    <Feather name="search" size={30} color="#fff" />
                  </TouchableOpacity>
                ))} */}
            {this.props.notification && (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Notification")}
              >
                {/* //</View>{this.props.notification} */}
                <Ionicons name="notifications" size={30} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }
}
