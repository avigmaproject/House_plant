import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../SmartComponent/Header";
import ButtonView from "../SmartComponent/ButtonView";

class Membership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.Pay();
    this.GetProductInfo();
  };

  GetProductInfo = async () => {
    let product = await fetch(
      "https://api.stripe.com/v1/products/prod_KrlLMmhTBhXTA9",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${STRIPE_SECKRET_KEY}`,
        },
        method: "get",
      }
    ).then((response) => response.json());
    console.log(product);
    let Price = await fetch(
      "https://api.stripe.com/v1/prices/price_1KCjM5GJpgN7Tc88Bd8VrVj5",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${STRIPE_SECKRET_KEY}`,
        },
        method: "get",
      }
    ).then((response) => response.json());
    console.log(Price);
  };
  Pay = async () => {};

  render() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/background.jpeg")}
          resizeMode="stretch"
          style={{ height: "100%" }}
        >
          <SafeAreaView style={{ height: "100%", backgroundColor: "#53a20a" }}>
            <Header
              back={true}
              search={false}
              notification={false}
              navigation={this.props.navigation}
              title={"Membership"}
            />
            <View style={{ marginTop: "20%" }}>
              <Image
                resizeMode={"contain"}
                source={{
                  uri:
                    "https://media.ugaoo.com/catalog/product/cache/81d2f56800d33f099d2b369affd8e374/f/i/fiddleleaffigmedium_45.png",
                }}
                style={{
                  width: "60%",
                  height: "60%",
                  marginRight: 15,
                  alignSelf: "center",
                }}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    color: "gray",
                    fontFamily: "Roboto-Light",
                    fontSize: 18,
                    lineHeight: 30,
                  }}
                >
                  Buy Premium Memburship to enjoy
                </Text>
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: 20,
                    fontWeight: "bold",
                    lineHeight: 30,
                  }}
                >
                  ADVANCE FEATURES
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "red",
                    // fontFamily: "CedarvilleCursive-Regular",
                  }}
                >
                  Only for $4.99
                </Text>
              </View>
              <View style={{ marginTop: 20, alignSelf: "center" }}>
                <ButtonView onPress={() => this.Pay()} title="Pay Now" />
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

export default Membership;
