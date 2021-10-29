import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./Source/Navigation/MyStack";
import DrawerScreen from "./Source/Navigation/DrawerScreen";
import { StatusBar, StyleSheet, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "./Source/store";
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
