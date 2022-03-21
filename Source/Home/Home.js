import React, { Component } from "react";
import {
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Text,
} from "react-native";
import Header from "../SmartComponent/Header";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { gethouseplant } from "../Utils/apiconfig";
import { connect } from "react-redux";
import { setHomeData } from "../store/action/homedata/action";
import HomeData from "./HomeData";
import { Snackbar } from "react-native-paper";

const DATA1 = [
  {
    image: require("../../assets/plan_app_images/plant.png"),
    title: "Money Plant Golden",
    Price: "20.00",
  },
  {
    image: require("../../assets/plan_app_images/plant.png"),
    title: "Monstera Deliciosa",
    Price: "20.00",
  },
  {
    image: require("../../assets/plan_app_images/plant.png"),
    title: "Monstera Deliciosa",
    Price: "20.00",
  },
  {
    image: require("../../assets/plan_app_images/plant.png"),
    title: "Monstera Deliciosa",
    Price: "20.00",
  },
  {
    image: require("../../assets/plan_app_images/plant.png"),
    title: "Monstera Deliciosa",
    Price: "20.00",
  },
  {
    image: require("../../assets/plan_app_images/plant.png"),
    title: "Monstera Deliciosa",
    Price: "20.00",
  },
  {
    image: require("../../assets/plan_app_images/plant.png"),
    title: "Monstera Deliciosa",
    Price: "20.00",
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.userNameInputRef = React.createRef();
    this.state = {
      filterModal: false,
      DATA: [],
      isLoading: false,
      msg: null,
      color: null,
      visible: false,
    };
  }

  componentDidMount = async () => {
    this.GetHousePlant();
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      if (this.props.route.params) {
        this.setState({
          filterModal: this.props.route.params.filterModal,
        });
      }
    });
  };

  onDismissSnackBar() {
    this.setState({
      visible: false,
    });
  }
  GetHousePlant = async () => {
    this.setState({ isLoading: true });
    let data = {
      HP_pkeyID: 1,
      Type: 1,
    };
    console.log("gethouseplant", data, this.props.token);
    await gethouseplant(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0]);
        this.setState({ isLoading: false, DATA: res[0] });
        this.props.setHomeData(res[0]);
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ isLoading: false });
          console.log("error.response", error.response);
          this.setState({
            msg: error.response.data.Message,
            color: "red",
            visible: true,
          });
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
      this.GetHousePlant();
    });
  }
  searchFilterFunction = (text) => {
    this.setState({ searchInput: text });
    if (text) {
      const newData = this.state.DATA.filter(function (item) {
        if (item.HP_ProductName) {
          const itemData = item.HP_ProductName
            ? item.HP_ProductName.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      console.log(newData);
      this.props.setHomeData(newData);
    } else {
      this.props.setHomeData(this.state.DATA);
    }
  };

  renderImportModal = () => {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        isVisible={this.state.filterModal}
        avoidKeyboard={false}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#FF4948",
                borderRadius: 50,
                paddingVertical: 4,
                paddingHorizontal: 2,
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                this.setState({
                  filterModal: !this.state.filterModal,
                  searchInput: null,
                })
              }
            >
              <Entypo name="cross" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={{
                backgroundColor: "#fff",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                borderRadius: 50,
                flexDirection: "row",
              }}
            >
              <Feather name="search" size={20} color="#000" />
              <TextInput
                style={{
                  height: 40,
                  width: "70%",
                  paddingLeft: 20,
                }}
                onChangeText={(text) => {
                  this.searchFilterFunction(text);
                }}
                value={this.state.searchInput}
                placeholder={"Search"}
                placeholderTextColor="#4E4E4E"
                autoFocus={true}
              />

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    filterModal: !this.state.filterModal,
                    searchInput: null,
                  })
                }
              >
                <AntDesign name="arrowright" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    const { isLoading } = this.state;
    return (
      <SafeAreaView style={{ height: "100%", backgroundColor: "#53a20a" }}>
        <ImageBackground
          source={require("../../assets/plan_app_images/background.jpeg")}
          resizeMode="stretch"
          style={{ height: "100%", width: "100%" }}
        >
          <Header
            search={true}
            notification={true}
            navigation={this.props.navigation}
            title={"Home"}
            searchdata={() =>
              this.setState({ filterModal: !this.state.filterModal })
            }
          />
          <Spinner visible={isLoading} />
          <View style={{ marginBottom: 60 }}>
            <HomeData
              Data={this.props.data}
              navigation={this.props.navigation}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={() => this.onRefresh()}
                />
              }
            />
          </View>
          {this.renderImportModal()}

          <Snackbar
            visible={this.state.visible}
            onDismiss={() => console.log("close")}
            style={{ backgroundColor: this.state.color }}
            duration={1000}
            action={{
              label: "close",
              onPress: () => {
                this.onDismissSnackBar();
              },
            }}
          >
            {this.state.msg}
          </Snackbar>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  data: state.homedataReducer.data,
});

const mapDispatchToProps = {
  setHomeData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
