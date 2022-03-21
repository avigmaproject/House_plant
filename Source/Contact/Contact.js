import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import Header from "../SmartComponent/Header";
import { RFPercentage } from "react-native-responsive-fontsize";

export default class Contact extends Component {
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#53a20a" }}>
        <ImageBackground
          source={require("../../assets/plan_app_images/background.jpeg")}
          resizeMode="stretch"
          style={{ height: "100%" }}
        >
          <Header
            back={true}
            search={false}
            notification={false}
            navigation={this.props.navigation}
            title={"Contact Us"}
          />
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              // backgroundColor: "green",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "30%",
                // justifyContent: "center",
                // backgroundColor: "orange",
              }}
            >
              <Image
                resizeMode={"contain"}
                source={require("../../assets/plan_app_images/contact.png")}
                style={{
                  width: "100%",
                  height: "90%",
                  marginRight: 15,
                  alignSelf: "center",
                }}
              />
            </View>
            <View
              style={{
                width: "100%",
                // height: "30%",
                justifyContent: "center",
                // backgroundColor: "pink",
                // backgroundColor: "red",
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  // alignSelf: "center",
                  lineHeight: 25,
                }}
              >
                {/* 2)If you need assistance, please check for answer 3) */}
                Thanks for visiting the Houseplant Resource Center App. We love
                to hear from our users, so please let us know how you’re
                enjoying your app experience, as well as what you’d like to see
                from us in the future. Please feel free to report any bugs or
                glitches to us as well. The best way to get in touch with our
                team is by sending an email to:
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // paddingVertical: 10,
                // marginTop: 50,
                height: "8%",
                // backgroundColor: "green",
              }}
            >
              <Image
                resizeMode={"contain"}
                source={require("../../assets/plan_app_images/envelope-icon.png")}
                style={styles.icon}
              />
              <TouchableOpacity
                style={{ width: "90%" }}
                onPress={() =>
                  Linking.openURL(
                    "mailto:claire@houseplantresourcecenter.com?cc=claire@houseplantresourcecenter.com&subject=&body="
                  )
                }
              >
                <Text
                  style={{
                    color: "#53a20a",
                    ...styles.text,
                    lineHeight: 25,
                    fontStyle: "italic",
                    textDecorationLine: "underline",
                    textDecorationColor: "blue",
                  }}
                >
                  claire@houseplantresourcecenter.com
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                // backgroundColor: "pink",
                // height: "30%",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  lineHeight: 25,
                }}
              >
                For personalized houseplant help and advice, be sure to
                subscribe to our premium membership.
                {/* (we should hyperlink premium
                membership to the signup page)  */}
                It offers advanced features like our “Ask the Fiddle Leaf Fig
                Doctor” service!
              </Text>
            </View>
          </View>

          {/* <ScrollView keyboardShouldPersistTaps="always"> */}
          {/* <View style={{ marginTop: 50, marginHorizontal: 20 }}>
                <View style={{ flex: 0.3 }}>
                  <Image
                    resizeMode={"stretch"}
                    source={require("../../assets/plan_app_images/contact.png")}
                    style={{
                      width: "100%",
                      height: 200,
                      marginRight: 15,
                      alignSelf: "center",
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    padding: 20,
                    flex: 0.7,
                  }}
                >
                  <Text
                    style={{
                      color: "#53a20a",
                      fontSize: 25,
                      fontFamily: "Roboto-Medium",
                      lineHeight: 25,
                    }}
                  >
                    Get in Touch if you need any help
                  </Text>
                  <Text
                    style={{ ...styles.text, lineHeight: 25, color: "#4E4E4E" }}
                  >
                    London
                  </Text>
                  <Text
                    style={{
                      color: "#4E4E4E",
                      ...styles.text,
                      lineHeight: 25,
                    }}
                  >
                    AB union Terrace
                  </Text>
                  <Text
                    style={{
                      color: "#4E4E4E",
                      ...styles.text,
                      lineHeight: 25,
                    }}
                  >
                    E10 OGG
                  </Text>
                  <TouchableOpacity style={{ marginVertical: 20 }}>
                    <Text
                      style={{
                        color: "#53a20a",
                        ...styles.text,
                        textDecorationLine: "underline",
                      }}
                    >
                      Get Direction
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 10,
                    }}
                  >
                    <Image
                      resizeMode={"stretch"}
                      source={require("../../assets/plan_app_images/tel-icon.png")}
                      style={styles.icon}
                    />
                    <Text
                      style={{
                        color: "#4E4E4E",
                        ...styles.text,
                        lineHeight: 25,
                      }}
                    >
                      (800-123-45686897)
                    </Text>
                  </View>

                </View>
              </View> */}
          {/* </ScrollView> */}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: RFPercentage(2),
    fontFamily: "Roboto-Bold",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
});
