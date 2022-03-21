import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContant from "./DrawerContant";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Quiz from "../Quiz/Quiz";
import Notification from "../Notification/Notification";
import Contact from "../Contact/Contact";
import Faq from "../FAQ/Faq";
import Review from "../FAQ/Review";
import QuesAns from "../FAQ/QuesAns";
import QuesAnsDetail from "../FAQ/QuesAnsDetail";
import Detail from "../Home/Detail";
import SuccessPage from "../Profile/SuccessPage";
import Membership from "../Membership/Membership";
import Payment from "../Paymnet/Payment";
import Plan from "../Paymnet/Plan";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setInitialroute } from "../store/action/auth/action";
import {
  setMembershipStauts,
  setQuestionId,
} from "../store/action/profile/action";
import SplashScreen from "../Auth/SplashScreen";
const Drawer = createDrawerNavigator();
export default function DrawerScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useSelector((state) => state.authReducer.route);
  console.log("hiiii route", route);
  const [loading, setLoading] = useState(true);
  // const [initialRoute, setInitialRoute] = useState("Home");
  const [questionid, setquestionid] = useState(0);
  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:minal",
        remoteMessage.notification,
        remoteMessage.data.key1
      );
      dispatch(setMembershipStauts(true));
      dispatch(setQuestionId(remoteMessage.data.key1));
      navigation.navigate("Notification", {
        question: parseInt(remoteMessage.data.key1),
      });
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          let questionidint = parseInt(remoteMessage.data.key1);
          setquestionid(questionidint);
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification,
            remoteMessage.data.key1
          );
          dispatch(setInitialroute("Notification"));
          dispatch(setMembershipStauts(true));
          dispatch(setQuestionId(remoteMessage.data.key1));

          // setInitialRoute("Notification");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }
  return (
    <Drawer.Navigator
      initialRouteName={route}
      screenOptions={{
        headerShown: false,
        unmountInactiveRoutes: true,
      }}
      drawerContent={(props) => <DrawerContant {...props} />}
    >
      {/* <Drawer.Screen name="SplashScreen" component={SplashScreen} /> */}
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Quiz" component={Quiz} />
      <Drawer.Screen name="Faq" component={Faq} />
      <Drawer.Screen name="QuesAns" component={QuesAns} />
      <Drawer.Screen name="QuesAnsDetail" component={QuesAnsDetail} />
      <Drawer.Screen name="Review" component={Review} />
      <Drawer.Screen name="SuccessPage" component={SuccessPage} />
      <Drawer.Screen name="Detail" component={Detail} />
      <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="Membership" component={Membership} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="Plan" component={Plan} />
    </Drawer.Navigator>
  );
}
