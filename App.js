import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./Source/Navigation/MyStack";
import DrawerScreen from "./Source/Navigation/DrawerScreen";
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "./Source/store";
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
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
      {/* <StatusBar backgroundColor={"#53a20a"} /> */}

      <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
      {/* <View style={styles.appBar} /> */}
      {!user ? <MyStack /> : <DrawerScreen />}
    </NavigationContainer>
  );
}
export default AppWrapper;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 0 : STATUSBAR_HEIGHT;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: "#5E8D48",
    height: APPBAR_HEIGHT,
  },
});
