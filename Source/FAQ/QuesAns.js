import React, { Component } from "react";
import {
  View,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Text,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "../SmartComponent/Header";
import FaqData from "./FaqData";
import { getquestionmaster } from "../Utils/apiconfig";
import { connect } from "react-redux";

class QuesAns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterModal: false,
      listquestion: [],
      isLoading: false,
      show: false,
      id: 0,
      singlequestion: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.ListQuestion();
    });
  }
  componentWillUnmount() {
    this._unsubscribe;
  }
  ListQuestion = async () => {
    this.setState({ isLoading: true });
    let data = {
      Type: 3,
    };
    console.log(data, this.props.token);
    await getquestionmaster(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0]);
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
  setData(id) {
    this.setState(
      {
        show: !this.state.show,
        id,
      },
      () => this.onHandleSingleQuestion(id)
    );
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#53a20a" }}>
        <ImageBackground
          source={require("../../assets/plan_app_images/background.jpeg")}
          resizeMode="stretch"
          style={{ height: "100%" }}
        >
          <Header
            back={true}
            search={false}
            notification={false}
            navigation={this.props.navigation}
            title={"Questionnaire"}
          />
          <Spinner visible={this.state.isLoading} />
          <View style={{ marginTop: "5%" }}>
            <FlatList
              data={this.state.listquestion}
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
                return (
                  <FaqData
                    question={item.Question_Title}
                    onpress={() => this.setData(item.Question_Pkey)}
                    show={this.state.show}
                    id={this.state.id}
                    id2={item.Question_Pkey}
                    answer={item.Question_Desc}
                  />
                );
              }}
              keyExtractor={() => "_" + Math.random().toString(36).substr(2, 9)}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
});

export default connect(mapStateToProps)(QuesAns);
