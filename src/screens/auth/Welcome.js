import { useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { LocalizationContext } from "../../localization/localization";
import { setAuth } from "../../redux/Reducers/userData";
import AppRoutes from "../../routes/RouteKeys/appRoutes";
import AppUtils from "../../utils/appUtils";
import CustomBtn from "../components/CustomBtn";
import SolidView from "../components/SolidView";
import CustomImagePickerModal from "../modals/CustomImagePickerModal";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function Welcome({ navigation }) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const { localization, setAppLanguage } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)

  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      setLoading(false);
    }, 2000);
    AppUtils.showToast(localization.appkeys.welcome);
  }, []);
  const handleImageSelection = (image) => {
    // Perform action with the selected image
    console.log(image);
  }
  return (
    <SolidView
      isLoading={loading}
      view={
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            onPress={() => { }}
            style={[style.titleText, { color: colors.text }]}
          >
            {localization.appkeys.welcome_solid}
          </Text>

          <CustomBtn
            onPress={() => {
              dispatch(setAuth(true));
              navigation.navigate(AppRoutes.NonAuthStack);
            }}
            titleTxt={localization.appkeys.go_home}
          />
          <CustomImagePickerModal visible={show}
            pressHandler={() => { setShow(false); console.log("modalclosed") }}
            attachments={handleImageSelection}
          />
          <CustomBtn
            onPress={() => {
              setShow(true)
            }}
            titleTxt={localization.appkeys.go_home}
          />
          {/* <SkeletonPlaceholder borderRadius={4} highlightColor={"#FF0000"} backgroundColor={"#0000FF"}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item width={120} height={20} />
                <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder> */}
        </ View>
      }
    />
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
export default Welcome;
