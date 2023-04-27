import { useTheme } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Loader from "../modals/Loader";
import DatePicker from "./DatePicker";

export default function SolidView({ viewStyle, isLoading,view }) {
  const { colors } = useTheme();
  return (
    <View
      style={[style.parent, { backgroundColor: colors.background }, viewStyle]}>
      <SafeAreaView style={{ flex: 1 }}>
        {view}
      </SafeAreaView>
      {isLoading && <Loader/>}
    </View>
  );
}
const style = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
