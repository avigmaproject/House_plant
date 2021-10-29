import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../SmartComponent/Header";
import Entypo from "react-native-vector-icons/Entypo";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { gethouseplant } from "../Utils/apiconfig";
import { connect } from "react-redux";
import { setHomeData } from "../store/action/homedata/action";
import HomeData from "./HomeData";
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
    };
  }

  componentDidMount = async () => {
    this.GetHousePlant();
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      if (this.userNameInputRef.current) {
        this.userNameInputRef.current.focus();
      }
      if (this.props.route.params) {
        this.setState({
          filterModal: this.props.route.params.filterModal,
        });
      }
    });
  };
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
        } else if (error.request) {
          this.setState({ isLoading: false });
          console.log("request error", error.request);
        } else if (error) {
          alert("Server Error");
          this.setState({ isLoading: false });
        }
      });
  };

  searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = this.props.data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        // return console.log("hii", item);
        if (item.HP_ProductName) {
          const itemData = item.HP_ProductName
            ? item.HP_ProductName.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
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
                  this.setState({ searchInput: text });
                  this.searchFilterFunction(text);
                }}
                value={this.state.searchInput}
                placeholder={"Search"}
                placeholderTextColor="#4E4E4E"
                ref={this.userNameInputRef}
                onFocus={() =>
                  this.userNameInputRef.current &&
                  this.userNameInputRef.current.focus()
                }
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
      <View>
        <Spinner visible={isLoading} />
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
              title={"Home"}
              searchdata={() =>
                this.setState({ filterModal: !this.state.filterModal })
              }
            />
            <View style={{ marginBottom: 60 }}>
              <HomeData
                Data={this.props.data}
                navigation={this.props.navigation}
              />
            </View>
            {this.renderImportModal()}
          </SafeAreaView>
        </ImageBackground>
      </View>
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
