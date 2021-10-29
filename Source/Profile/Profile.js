import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Header from "../SmartComponent/Header";
import InputText from "../SmartComponent/InputText";
import ButtonView from "../SmartComponent/ButtonView";
import { userprofileupdate, registerStoreImage } from "../Utils/apiconfig";
import { connect } from "react-redux";
import { Avatar } from "react-native-paper";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import { Snackbar } from "react-native-paper";

const options = [
  "Cancel",
  <View>
    {/* <EvilIcons
        name="pencil"
        size={35}
        //   style={{ marginRight: 20 }}
        // color=""
      /> */}
    <Text style={{ color: "#53a20a" }}>Gallery</Text>
  </View>,
  <Text style={{ color: "#53a20a" }}>Camera</Text>,
];
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      ErrorEmail: null,
      ErrorUserEmail: null,
      ErrorFirstName: null,
      ErrorPhoneNumber: null,
      ErrorPassword: null,
      form: [],
      userdata: [],
      imagePath: "",
      chnageimage: false,
      visible: false,
    };
  }
  componentDidMount = async () => {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.GetUserProfile();
    });
  };
  onHandleChange = (key, value) => {
    if (key === "phonenumber") {
      let phonenumber = value;
      phonenumber = phonenumber.replace(/[^0-9]/gi, "");
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [key]: phonenumber,
        },
      });
    } else {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [key]: value,
        },
      });
    }
  };
  Validation = () => {
    this.setState({ isLoading: false });
    const invalidFields = [];
    const { firstname, email, password, phonenumber } = this.state.form;
    if (!firstname) {
      invalidFields.push("firstname");
      this.setState({ ErrorFirstName: "Name is required" });
    } else {
      this.setState({ ErrorFirstName: null });
    }
    if (!email) {
      invalidFields.push("password");
      this.setState({ ErrorEmail: "Email address is required" });
    } else {
      this.setState({ ErrorEmail: null });
    }
    if (!password) {
      invalidFields.push("password");
      this.setState({ ErrorPassword: "Password is required" });
    } else {
      this.setState({ ErrorPassword: null });
    }
    if (phonenumber && phonenumber.length < 10) {
      invalidFields.push("phonenumber");
      this.setState({
        ErrorPhoneNumber: "Phone number must be at least 10 digit.",
      });
    } else {
      this.setState({ ErrorPhoneNumber: null });
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email && reg.test(email) === false) {
      invalidFields.push("ErrorUserEmail");
      this.setState({ ErrorUserEmail: "Please enter valid email" });
    } else {
      this.setState({ ErrorUserEmail: null });
    }
    return invalidFields.length > 0;
  };
  onPress = () => this.ActionSheet.show();
  ImageGallery = async () => {
    setTimeout(
      function () {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          multiple: false,
          compressImageQuality: 0.5,
        }).then((image) => {
          // console.log(image.data);
          this.setState(
            {
              base64: image.data,
              fileName:
                Platform.OS === "ios" ? image.filename : "images" + new Date(),
              form: {
                ...this.state.form,
                imagePath: image.path,
              },
              chnageimage: true,
            },
            () => this.uploadImage()
          );
        });
      }.bind(this),
      1000
    );
  };
  ImageCamera = () => {
    setTimeout(
      function () {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          multiple: false,
          compressImageQuality: 0.5,
        }).then((image) => {
          // console.log(image);
          this.setState(
            {
              base64: image.data,
              fileName:
                Platform.OS === "ios" ? image.filename : "images" + new Date(),
              form: {
                ...this.state.form,
                imagePath: image.path,
              },
              chnageimage: true,
            },
            () => this.uploadImage()
          );
        });
      }.bind(this),
      1000
    );
  };
  UpdateProfile = async () => {
    Keyboard.dismiss();
    const validate = this.Validation();
    console.log("validate", validate);
    const { firstname, phonenumber, email, password, chnageimage, imagePath } =
      this.state.form;
    let data;
    if (!validate) {
      if (chnageimage) {
        data = {
          User_Type: 1,
          User_Name: firstname,
          User_Email: email,
          User_Password: password,
          User_Phone: phonenumber,
          Type: 2,
          User_Image_Path: imagePath,
        };
      } else {
        data = {
          User_Type: 1,
          User_Name: firstname,
          User_Email: email,
          User_Password: password,
          User_Phone: phonenumber,
          Type: 2,
          User_Image_Path: imagePath,
        };
      }

      console.log("userprofileupdate", data, this.props.token);
      await userprofileupdate(data, this.props.token)
        .then((res) => {
          console.log("res: ", res[0]);
          this.setState({
            visible: true,
          });
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
    }
  };
  onDismissSnackBar() {
    this.props.navigation.navigate("Home");
    this.setState({
      visible: false,
    });
  }
  uploadImage = async () => {
    const { base64 } = this.state;
    let data = JSON.stringify({
      Type: 6,
      User_Image_Base: "data:image/png;base64, " + base64,
    });
    console.log(data, this.props.token);
    await registerStoreImage(data, this.props.token)
      .then((res) => {
        console.log("res:profile", res[1]);
        this.setState({
          visible: true,
          form: {
            ...this.state.form,
            imagePath: res[1],
          },
        });
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
  };
  GetUserProfile = async () => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        firstname: this.props.profile.User_Name,
        phonenumber: this.props.profile.User_Phone,
        email: this.props.profile.User_Email,
        password: this.props.profile.User_Password,
        imagePath: this.props.profile.User_Image_Path,
      },
    });
    // this.setState({ isLoading: true });
    // let data = {
    //   User_PkeyID: 2,
    //   Type: 2,
    // };User_PkeyID
    // console.log("userprofile", data, this.props.token);
    // await userprofile(data, this.props.token)
    //   .then((res) => {
    //     console.log("res: ", res[0][0]);

    //     this.setState({ isLoading: false, userdata: res[0] });
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       this.setState({ isLoading: false });
    //       console.log("error.response", error.response);
    //     } else if (error.request) {
    //       this.setState({ isLoading: false });
    //       console.log("request error", error.request);
    //     } else if (error) {
    //       alert("Server Error");
    //       this.setState({ isLoading: false });
    //     }
    //   });
  };
  render() {
    const { firstname, phonenumber, email, password } = this.state.form;
    const {
      ErrorFirstName,
      ErrorPhoneNumber,
      ErrorPassword,
      ErrorEmail,
      ErrorPassword2,
      ErrorUserEmail,
    } = this.state;
    return (
      <View>
        <ImageBackground
          source={require("../../assets/plan_app_images/bg/all-pages-bg.jpg")}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <SafeAreaView style={{ height: "100%" }}>
            <Header
              back={true}
              search={false}
              notification={false}
              navigation={this.props.navigation}
              title={"My Profile"}
            />
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={{ marginTop: 80 }}>
                <View
                  style={{
                    // backgroundColor: "pink",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => this.onPress()}>
                    <Avatar.Image
                      source={{
                        uri: this.state.form.imagePath
                          ? this.state.form.imagePath
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg",
                      }}
                      size={120}
                    />
                  </TouchableOpacity>
                </View>
                <ActionSheet
                  ref={(o) => (this.ActionSheet = o)}
                  title={
                    <Text style={{ color: "#53a20a", fontSize: 18 }}>
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
                <InputText
                  title={"Name"}
                  onChangeText={(text) =>
                    this.onHandleChange("firstname", text)
                  }
                  error={ErrorFirstName}
                  value={firstname}
                />
                <InputText
                  title={"Email Address"}
                  onChangeText={(text) => this.onHandleChange("email", text)}
                  error={ErrorEmail || ErrorUserEmail}
                  value={email}
                  editable={false}
                />
                <InputText
                  title={"Password"}
                  onChangeText={(text) => this.onHandleChange("password", text)}
                  error={ErrorPassword || ErrorPassword2}
                  value={password}
                  secureTextEntry={true}
                />
                <InputText
                  title={"Phone Number"}
                  onChangeText={(text) =>
                    this.onHandleChange("phonenumber", text)
                  }
                  error={ErrorPhoneNumber}
                  value={phonenumber}
                  maxLength={10}
                  keyboardType={"phone-pad"}
                />
              </View>
              <View style={{ marginTop: 20, alignSelf: "center" }}>
                <ButtonView
                  onPress={() => this.UpdateProfile()}
                  title="Save Changes"
                />
              </View>
              <Snackbar
                visible={this.state.visible}
                onDismiss={() => console.log("close")}
                style={{ backgroundColor: "#53a20a" }}
                duration={1000}
                action={{
                  label: "close",
                  onPress: () => {
                    this.onDismissSnackBar();
                  },
                }}
              >
                Your profile is updated successfully
              </Snackbar>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  profile: state.profileReducer.profile,
});

export default connect(mapStateToProps)(Profile);
