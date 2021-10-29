import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContant from "./DrawerContant";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Quiz from "../Quiz/Quiz";
import Notification from "../Notification/Notification";
import Contact from "../Contact/Contact";
import Faq from "../FAQ/Faq";
import Detail from "../Home/Detail";
import SuccessPage from "../Profile/SuccessPage";
import Membership from "../Membership/Membership";

const Drawer = createDrawerNavigator();
export default function DrawerScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerContant {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Quiz" component={Quiz} />
      <Drawer.Screen name="Faq" component={Faq} />
      <Drawer.Screen name="SuccessPage" component={SuccessPage} />
      <Drawer.Screen name="Detail" component={Detail} />
      <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="Membership" component={Membership} />
    </Drawer.Navigator>
  );
}
