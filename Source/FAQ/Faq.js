import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../SmartComponent/Header";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class Faq extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/all-pages-bg.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <SafeAreaView style={{ height: "100%" }}>
            <Header
              search={true}
              notification={true}
              navigation={this.props.navigation}
              title={"FAQS"}
            />
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={{ marginTop: 80, marginHorizontal: 20 }}>
                <View>
                  <Text
                    style={{
                      lineHeight: 25,
                      fontFamily: "Roboto-Medium",
                      color: "#323232",
                      fontSize: 15,
                    }}
                  >
                    I've gotten a lot of question about the best Fiddle Leaf Fig
                    Plant Food. I developd my version on my research and tests
                    on my own plants. You can buy it on Amezon now for just
                    $19.99 for a one-year supply!
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "lightgray",
                    borderBottomWidth: 1,
                    paddingVertical: 20,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ paddingHorizontal: 20 }}>
                    <Text
                      style={{
                        lineHeight: 25,
                        fontFamily: "Roboto-Medium",
                        color: "#323232",
                        fontSize: 14,
                      }}
                    >
                      Are there direction on how much food to use on a house
                      plant? i have 4" potted plant.
                    </Text>
                  </View>
                  <AntDesign name={"right"} size={20} color="#323232" />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}
