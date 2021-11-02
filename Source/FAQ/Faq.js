import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Linking,
} from "react-native";
import Header from "../SmartComponent/Header";
// import FaqData from "./FaqData";
import { WebView } from "react-native-webview";

const DATA = [
  {
    id: "1",
    image: require("../../assets/plan_app_images/plant.png"),
    question:
      "Are there directions on how much food to use on a houseplant? I have 4″ potted plants.",
    answer:
      "Yes; you use 1 teaspoonful diluted in 2 cups of water, and water each week as normal.",
  },
  {
    id: "2",
    image: require("../../assets/plan_app_images/plant.png"),
    question:
      "How do I know if my plant is getting enough fertilizer? I asked my plant, but it won’t reply.",
    answer:
      "For optimal growth, fertilize your fiddle leaf fig each week throughout the year. Read our blog post that discusses this specifically.",
  },
  {
    id: "3",
    image: require("../../assets/plan_app_images/plant.png"),
    question: "What color is the fertilizer?",
    answer: "It is a clear liquid with a blue tint.",
  },
  {
    id: "4",
    image: require("../../assets/plan_app_images/plant.png"),
    question:
      "What’s an NPK ratio and what does it mean for my fiddle leaf fig?",
    answer:
      "NPK is the abbreviation for nitrogen (N), phosphorus (P), and potassium (K), the key nutrients for plant growth. We created Fiddle Leaf Fig Plant Food with the ideal NPK ratio of 3-1-2 to support healthy roots, leaves, and growth in your fiddle leaf fig.",
  },
  {
    id: "5",
    image: require("../../assets/plan_app_images/plant.png"),
    question: "Can I use this on succulents?",
    answer: "We do not recommend this product for succulents.",
  },
  // {
  //   id: "6",
  //   image: require("../../assets/plan_app_images/plant.png"),
  //   question: "How do I learn more about these beautiful plants?",
  //   answer:
  //     "There’s a lot of information online, but an essential reference is The Fiddle Leaf Fig Expert: Your Guide to Growing Healthy Ficus Lyrata Plants.    ",
  // },
];
export default class Faq extends Component {
  constructor(props) {
    super(props);
    this.userNameInputRef = React.createRef();
    this.state = {
      filterModal: false,
      DATA: [],
      isLoading: false,
      show: false,
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
  setData(id) {
    // alert(this.state.show);
    this.setState({
      show: !this.state.show,
      id,
    });
  }
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
            <WebView
              source={{ uri: "https://houseplantresourcecenter.com/faq/" }}
              style={{ height: "100%", width: "95%", alignSelf: "center" }}
              onError={(syntheticEvent) => {
                <View>
                  <Text>Error while loading page</Text>
                </View>;
              }}
            />
            {/* <ScrollView keyboardShouldPersistTaps="always">
              <View style={{ marginTop: 80, marginHorizontal: 20 }}> */}

            {/* <FaqData
                    question="How do I learn more about these beautiful plants?"
                    answer="There’s a lot of information online, but an
                              essential reference is"
                    onpress={() => this.setData(6)}
                    show={this.state.show}
                    id={this.state.id}
                    link={
                      "The Fiddle Leaf Fig Expert: Your Guide to Growing Healthy Ficus Lyrata Plants."
                    }
                  /> */}
            {/* <View
                      style={{
                        borderBottomColor: "lightgray",
                        borderBottomWidth: 1,
                        paddingVertical: 20,
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          // backgroundColor: "red",
                          width: "90%",
                          paddingHorizontal: 20,
                        }}
                        onPress={() =>
                          this.setState({
                            show: !this.state.show,
                            id: 6,
                          })
                        }
                      >
                        <Text
                          style={{
                            lineHeight: 25,
                            fontFamily: "Roboto-Medium",
                            color: "#323232",
                            fontSize: 14,
                          }}
                        >
                          {"How do I learn more about these beautiful plants?"}
                        </Text>
                        {this.state.show && this.state.id == 6 && (
                          <View style={{ marginTop: 10 }}>
                            <Text
                              style={{
                                lineHeight: 25,
                                fontFamily: "Roboto-Medium",
                                fontSize: 14,
                              }}
                            >
                              There’s a lot of information online, but an
                              essential reference is
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                this.OpenUrl(
                                  "https://www.amazon.com/gp/product/1719216150/ref=as_li_tl?ie=UTF8&tag=indigomarke0c-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=1719216150&linkId=b756a280fb653f09f7a029d45badbf6c"
                                )
                              }
                            >
                              <Text
                                style={{
                                  lineHeight: 25,
                                  fontFamily: "Roboto-Medium",
                                  fontStyle: "italic",
                                  color: "blue",
                                  fontSize: 14,
                                }}
                              >
                                The Fiddle Leaf Fig Expert: Your Guide to
                                Growing Healthy Ficus Lyrata Plants.
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            show: !this.state.show,
                            id: 6,
                          })
                        }
                      >
                        {this.state.show && this.state.id == 6 ? (
                          <AntDesign name={"down"} size={20} color="#323232" />
                        ) : (
                          <AntDesign name={"right"} size={20} color="#323232" />
                        )}
                      </TouchableOpacity>
                    </View> */}
            {/* </ScrollView> */}
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}
