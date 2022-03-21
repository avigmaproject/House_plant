import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import PaymentFormView from "./PaymentFormView";
import Header from "../SmartComponent/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";

export default class AddSubscriptionView extends Component {
  render() {
    return (
      <SafeAreaView style={{ height: "100%", backgroundColor: "#53a20a" }}>
        <ImageBackground
          source={require("../../assets/plan_app_images/background.jpeg")}
          resizeMode="stretch"
          style={{ height: "110%" }}
        >
          <Header
            back={true}
            search={false}
            notification={false}
            navigation={this.props.navigation}
            title={"Membership"}
          />
          <Spinner visible={this.props.submitted} />
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: 20,
                    fontWeight: "bold",
                    lineHeight: 25,
                    marginTop: 10,
                  }}
                >
                  "Ask the Fiddle Leaf Fig Dr”
                </Text>
                <Text
                  style={{
                    color: "gray",
                    fontFamily: "Roboto-Bold",
                    fontSize: 13,
                    lineHeight: 25,
                    marginTop: 10,
                  }}
                >
                  This
                  <Text
                    style={{
                      color: "#53a20a",
                      fontSize: 12,
                      fontWeight: "bold",
                      lineHeight: 25,
                    }}
                  >
                    {"  "}$5 Premium{"  "}
                  </Text>
                  Feature is for fiddle leaf fig owners who need personalized
                  help! Browse the list below then sign up for individual help
                  with your plant.{"\n"}
                  {"\u25CF"} Where to notch my plant for branching?{"\n"}
                  {"\u25CF"} Where should I place my Fiddle Leaf Fig in the
                  room?
                  {"\n"}
                  {"\u25CF"} What kind of insect is on my plant and what do I do
                  to get rid of it?{"\n"}
                  {"\u25CF"} What is wrong with my Propagated Cutting and why
                  won’t it grow roots?{"\n"}
                  {"\u25CF"} My plant has stopped growing, what is wrong?
                  {"\n"}
                  {"\u25CF"} My fiddle leaf fig has brown spots, what is wrong?
                  {"\n"}
                  {"\u25CF"} When you become a subscriber you have the ability
                  to ask your fiddle leaf fig questions and submit photos.
                </Text>
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: 15,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Follow the prompts and a fiddle leaf fig expert will respond
                  soon! Buy Premium Membership to enjoy
                </Text>
              </View>
              <View style={styles.cardFormWrapper}>
                <PaymentFormView {...this.props} />
              </View>
            </View>
            <KeyboardSpacer />
          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWrapper: {
    margin: 10,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10,
  },
});
