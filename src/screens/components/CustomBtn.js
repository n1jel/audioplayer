import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function CustomBtn({
  btnStyle,
  txtStyle,
  titleTxt,
  onPress,
  isLoading,
}) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style.btn, btnStyle, { backgroundColor: colors.text }]}
    >
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <Text style={[style.btntxt, { color: colors.background }, txtStyle]}>
          {titleTxt}
        </Text>
      )}
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
  },
  btntxt: {
    fontSize: 16,
    color: "white",
  },
});
