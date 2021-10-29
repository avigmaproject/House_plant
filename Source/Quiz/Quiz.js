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
} from "react-native";
import Header from "../SmartComponent/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import ButtonView from "../SmartComponent/ButtonView";
import { getquizmaster, userquizmasterdata } from "../Utils/apiconfig";
import * as database from "../DatabseRealm/allSchemas";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

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
      yes: "",
      no: "",
      visiblemessage: null,
      quizid: 0,
    };
  }
  componentDidMount = async () => {
    await this.OnGetQuizMaster();
    await database.DeleteAnserMaster().catch((e) => {
      console.log(e);
    });
  };

  OnGetQuizMaster = async () => {
    this.setState({ isLoading: true });
    let data = {
      QZ_PkeyID: 1,
      Type: 1,
    };
    // console.log("getquizmaster", data);
    await getquizmaster(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0]);
        if (this.state.addData) {
          for (let i = 0; i <= res[0].length; i++) {
            database
              .InsertQuizMaster(res[0][i])
              .catch((error) => console.log("insert", error));
          }
          this.setState({ addData: false });
        }
        this.setState({ isLoading: false }, () => this.queryAllUserMaster(1));
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
  };
  queryAllUserMaster(data) {
    database
      .queryAllQuizMaster(data)
      .then((res) => {
        console.log("queryAllQuizMaster", res);
        this.setState({
          image: res[0][0].QZ_ImagePath,
          question: res[0][0].QZ_Quiz_Name,
          yes: res[0][0].QZ_Quiz_Yes_val,
          no: res[0][0].QZ_Quiz_No_val,
          nomessage: res[0][0].QZ_Quiz_No,
          yesmessage: res[0][0].QZ_Quiz_Yes,
          quizid: res[0][0].QZ_PkeyID,
        });
      })
      .catch((error) => console.log("queryAllQuizMasterError", error));
  }
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
      this.queryAllUserMaster(this.state.yes);
      this.setState({ usertype: "yes" }, () => {
        this.Answer();
      });
    } else {
      // alert("0");
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
      QA_PkeyID: Math.floor(Math.random() * 100) + 1,
      QU_UserID: this.props.profile.User_PkeyID,
      QU_QuizID: this.state.quizid,
      QU_Quiz_Answer: this.state.usertype,
    };
    console.log(data);
    database.InsertAnswerMaster(data).catch((error) => {
      Alert.alert("Error while adding!", error, [
        {
          text: "Cancel",
          onPress: () => console.log("cancle"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => console.log("okkk"),
        },
      ]);
    });
  };
  onHandleSubmit = async () => {
    this.setState({ isLoading: true });
    database
      .queryAllAnswerMaster()
      .then(async (res) => {
        console.log("response anser", res[0]);
        let data = {
          User_Quiz_Master_Data: JSON.stringify(res[0]),
          Type: 1,
        };
        console.log("getquizmaster", data, this.props.token);
        await userquizmasterdata(data, this.props.token)
          .then((res) => {
            console.log("res: ", res[0]);
            this.props.navigation.navigate("Home");
            this.setState({
              visiblemessage: null,
              usertype: "",
            });
            database
              .DeleteAnserMaster()
              .then(() => {
                Alert.alert(
                  "Thank you!",
                  "Thank you for taking the time.We truly value the information you have provided. Your responses will contribute to our analyses of the texts",
                  [
                    {
                      text: "Cancel",
                      onPress: () => this.queryAllUserMaster(1),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => this.queryAllUserMaster(1),
                    },
                  ]
                );
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
  render() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/all-pages-bg.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <Spinner visible={this.state.isLoading} />
          <SafeAreaView style={{ height: "100%" }}>
            <Header
              back={true}
              search={false}
              notification={false}
              navigation={this.props.navigation}
              title={"Quiz"}
            />
            {/* <ScrollView> */}
            <View style={{ marginTop: "20%", marginHorizontal: 20 }}>
              {this.state.visiblemessage ? (
                <View>
                  <View
                    style={{
                      height: "80%",
                      // backgroundColor: "pink",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.text,
                        fontSize: 20,
                        color: "#53a20a",
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.visiblemessage}.
                    </Text>
                  </View>
                  <ButtonView
                    onPress={() => this.onHandleSubmit()}
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
                  {this.state.image && (
                    <View style={{ height: 300 }}>
                      <Image
                        resizeMode={"stretch"}
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
          </SafeAreaView>
        </ImageBackground>
      </View>
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
});
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  profile: state.profileReducer.profile,
});

export default connect(mapStateToProps)(Quiz);
