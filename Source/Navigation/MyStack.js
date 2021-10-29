import React from "react";
import { View, Text } from "react-native";
import Welcome from "../Auth/Welcome";
import ForgotPassword from "../Auth/ForgotPassword";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import SuccessPage from "../Auth/SuccessPage";
import ResetPassword from "../Auth/ResetPassword";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
export default function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SuccessPage" component={SuccessPage} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
