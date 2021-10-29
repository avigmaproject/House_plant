import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { signout } from "../store/action/auth/action";
import { setProfile } from "../store/action/profile/action";
import { useDispatch, useSelector } from "react-redux";
import { userprofile } from "../Utils/apiconfig";

export default function DrawerContant({ navigation, props }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const DrawerItems = ({ label, image, onPress, ...props }) => (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          paddingVertical: 10,
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <Image
          resizeMode={"stretch"}
          source={image}
          style={{ width: 20, height: 20, marginRight: 15 }}
        />
        <Text>{label}</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "lightgray",
          marginLeft: 60,
        }}
      ></View>
    </View>
  );
  const MamberShip = ({ label, image, onPress, ...props }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Membership")}
      style={{ justifyContent: "center", alignItems: "center", width: "100%" }}
    >
      <Image
        resizeMode={"stretch"}
        source={image}
        style={{ width: "80%", height: 70 }}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    GetUserProfile();
    setInterval(function () {
      GetUserProfile();
    }, 100000);
  }, [photo, name]);
  const onLogout = () => {
    dispatch(signout());
  };
  const GetUserProfile = async () => {
    setisLoading(true);
    let data = {
      Type: 2,
    };
    console.log("userprofile", data, token);
    await userprofile(data, token)
      .then((res) => {
        console.log("res: ", res[0][0]);
        dispatch(setProfile(res[0][0]));
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
              {photo ? (
                <Avatar.Image source={{ uri: photo }} size={70} />
              ) : (
                <Avatar.Image
                  source={require("../../assets/plan_app_images/contact-icon.png")}
                  // uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg',
                  size={70}
                />
              )}

              <View style={{}}>
                <Title>{name}</Title>
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
              image={require("../../assets/plan_app_images/sidebar-icon/home.png")}
              label={"Home"}
              onPress={() => navigation.navigate("Home")}
              {...props}
            />
            <DrawerItems
              image={require("../../assets/plan_app_images/sidebar-icon/profile-icon.png")}
              label={"My Profile"}
              onPress={() => navigation.navigate("Profile")}
              {...props}
            />
            <DrawerItems
              image={require("../../assets/plan_app_images/sidebar-icon/quiz.png")}
              label={"Quiz"}
              onPress={() => navigation.navigate("Quiz")}
              {...props}
            />
            <DrawerItems
              image={require("../../assets/plan_app_images/sidebar-icon/faq.png")}
              label={"FAQ"}
              onPress={() => navigation.navigate("Faq")}
              {...props}
            />
            <DrawerItems
              image={require("../../assets/plan_app_images/sidebar-icon/notification.png")}
              label={"Notification"}
              onPress={() => navigation.navigate("Notification")}
              {...props}
            />
            <DrawerItems
              image={require("../../assets/plan_app_images/sidebar-icon/contact.png")}
              label={"Contact"}
              onPress={() => navigation.navigate("Contact")}
              {...props}
            />
            <DrawerItems
              image={require("../../assets/plan_app_images/sidebar-icon/logout.png")}
              label={"Logout"}
              onPress={() => onLogout()}
              {...props}
            />
            <View style={{ marginTop: 20 }}>
              <MamberShip
                image={require("../../assets/plan_app_images/buy-membershp.png")}
              />
            </View>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem label="V.1.1.0.0   |   Copy Right 2021" />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    // paddingLeft: 20,
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
