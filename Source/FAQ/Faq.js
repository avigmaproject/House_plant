import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Linking,
  Text,
  SafeAreaView,
} from "react-native";
import Header from "../SmartComponent/Header";
import { WebView } from "react-native-webview";
import Spinner from "react-native-loading-spinner-overlay";
export default class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterModal: false,
      DATA: [],
      isLoading: false,
      show: false,
      show2: false,
      show1: false,
      show5: false,
      url: null,
      title: "",
    };
  }
  OpenUrl = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  // setData(id, key) {
  //   // alert(key);
  //   this.setState({
  //     [key]: !this.state[key],
  //     id,
  //   });
  // }
  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.setState({ isLoading: true });
      console.log("route", this.props.route.params.routes);
      const { url, title } = this.props.route.params;
      console.log(url);
      if (url) {
        this.setState({ url, title });
      }
    });
    this.props.navigation.addListener("blur", () => {
      this.setState({ url: "" });
    });
  };
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#53a20a" }}>
        <ImageBackground
          source={require("../../assets/plan_app_images/background.jpeg")}
          resizeMode="stretch"
          style={{ height: "100%" }}
        >
          {/* <SafeAreaView style={{}}> */}
          <Header
            back={true}
            search={false}
            notification={false}
            navigation={this.props.navigation}
            title={this.state.title}
            routes={this.props.route.params.routes}
          />
          <Spinner visible={this.state.isLoading} />
          {this.state.url ? (
            <WebView
              source={{ uri: this.state.url }}
              style={{
                height: "100%",
                width: "100%",
                alignSelf: "center",
                marginTop: 10,
              }}
              onLoadStart={() => this.setState({ isLoading: true })}
              onLoad={() => this.setState({ isLoading: true })}
              onLoadEnd={() => this.setState({ isLoading: false })}
              renderLoading={() => (
                <View style={{ padding: 50 }}>
                  <Text style={{ fontSize: 40 }}>Loading...</Text>
                </View>
              )}
            />
          ) : (
            <View style={{ padding: 50 }}>
              <Text style={{ fontSize: 40 }}>Loading...</Text>
            </View>
          )}

          {/* <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ marginTop: 80, marginHorizontal: 20 }}>
              <FaqData
                question="Are there directions on how much food to use on a houseplant? I have 4″ potted plants."
                answer="Yes; you use 1 teaspoonful diluted in 2 cups of water, and water each week as normal."
                onpress={() => this.setData(1, "show1")}
                show={this.state.show1}
                id={this.state.id}
              />
              <FaqData
                question="How do I learn more about these beautiful plants?"
                answer="There’s a lot of information online, but an
                              essential reference is"
                onpress={() => this.setData(6, "show")}
                show={this.state.show}
                id={this.state.id}
                link={
                  "The Fiddle Leaf Fig Expert: Your Guide to Growing Healthy Ficus Lyrata Plants."
                }
              />
              <FaqData
                question="How do I know if my plant is getting enough fertilizer? I asked my plant, but it won’t reply."
                answer="For optimal growth, fertilize your fiddle leaf fig each week throughout the year. Read our "
                link={"blog post"}
                text1={" that discusses this specifically."}
                onpress={() => this.setData(5, "show5")}
                show={this.state.show5}
                id={this.state.id}
              />
              <FaqData
                question="Can I just use regular garden soil for my houseplants?"
                answer="All plant roots require water, nutrients, and air to survive. In the wild, the soil is constantly replenished with nutrients, aerated by earthworms, and it also has perfect drainage! However, potted houseplants sit in the same soil for months and even years. Every time you water, the soil is compacted, likely won’t drain as well as in the wild, and the nutrients are washed away. This is why it’s critical to have a houseplant soil that is specially formulated (read more "
                link={"here"}
                text1={
                  " ).Our Indoor Plant Soil is created to provide perfect drainage, aeration, and nutrients for your houseplant. Your houseplant with thank you!"
                }
                onpress={() => this.setData(2, "show2")}
                show={this.state.show2}
                id={this.state.id}
              />
            </View>
          </ScrollView> */}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
