import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "../SmartComponent/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import ButtonView from "../SmartComponent/ButtonView";
import { getquizmaster, userquizmasterdata } from "../Utils/apiconfig";
import * as database from "../DatabseRealm/allSchemas";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import Entypo from "react-native-vector-icons/Entypo";
import Modal from "react-native-modal";
import { RFPercentage } from "react-native-responsive-fontsize";
import HTMLView from "react-native-htmlview";
import { WebView } from "react-native-webview";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      ErrorPassword: null,
      usertype: "",
      isLoading: false,
      addData: true,
      Question: "",
      form: [],
      counter: 0,
      image: null,
      question: null,
      yes: 0,
      no: 0,
      visiblemessage: null,
      quizid: 0,
      filterModal: false,
      desc: null,
    };
  }
  componentDidMount = async () => {
    await this.OnGetQuizMaster();
    await database.DeleteAnserMaster().catch((e) => {
      console.log(e);
    });
  };

  OnGetQuizMaster = async () => {
    database
      .DeleteQuizMaster()
      .then(async () => {
        await getquizmaster(data, this.props.token)
          .then((res) => {
            console.log("res:getquizmaster ", res[0]);
            for (let i = 0; i <= res[0].length - 1; i++) {
              database
                .InsertQuizMaster(res[0][i])
                .catch((error) => console.log("insert", error));
            }
            this.setState({ addData: false });
            this.setState({ isLoading: false }, () =>
              this.queryAllUserMaster(1)
            );
          })
          .catch((error) => {
            if (error.response) {
              this.setState({ isLoading: false });
            } else if (error.request) {
              this.setState({ isLoading: false });
              console.log("request error", error.request);
            } else if (error) {
              alert(error);
              this.setState({ isLoading: false });
            }
          });
      })
      .catch((error) => console.log("insert", error));

    this.setState({ isLoading: true });
    let data = {
      QZ_PkeyID: 1,
      Type: 1,
    };
  };
  queryAllUserMaster = async (data) => {
    database
      .queryAllQuizMaster(data)
      .then(async (res) => {
        // console.log("queryAllQuizMaster======", res[0][0]);
        this.setState({
          image: res[0][0].QZ_ImagePath,
          question: res[0][0].QZ_Quiz_Name,
          yes: res[0][0].QZ_Quiz_Yes_val,
          no: res[0][0].QZ_Quiz_No_val,
          nomessage: res[0][0].QZ_Quiz_No,
          yesmessage: res[0][0].QZ_Quiz_Yes,
          quizid: res[0][0].QZ_PkeyID,
          desc: `<div>${res[0][0].QZ_Quiz_Desc}</div>`,
        });
      })
      .catch((error) => console.log("queryAllQuizMasterError", error));
  };
  AnswerNO = () => {
    if (this.state.no !== 0) {
      this.queryAllUserMaster(this.state.no);
      this.setState({ usertype: "no" }, () => {
        this.Answer();
      });
    } else {
      this.setState(
        {
          visiblemessage: this.state.nomessage,
          usertype: "no",
        },
        () => {
          this.Answer();
        }
      );
    }
  };
  AnswerYES = () => {
    if (this.state.yes !== 0) {
      // alert("1");
      this.setState({ usertype: "yes" }, () => {
        this.Answer();
      });
      this.queryAllUserMaster(this.state.yes);
    } else {
      this.setState(
        {
          visiblemessage: this.state.yesmessage,
          usertype: "yes",
        },
        () => {
          this.Answer();
        }
      );
    }
  };
  Answer = () => {
    let data = {
      QA_PkeyID: parseInt(Math.floor(Math.random() * 100) + 1),
      QU_UserID: this.props.profile.User_PkeyID,
      QU_QuizID: this.state.quizid,
      QU_Quiz_Answer: this.state.usertype,
    };
    // console.log("***AnswerAnswer****", data);
    database
      .InsertAnswerMaster(data)
      .then(() => {
        // console.log("insert");
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      this.setState({ usertype: "" });
    }, 100);
  };

  onHandleSubmitalert = () => {
    Alert.alert(
      "Thank you!",
      "Thank you for taking the time.We truly value the information you have provided. Your responses will contribute to our analyses of the texts.",
      [
        {
          text: "OK",
          onPress: () => this.onHandleSubmit(),
        },
      ]
    );
  };

  onHandleSubmit = async () => {
    this.setState({ isLoading: true });
    database
      .queryAllAnswerMaster()
      .then(async (res) => {
        // console.log("response anser", res[0]);
        let data = {
          User_Quiz_Master_Data: JSON.stringify(res[0]),
          Type: 1,
        };
        // console.log("getquizmaster", data, this.props.token);
        await userquizmasterdata(data, this.props.token)
          .then((res) => {
            console.log("res: ", res[0]);
            console.log("minal", this.props.membership);
            if (this.props.profile.User_Ispaid) {
              this.props.navigation.navigate("Home");
            } else {
              this.setState({ filterModal: true });
            }
            this.setState({
              visiblemessage: null,
              usertype: "",
            });
            database
              .DeleteAnserMaster()
              .then(() => {
                this.queryAllUserMaster(1);
              })
              .catch((error) => console.log("DeleteAnserMaster", error));

            this.setState({ isLoading: false });
          })
          .catch((error) => {
            if (error.response) {
              this.setState({ isLoading: false });
            } else if (error.request) {
              this.setState({ isLoading: false });
              console.log("request error", error.request);
            } else if (error) {
              alert(error);
              this.setState({ isLoading: false });
            }
          });
      })
      .catch((error) => console.log("insert", error));
  };
  renderImportModal = () => {
    return (
      <Modal
        animationType={"fade"}
        // transparent={true}
        isVisible={this.state.filterModal}
        style={{ flex: 1 }}
      >
        <SafeAreaView>
          <ScrollView contentContainerStyle={{}}>
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  // backgroundColor: "pink",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingRight: 10,
                  // marginTop: 20,
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      filterModal: !this.state.filterModal,
                    })
                  }
                >
                  <Entypo name="cross" size={20} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: 20,
                    fontWeight: "bold",
                    lineHeight: 30,
                  }}
                >
                  "Ask the Fiddle Leaf Fig Dr”
                </Text>
                {/* <Image
              resizeMode={"contain"}
              source={{
                uri:
                  "https://media.ugaoo.com/catalog/product/cache/81d2f56800d33f099d2b369affd8e374/f/i/fiddleleaffigmedium_45.png",
              }}
              style={{
                width: "20%",
                height: "20%",
                marginRight: 15,
                alignSelf: "center",
              }}
            /> */}
                <Text
                  style={{
                    color: "gray",
                    fontFamily: "Roboto-Bold",
                    // fontFamily: "Roboto-Light",
                    fontSize: RFPercentage(1.5),
                    lineHeight: 30,
                  }}
                >
                  This
                  <Text
                    style={{
                      color: "#53a20a",
                      fontSize: RFPercentage(2),
                      fontWeight: "bold",
                      lineHeight: 30,
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
                  {"\u25CF"} My plant has stopped growing, what is wrong?{"\n"}
                  {"\u25CF"} My fiddle leaf fig has brown spots, what is wrong?
                  {"\n"}
                  {"\u25CF"} When you become a subscriber you have the ability
                  to ask your fiddle leaf fig questions and submit photos.
                </Text>
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: RFPercentage(2),
                    // fontSize: 18,
                    fontWeight: "bold",
                    lineHeight: 25,
                  }}
                >
                  Follow the prompts and a fiddle leaf fig expert will respond
                  soon! Buy Premium Membership to enjoy
                </Text>
              </View>

              <View style={{ marginTop: 20, alignSelf: "center" }}>
                <ButtonView onPress={() => this.Call()} title="Pay Now" />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };
  Call = () => {
    this.setState({
      filterModal: !this.state.filterModal,
    });
    this.props.navigation.navigate("Payment");
  };
  render() {
    console.log("filterModal", this.state.filterModal);
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
            title={"Quiz"}
          />
          <ScrollView>
            <View style={{ marginTop: "10%", marginHorizontal: 20 }}>
              {this.state.visiblemessage ? (
                <View
                  style={{
                    // backgroundColor: "pink",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      ...styles.text,
                      fontSize: 20,
                      color: "#53a20a",
                      fontWeight: "bold",
                      marginBottom: 20,
                    }}
                  >
                    {this.state.visiblemessage}.
                  </Text>
                  <HTMLView
                    onLinkPress={(url) =>
                      this.props.navigation.navigate("Faq", {
                        url,
                        title: "Product",
                        routes: "quiz",
                      })
                    }
                    value={this.state.desc}
                    stylesheet={styles}
                  />
                  {/* <View
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <WebView
                        source={{
                          html: this.state.desc,
                        }}
                        domStorageEnabled={true}
                        allowUniversalAccessFromFileURLs={true}
                        allowFileAccessFromFileURLs={true}
                        mixedContentMode="always"
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "blue",
                          marginTop: 20,
                        }}
                      />
                    </View> */}

                  <ButtonView
                    onPress={() => this.onHandleSubmitalert()}
                    title="Submit"
                  />
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      // height: "20%",
                      justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>{this.state.question}</Text>
                  </View>

                  {this.state.question ? (
                    <View
                      style={{
                        flexDirection: "row",
                        width: "50%",
                        justifyContent: "space-between",
                        marginTop: 20,
                        // backgroundColor: "pink",
                      }}
                    >
                      {this.state.usertype === "yes" ? (
                        <TouchableOpacity
                          onPress={() => this.AnswerYES()}
                          style={styles.radio}
                        >
                          <AntDesign
                            name="checkcircleo"
                            size={20}
                            color={"gray"}
                          />

                          <Text style={styles.text}>Yes</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => this.AnswerYES()}
                          style={styles.radio}
                        >
                          <MaterialCommunityIcons
                            name="circle-outline"
                            size={22}
                            color={"gray"}
                          />
                          <Text style={styles.text}>Yes</Text>
                        </TouchableOpacity>
                      )}
                      {this.state.usertype === "no" ? (
                        <TouchableOpacity
                          onPress={() => this.AnswerNO()}
                          style={styles.radio}
                        >
                          <AntDesign
                            name="checkcircleo"
                            size={20}
                            color={"gray"}
                          />

                          <Text style={styles.text}>No</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => this.AnswerNO()}
                          style={styles.radio}
                        >
                          <MaterialCommunityIcons
                            name="circle-outline"
                            size={22}
                            color={"gray"}
                          />
                          <Text style={styles.text}>No</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    <View>
                      <Text>Loading......</Text>
                    </View>
                  )}

                  {this.state.image && (
                    <View style={{ height: 300 }}>
                      <Image
                        resizeMode={"contain"}
                        source={{ uri: this.state.image }}
                        style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: "center",
                          marginTop: 20,
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>

            {this.renderImportModal()}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "Roboto-Light",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  radio: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    // backgroundColor: "red",
    alignItems: "center",
  },
  a: {
    fontWeight: "300",
    color: "blue", // make links coloured pink
  },
});
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  profile: state.profileReducer.profile,
});

export default connect(mapStateToProps)(Quiz);
