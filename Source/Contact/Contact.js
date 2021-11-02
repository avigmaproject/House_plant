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

export default class Contact extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/all-pages-bg.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <SafeAreaView>
            <Header
              back={false}
              search={true}
              notification={true}
              navigation={this.props.navigation}
              title={"Contact"}
            />
            <View style={{ marginTop: 100, marginHorizontal: 20 }}>
              <View>
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
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                  marginTop: 50,
                }}
              >
                <Image
                  resizeMode={"stretch"}
                  source={require("../../assets/plan_app_images/envelope-icon.png")}
                  style={styles.icon}
                />
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "mailto:claire@houseplantresourcecenter.com"
                    )
                  }
                >
                  <Text
                    style={{
                      color: "#4E4E4E",
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
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
});
