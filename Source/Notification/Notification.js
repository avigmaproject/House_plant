import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Header from "../SmartComponent/Header";
import randomColor from "randomcolor";
import { getquestionmaster } from "../Utils/apiconfig";
import { connect } from "react-redux";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import { setInitialroute } from "../store/action/auth/action";
import {
  setMembershipStauts,
  setQuestionId,
} from "../store/action/profile/action";
const DATA = [
  {
    title: "Be first to buy New feature",
    time: "7:20 AM",
    content: "Lorem Ipsum is simply dummy type setting...",
  },
  {
    title: "Password Changes",
    time: "4:30 AM",
    content: "Lorem Ipsum is simply dummy type setting...",
  },
  {
    title: "Sale is on!",
    time: "Yesterday",
    content: "Lorem Ipsum is simply dummy type setting...",
  },
  {
    title: "CashBack Offer",
    time: "Yesterday",
    content: "Lorem Ipsum is simply dummy type setting...",
  },
  {
    title: "CashBack Offer",
    time: "Yesterday",
    content: "Lorem Ipsum is simply dummy type setting...",
  },
  {
    title: "Profile Created",
    time: "Aug 1,2021",
    content: "Lorem Ipsum is simply dummy type setting...",
  },
  {
    title: "Profile Created",
    time: "Aug 4,2021",
    content: "Lorem Ipsum is simply dummy type setting...",
  },
];
class Notification extends Component {
  constructor() {
    super();
    this.state = {
      listquestion: [],
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      if (this.props.status && this.props.question) {
        this.onHandleSingleQuestion(this.props.question);
      }
      this.ListQuestion();
    });
  };
  onHandleSingleQuestion = async (quesid) => {
    this.setState({ isLoading: true });
    let data = {
      Type: 2,
      Question_Pkey: quesid,
    };
    console.log(data, this.props.token);
    await getquestionmaster(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0][0]);
        this.props.setInitialroute("Home");
        this.props.setMembershipStauts(false);
        this.props.setQuestionId(null);

        this.setState(
          { isLoading: false, show: false, singlequestion: res[0][0] },
          () =>
            this.props.navigation.navigate("QuesAnsDetail", {
              singlequestion: res[0][0],
            })
        );
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
  ListQuestion = async () => {
    this.setState({ isLoading: true });
    let data = {
      Type: 4,
    };
    console.log(data, this.props.token);
    await getquestionmaster(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0]);
        for (let i = 0; i < res[0].length; i++) {
          console.log(`item ${i + 1}`, res[0][i].quest_Answer_Master_DTO);
        }
        this.setState({ isLoading: false, listquestion: res[0] });
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
  onRefresh() {
    this.setState({ isLoading: true }, () => {
      this.ListQuestion();
    });
  }
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
            title={"Notification"}
          />
          <ScrollView>
            <View
              style={{
                marginTop: 10,
                marginHorizontal: 20,
                paddingBottom: 50,
              }}
            >
              <FlatList
                data={this.state.listquestion}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>No New Notification</Text>
                    </View>
                  );
                }}
                renderItem={({ item }) => {
                  let color = randomColor({ alpha: 0.1 });

                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.onHandleSingleQuestion(item.Question_Pkey)
                      }
                      style={{
                        backgroundColor: "#fff",
                        marginTop: 20,
                        // paddingVertical: 5,
                        // height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: color,
                          width: 30,
                          height: "100%",
                          borderTopRightRadius: 100,
                          borderBottomRightRadius: 100,
                          marginRight: 10,
                          position: "absolute",
                          left: -15,
                          // top: 8,
                        }}
                      ></View>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingVertical: 10,
                          // backgroundColor: "red",
                          paddingLeft: 10,
                          width: "90%",
                        }}
                      >
                        <View
                          style={{
                            // backgroundColor: "red",
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              // backgroundColor: "pink",
                              width: "100%",
                            }}
                          >
                            <Text style={{ color: color, fontWeight: "bold" }}>
                              {item.Question_Title}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                              {/* {moment(item.Answer_Date.trim()).fromNow()} */}
                              {item.Answer_Date.trim()}
                            </Text>
                          </View>
                          <View>
                            <Text style={{ color: "gray", lineHeight: 30 }}>
                              {item.Question_Desc}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={() =>
                  "_" + Math.random().toString(36).substr(2, 9)
                }
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  question: state.profileReducer.question,
  status: state.profileReducer.status,
});
const mapDispatchToProps = {
  setInitialroute,
  setMembershipStauts,
  setQuestionId,
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
