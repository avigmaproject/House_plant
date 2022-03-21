import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import Header from "../SmartComponent/Header";

import FaqData from "./FaqData";

export default class QuesAnsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singlequestion: [],
      images: [],
      imagesPath: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      const { singlequestion } = this.props.route.params;
      this.setState({
        singlequestion,
        answers: singlequestion.quest_Answer_Master_DTO,
        images: singlequestion.questions_Image_DTOs,
      });
    });
  }
  // GetImagePath = () => {
  //   let imagesPath = [];
  //   for (let i = 0; i < this.state.images.length; i++) {
  //     imagesPath.push(this.state.images[i].QI_ImagePath);
  //   }
  //   this.setState({ imagesPath });
  // };
  _renderItem = (item) => {
    console.log(item);
    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: "#53a20a",
          marginRight: 4,
          borderRadius: 10,
        }}
      >
        <Image
          resizeMode="stretch"
          style={{
            height: 100,
            width: 100,
            borderRadius: 10,
          }}
          source={{
            uri: item.QI_ImagePath,
          }}
        />
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={{ height: "100%", backgroundColor: "#53a20a" }}>
        <ImageBackground
          source={require("../../assets/plan_app_images/background.jpeg")}
          resizeMode="stretch"
          style={{ height: "100%" }}
        >
          <Header
            ans={true}
            back={true}
            search={false}
            notification={false}
            navigation={this.props.navigation}
            title={"Questionnaire"}
          />
          <View>
            <View
              style={{
                // backgroundColor: "pink",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: 20,
                marginTop: "10%",
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgray",
                  width: "90%",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, textTransform: "uppercase" }}>
                  {this.state.singlequestion.Question_Title}
                </Text>
              </View>

              <View
                style={{
                  marginTop: "5%",
                  // borderBottomWidth: 1,
                  // borderBottomColor: "lightgray",
                  width: "90%",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    textTransform: "capitalize",
                    color: "green",
                  }}
                >
                  {this.state.singlequestion.Question_Desc}
                </Text>
              </View>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
              {this.state.images.length > 0 ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={this.state.images}
                  renderItem={({ item }) => {
                    return this._renderItem(item);
                  }}
                  keyExtractor={() =>
                    "_" + Math.random().toString(36).substr(2, 9)
                  }
                />
              ) : null}
            </View>
            <View style={{ marginTop: 20, height: 500 }}>
              {this.state.answers && this.state.answers.length > 0 ? (
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      textTransform: "capitalize",
                      paddingLeft: 20,
                    }}
                  >
                    Reply from experts/users
                  </Text>
                  <FlatList
                    data={this.state.answers}
                    renderItem={({ item }) => {
                      return (
                        <View
                          style={{
                            backgroundColor: "#fff",
                            marginHorizontal: 10,
                            borderRadius: 10,
                            elevation: 1,
                            marginTop: 5,
                            marginVertical: 5,
                          }}
                        >
                          <View style={{ padding: 20 }}>
                            <Text style={{ lineHeight: 20 }}>
                              {item.Quest_Ans_Desc}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={(item) => item.Quest_Ans_Pkey}
                  />
                </View>
              ) : (
                <View
                  style={{
                    marginTop: 20,

                    width: "90%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      color: "green",
                    }}
                  >
                    No answer yet.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
