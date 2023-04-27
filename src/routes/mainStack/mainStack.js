import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppRoutes from "../RouteKeys/appRoutes";
import AuthStack from "../auth/AuthStack";
import NonAuthStack from "../NoAuth/NonAuthStack";
import { LocalizationContext } from "../../localization/localization";
import { useDispatch } from "react-redux";
import { strings } from "../../constants/variables";

export default function MainStack() {
  const Stack = createNativeStackNavigator();
  const { initializeAppLanguage, setAppLanguage } =
    useContext(LocalizationContext);
  useEffect(() => {
    setAppLanguage(strings.english);
    initializeAppLanguage();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.AuthStack} component={AuthStack} />
      <Stack.Screen name={AppRoutes.NonAuthStack} component={NonAuthStack} />
    </Stack.Navigator>
  );
}
