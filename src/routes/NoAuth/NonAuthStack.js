import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/nonAuth/Home";
import AppRoutes from "../RouteKeys/appRoutes";
import ScreenTest from "../../screens/nonAuth/ScreenTest";
import SoundPlayer from "../../screens/nonAuth/SoundPlayer";

export default function NonAuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.Home} component={Home} />
      <Stack.Screen name={AppRoutes.ScreenTest} component={ScreenTest} />
      <Stack.Screen name={AppRoutes.SoundPlayer} component={SoundPlayer} />
    </Stack.Navigator>
  );
}
