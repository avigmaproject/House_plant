import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./Source/Navigation/MyStack";
import DrawerScreen from "./Source/Navigation/DrawerScreen";
import { StatusBar, StyleSheet, View, Alert } from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "./Source/store";
import { requestUserPermission } from "./Source/Utils/apiconfig";
import messaging from "@react-native-firebase/messaging";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
function App() {
  const user = useSelector((state) => state.authReducer.loggedin);
  React.useEffect(async () => {
    const authStatus = await requestUserPermission();
    //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //     Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    //   });
    //   return unsubscribe;
    // });
    if (authStatus) {
      Pushmessage();
    }
    return () => {
      requestUserPermission();
      Pushmessage();
    };
  });
  const Pushmessage = () => {
    this.notificationListener = messaging().onMessage(async (remoteMessage) => {
      const notification = remoteMessage.notification;
      console.log("notification", notification);
      console.log("remoteMessage", remoteMessage);
      if (notification) {
        Alert.alert(notification.title, notification.body, [
          {
            text: "OK",
            onPress: () => {
              alert(notification.body);
            },
            style: "cancel",
          },
        ]);
      }
    });
    this.setBackgroundMessageHandler = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log("remoteMessage", remoteMessage);
        alert("mesg arrives");
      }
    );
  };
  return (
    <NavigationContainer>
      <MyStatusBar
        backgroundColor="#479000"
        barStyle="light-content"
        animated={true}
      />
      {!user ? <MyStack /> : <DrawerScreen />}
    </NavigationContainer>
  );
}
export default AppWrapper;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: "#79B45D",
    height: APPBAR_HEIGHT,
  },
});
