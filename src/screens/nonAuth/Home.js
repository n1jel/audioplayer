import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomBtn from "../components/CustomBtn";
import AppRoutes from "../../routes/RouteKeys/appRoutes";
function Home({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={style.parent}>
      <Text style={[style.titleText, { color: colors.text }]}>
        {"Welcome Home\nSolidAppMaker"}
      </Text>
      <CustomBtn titleTxt={"ScreenTest"}
        onPress={() => {
          navigation?.navigate(AppRoutes.ScreenTest)
        }}
      />
      <CustomBtn titleTxt={"Sound Player"}
        onPress={() => {
          navigation?.navigate(AppRoutes.SoundPlayer)
        }}
      />
    </View>
  );
}
const style = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    lineHeight: 25,
  },
});
export default Home;
