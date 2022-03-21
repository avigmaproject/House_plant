import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Avatar, Title, Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { signout } from "../store/action/auth/action";
import { setProfile, setMembership } from "../store/action/profile/action";
import { useDispatch, useSelector } from "react-redux";
import { userprofile } from "../Utils/apiconfig";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useFocusEffect } from "@react-navigation/native";
export default function DrawerContant({ navigation, props }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer.profile);
  const token = useSelector((state) => state.authReducer.token);
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const DrawerItems = ({ label, image, name, onPress, ...props }) => (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          paddingVertical: 10,
          alignItems: "center",
          marginTop: 10,
          // backgroundColor: "pink",
        }}
      >
        <AntDesign
          style={{ marginRight: 15 }}
          name={name}
          size={25}
          color="#53a20a"
        />

        {/* <Image
          resizeMode={"stretch"}
          source={image}
          style={{ width: 20, height: 20, marginRight: 15 }}
        /> */}
        <Text style={{ fontSize: 15 }}>{label}</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "lightgray",
          marginLeft: 30,
        }}
      ></View>
    </View>
  );
  const MamberShip = ({ label, image, onPress, ...props }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Payment")}
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        backgroundColor: "#53a20a",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: "center",
        borderRadius: 10,
      }}
    >
      {/* <AntDesign
        style={{ marginRight: 15 }}
        name={"star"}
        size={60}
        color="orange"
      /> */}
      <Image
        resizeMode={"contain"}
        source={image}
        style={{ width: 50, height: 50, marginRight: 5 }}
      />
      <Text
        style={{
          color: "#fff",
          fontSize: 23,
          fontWeight: "bold",
          paddingRight: 20,
          width: "90%",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    GetUserProfile();
  }, []);
  const onLogout = () => {
    dispatch(signout());
  };
  useFocusEffect(
    React.useCallback(() => {
      GetUserProfile();
      return () => console.log("close");
    }, [])
  );
  const GetUserProfile = async () => {
    setisLoading(true);
    let data = {
      Type: 2,
    };
    // console.log("userprofile", data, token);
    await userprofile(data, token)
      .then((res) => {
        console.log("res: userprofile", res[0][0]);
        dispatch(setProfile(res[0][0]));
        dispatch(setMembership(res[0][0].User_Ispaid));
        setName(res[0][0].User_Name);
        setPhoto(res[0][0].User_Image_Path);
        setisLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setisLoading(false);
          console.log("error.response", error.response);
        } else if (error.request) {
          setisLoading(false);
          console.log("request error", error.request);
        } else if (error) {
          alert("Server Error");
          setisLoading(false);
        }
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View>
            <View
              style={{
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {profile.User_Image_Path ? (
                <Avatar.Image
                  source={{ uri: profile.User_Image_Path }}
                  size={70}
                />
              ) : (
                <Avatar.Image
                  source={require("../../assets/plan_app_images/contact-icon.png")}
                  // uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg',
                  size={70}
                />
              )}

              <View style={{}}>
                <Title>{profile.User_Name}</Title>
                {/* <TouchableOpacity onPress={() => onLogout()}>
                  <Caption style={styles.caption}>Logout</Caption>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>

          <Drawer.Section
            style={{
              ...styles.drawerSection,
              borderTopColor: "#f4f4f4",
              borderTopWidth: 1,
            }}
          >
            <DrawerItems
              name="home"
              image={require("../../assets/plan_app_images/sidebar-icon/home.png")}
              label={"Home"}
              onPress={() => navigation.navigate("Home")}
              {...props}
            />
            <DrawerItems
              name="user"
              image={require("../../assets/plan_app_images/sidebar-icon/profile-icon.png")}
              label={"My Profile"}
              onPress={() => navigation.navigate("Profile")}
              {...props}
            />
            <DrawerItems
              name="questioncircleo"
              image={require("../../assets/plan_app_images/sidebar-icon/quiz.png")}
              label={"Quiz"}
              onPress={() => navigation.navigate("Quiz")}
              {...props}
            />
            {profile.User_Ispaid && (
              <DrawerItems
                name="profile"
                image={require("../../assets/plan_app_images/sidebar-icon/contact.png")}
                label={"Ask the Fiddle Leaf Fig Doctor"}
                onPress={() => navigation.navigate("Review")}
                {...props}
              />
            )}
            <DrawerItems
              name="exclamationcircleo"
              image={require("../../assets/plan_app_images/sidebar-icon/faq.png")}
              label={"FAQs"}
              onPress={() =>
                navigation.navigate("Faq", {
                  url: "https://houseplantresourcecenter.com/faq/",
                  title: "FAQs",
                })
              }
              {...props}
            />
            {profile.User_Ispaid && (
              <DrawerItems
                name="notification"
                image={require("../../assets/plan_app_images/sidebar-icon/notification.png")}
                label={"Notification"}
                onPress={() => navigation.navigate("Notification")}
                {...props}
              />
            )}
            {profile.User_Ispaid && (
              <DrawerItems
                name="deleteusergroup"
                image={require("../../assets/plan_app_images/sidebar-icon/contact.png")}
                label={"My Plan"}
                onPress={() => navigation.navigate("Plan")}
                {...props}
              />
            )}
            <DrawerItems
              name="contacts"
              image={require("../../assets/plan_app_images/sidebar-icon/contact.png")}
              label={"Contact"}
              onPress={() => navigation.navigate("Contact")}
              {...props}
            />

            {/* {!profile.User_Ispaid && (
              <DrawerItems
                name="creditcard"
                image={require("../../assets/plan_app_images/sidebar-icon/contact.png")}
                label={"Payment"}
                onPress={() => navigation.navigate("Payment")}
                {...props}
              />
            )} */}

            {/* {profile.User_Ispaid && (
              <DrawerItems
                name="profile"
                image={require("../../assets/plan_app_images/sidebar-icon/quiz.png")}
                label={"Questionnaire"}
                onPress={() => navigation.navigate("QuesAns")}
                {...props}
              />
            )} */}
            <DrawerItems
              name="poweroff"
              image={require("../../assets/plan_app_images/sidebar-icon/logout.png")}
              label={"Logout"}
              onPress={() => onLogout()}
              {...props}
            />
            {!profile.User_Ispaid && (
              <View style={{ marginTop: 20 }}>
                <MamberShip
                  label={"Ask the Fiddle Leaf Fig Doctor"}
                  image={require("../../assets/plan_app_images/star.png")}
                />
              </View>
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {/* <DrawerItem label={`${VersionInfo.appVersion}`} /> */}
        <DrawerItem label="V.1.1.0.0   |  © Copy Right 2021" />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 15,
    color: "#53a20a",
    textDecorationLine: "underline",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    // marginBottom: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
