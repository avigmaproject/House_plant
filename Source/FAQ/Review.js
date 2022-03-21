import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Keyboard,
  FlatList,
  Image,
} from "react-native";
import Header from "../SmartComponent/Header";
import Spinner from "react-native-loading-spinner-overlay";
import InputText from "../SmartComponent/InputText";
import ButtonView from "../SmartComponent/ButtonView";
import { connect } from "react-redux";
import {
  createupdatequesmaster,
  getquestionmaster,
  registerstoreplantimage,
} from "../Utils/apiconfig";
import { Snackbar } from "react-native-paper";
import KeyboardSpacer from "react-native-keyboard-spacer";
import FaqData from "./FaqData";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import {
  setPlantImage,
  DeletePlantImage,
  setPlantImageArr,
} from "../store/action/homedata/action";
const options = [
  "Cancel",
  <View>
    <Text style={{ color: "#53a20a" }}>Gallery</Text>
  </View>,
  <Text style={{ color: "#53a20a" }}>Camera</Text>,
];
class Review extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      ErrorTitle: null,
      ErrorDescription: null,
      ErrorImage: null,
      form: [],
      visible: false,
      color: "",
      filterModal: false,
      listquestion: [],
      show: false,
      id: 0,
      singlequestion: [],
      askquestion: false,
      imagePath: [],
      singleimage: "",
      setimagearr: [],
      setimage: [],
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.setState({ askquestion: false });
      this.ListQuestion();
    });
  }
  componentWillUnmount() {
    this._unsubscribe;
  }
  onPressEdit = async () => this.ActionSheet.show();

  ImageGallery = async () => {
    setTimeout(
      function () {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          // multiple: true,
          compressImageQuality: 0.5,
        }).then((image) => {
          console.log("im minal", image);
          this.uploadImage("gallery", image);
        });
      }.bind(this),
      1000
    );
  };
  ImageCamera = async () => {
    setTimeout(
      function () {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          // multiple: true,
          compressImageQuality: 0.5,
        }).then((image) => {
          console.log("im minal", image);
          this.uploadImage("camera", image);
        });
      }.bind(this),
      1000
    );
  };
  uploadImage = async (type, image) => {
    this.setState({ isLoading: true });
    // let setimagearr = [];
    // let setimage = [];
    // if (type === "camera") {
    //   let data = JSON.stringify({
    //     Type: 1,
    //     Image_Base: "data:image/png;base64, " + image.data,
    //   });
    //   console.log(data, this.props.token);
    //   // return 0;
    //   await registerstoreplantimage(data, this.props.token)
    //     .then((res) => {
    //       this.state.setimage.push({
    //         QI_ImageName: image.modificationDate,
    //         QI_ImagePath: res[0].Image_Path,
    //         QI_Size: image.size,
    //       });
    //       this.state.setimagearr.push(res[0].Image_Path);

    //       console.log("res:registerstoreplantimage", res[0].Image_Path);
    //     })
    //     .catch((error) => {
    //       if (error.request) {
    //         console.log(error.request);
    //       } else if (error.responce) {
    //         console.log(error.responce);
    //       } else {
    //         console.log(error);
    //       }
    //     });
    //   this.props.setPlantImage(this.state.singleimage);
    // } else {
    //   for (let i = 0; i < image.length; i++) {
    //     let data = JSON.stringify({
    //       Type: 1,
    //       Image_Base: "data:image/png;base64, " + image[i].data,
    //     });
    //     console.log(data, this.props.token);
    //     await registerstoreplantimage(data, this.props.token)
    //       .then((res) => {
    //         this.state.setimagearr.push(res[0].Image_Path);
    //         console.log(res);
    //         this.state.setimage.push({
    //           QI_ImageName: image[i].filename,
    //           QI_ImagePath: res[0].Image_Path,
    //           QI_Number: i + 1,
    //           QI_IsFirst: i === 0 ? true : false,
    //           QI_Size: image[i].size,
    //         });
    //       })
    //       .catch((error) => {
    //         if (error.request) {
    //           console.log(error.request);
    //         } else if (error.responce) {
    //           console.log(error.responce);
    //         } else {
    //           console.log(error);
    //         }
    //       });
    //   }
    //   this.props.setPlantImage(this.state.setimage);
    // }
    let data = JSON.stringify({
      Type: 1,
      Image_Base: "data:image/png;base64, " + image.data,
    });
    console.log(data, this.props.token);
    // return 0;
    await registerstoreplantimage(data, this.props.token)
      .then((res) => {
        this.props.plantimage.push({
          QI_ImageName: image.modificationDate,
          QI_ImagePath: res[0].Image_Path,
          QI_Size: image.size,
        });
        this.state.setimage.push({
          QI_ImageName: image.modificationDate,
          QI_ImagePath: res[0].Image_Path,
          QI_Size: image.size,
        });
        this.state.setimagearr.push(res[0].Image_Path);

        console.log("res:registerstoreplantimage", res[0].Image_Path);
      })
      .catch((error) => {
        if (error.request) {
          console.log(error.request);
        } else if (error.responce) {
          console.log(error.responce);
        } else {
          console.log(error);
        }
      });
    this.props.setPlantImageArr(this.state.setimagearr);

    this.setState({ ErrorImage: null, isLoading: false });
    this.Clean();
  };
  Clean = () => {
    ImagePicker.clean()
      .then(() => {
        console.log("removed all tmp images from tmp directory");
      })
      .catch((e) => {
        // alert(e);
      });
  };
  Validation = () => {
    this.setState({ isLoading: false });
    const invalidFields = [];
    const { title, description } = this.state.form;

    if (!title) {
      invalidFields.push("title");
      this.setState({ ErrorTitle: "Title is required." });
    } else {
      this.setState({ ErrorTitle: null });
    }
    if (!description) {
      invalidFields.push("description");
      this.setState({ ErrorDescription: "Description is required." });
    } else {
      this.setState({ ErrorDescription: null });
    }
    if (this.props.plantimagearr.length < 3) {
      invalidFields.push("ErrorImage");
      this.setState({ ErrorImage: "Please select atleast 3 images." });
    } else {
      this.setState({ ErrorImage: null });
    }
    console.log(invalidFields);
    return invalidFields.length > 0;
  };
  onHandleChange = (key, value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: value,
      },
    });
  };
  onDismissSnackBar() {
    this.ListQuestion();
    this.setState({
      visible: false,
    });
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

  onHnadleReview = async () => {
    this.setState({ isLoading: true });
    Keyboard.dismiss();
    this.props.setPlantImage(this.state.setimage);
    // console.log("setPlantImage", this.props.plantimage[0]);
    console.log("setimage", this.state.setimage);
    // return 0;
    const validate = this.Validation();
    const { title, description } = this.state.form;
    if (!validate) {
      let data = {
        Question_Title: title,
        Question_Desc: description,
        Question_UserID: this.props.profile.User_PkeyID,
        Question_IsActive: 1,
        strquestions_Image_DTOs: JSON.stringify(this.state.setimage),
        Type: 1,
      };
      console.log("minallllll", data);
      // return 0;
      await createupdatequesmaster(data, this.props.token)
        .then((res) => {
          console.log("res:minalend ", JSON.stringify(res));
          this.setState({
            isLoading: false,
            visible: true,
            message: "Your Question is added successfully",
            askquestion: !this.state.askquestion,
            color: "#53a20a",
            form: {
              title: "",
              description: "",
            },
          });
          alert("Your Question is added successfully.");
          this.props.DeletePlantImage();
        })
        .catch((error) => {
          if (error.response) {
            console.log("responce_error", error.response);
            this.setState({
              isLoading: false,
              color: "red",
              visible: true,
              message: "Some Response Error",
            });
          } else if (error.request) {
            this.setState({
              isLoading: false,
              color: "red",
              visible: true,
              message: "Some Request Error",
            });
            console.log("request error", error.request);
          }
        });
    } else {
      this.setState({ isLoading: false });
    }
  };

  _ListEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20 }}>No Question</Text>
      </View>
    );
  };
  AskQuestion = () => {
    this.setState({ askquestion: !this.state.askquestion });
  };
  _renderItem = (item) => {
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
          style={{
            height: 100,
            width: 100,
            borderRadius: 10,
          }}
          source={{
            uri: item,
          }}
        />
      </View>
    );
  };
  render() {
    const { title, description } = this.state.form;
    const { ErrorTitle, ErrorDescription, setimage } = this.state;
    // console.log("==>", this.props.plantimage);
    console.log("==11231", setimage);
    return (
      <SafeAreaView style={{ height: "100%", backgroundColor: "#53a20a" }}>
        <ImageBackground
          source={require("../../assets/plan_app_images/background.jpeg")}
          resizeMode="stretch"
          style={{ height: "100%" }}
        >
          <Spinner visible={this.state.isLoading} />

          <Header
            bigtitle={true}
            back={true}
            search={false}
            notification={false}
            navigation={this.props.navigation}
            title={"Ask the Fiddle Leaf Fig Doctor"}
          />
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            {!this.state.askquestion && (
              <>
                <View style={{ marginTop: 20, alignSelf: "center" }}>
                  <ButtonView
                    onPress={() => this.AskQuestion()}
                    title="Ask Question"
                  />
                </View>
                <View style={{ marginTop: "2%", paddingBottom: 10 }}>
                  <FlatList
                    data={this.state.listquestion}
                    ListEmptyComponent={() => {
                      return this._ListEmpty();
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
                    keyExtractor={() =>
                      "_" + Math.random().toString(36).substr(2, 9)
                    }
                  />
                </View>
              </>
            )}
            {this.state.askquestion && (
              <View>
                <View style={{ marginHorizontal: 20 }}>
                  <View
                    style={{
                      marginTop: 20,
                      // borderWidth: 1,
                      // borderColor: "lightgray",
                      // borderStyle: "dotted",
                      flexDirection: "row",
                      paddingRight: 40,
                    }}
                  >
                    <View
                      style={{
                        width: "20%",
                        alignItems: "center",
                        // backgroundColor: "pink",
                        justifyContent: "center",
                      }}
                    >
                      {/* {this.props.plantimage.length < 3 && ( */}
                      <ButtonView
                        icon={true}
                        onPress={() => this.onPressEdit()}
                        // title="Upload Image"
                      />
                      {/* )} */}
                    </View>
                    <View style={{}}>
                      <FlatList
                        horizontal
                        data={this.props.plantimagearr}
                        renderItem={({ item }) => {
                          return this._renderItem(item);
                        }}
                        keyExtractor={() =>
                          "_" + Math.random().toString(36).substr(2, 9)
                        }
                      />
                    </View>
                  </View>
                  {this.state.ErrorImage && (
                    <View style={{ width: "90%" }}>
                      <Text
                        style={{
                          color: "red",
                          marginTop: 5,
                          marginLeft: 20,
                        }}
                      >
                        {this.state.ErrorImage}
                      </Text>
                    </View>
                  )}
                  <InputText
                    title="Title"
                    placeholder="Enter Title"
                    onChangeText={(text) => this.onHandleChange("title", text)}
                    error={ErrorTitle}
                    value={title}
                    keyboardType={"default"}
                    borderWidth={1}
                    redius={10}
                  />
                  <InputText
                    title="Description"
                    placeholder="Enter Description"
                    onChangeText={(text) =>
                      this.onHandleChange("description", text)
                    }
                    error={ErrorDescription}
                    value={description}
                    // keyboardType={"default"}
                    secureTextEntry={true}
                    noOfiline={10}
                    multiline={true}
                    height={200}
                    textAlignVertical={"top"}
                    borderWidth={1}
                    redius={10}
                  />
                </View>
                <View style={{ marginTop: 20, alignSelf: "center" }}>
                  <ButtonView
                    onPress={() => this.onHnadleReview()}
                    title="Review"
                  />
                </View>
                <KeyboardSpacer topSpacing={10} />
              </View>
            )}
            <ActionSheet
              ref={(o) => (this.ActionSheet = o)}
              title={
                <Text
                  style={{
                    color: "#53a20a",
                    fontSize: 20,
                  }}
                >
                  Profile Photo
                </Text>
              }
              options={options}
              cancelButtonIndex={0}
              destructiveButtonIndex={4}
              useNativeDriver={true}
              onPress={(index) => {
                if (index === 0) {
                  // cancel action
                } else if (index === 1) {
                  this.ImageGallery();
                } else if (index === 2) {
                  this.ImageCamera();
                }
              }}
            />
          </KeyboardAwareScrollView>
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => this.onDismissSnackBar()}
            style={{ backgroundColor: this.state.color }}
            duration={100}
            action={{
              label: "close",
              onPress: () => {
                this.onDismissSnackBar();
              },
            }}
          >
            {this.state.message}
          </Snackbar>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  profile: state.profileReducer.profile,
  plantimage: state.homedataReducer.plantimage,
  plantimagearr: state.homedataReducer.plantimagearr,
});

const mapDispatchToProps = {
  setPlantImage,
  DeletePlantImage,
  setPlantImageArr,
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);
