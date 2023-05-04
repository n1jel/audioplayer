import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated, PanResponder } from "react-native";
import CustomBtn from "../components/CustomBtn";
import AppRoutes from "../../routes/RouteKeys/appRoutes";
import Realm from "realm";
import { Boxpostion } from "../../schema/Box";
function Home({ navigation }) {
  const { colors } = useTheme();
  // const realm = Realm.open({ schema: [Boxpostion], deleteRealmIfMigrationNeeded: true, path: 'Boxpostion.realm' })

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;


  useEffect(() => {
    getData();
  }, [])

  const saveBoxState = async (state) => {
    await Realm.open({ schema: [Boxpostion], deleteRealmIfMigrationNeeded: true, path: 'Boxpostion.realm' })
      .then(realm => {
        realm.write(() => {
          realm.create('Boxpostion', { x: JSON.stringify(state?.x), y: JSON.stringify(state?.y), _id: 1 }, 'modified')
        })
        realm.close()
        getData();
      })
  }

  const getData = async () => {
    let realm = await Realm.open({ schema: [Boxpostion], path: 'Boxpostion.realm' })
    let data = realm.objects('Boxpostion')
    console.log(data);
    if (data?.length) {
      let x = Number(data[0]?.x)
      let y = Number(data[0]?.y)
      // Animated.setValue({ x: x, y: y });
      // Animated.event([null, { dx: x, dy: y }], { useNativeDriver: false })
      pan.setValue({ x: x, y: y })
    }
    realm.close()
  }

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
      <CustomBtn titleTxt={"Save Box"}
        onPress={() => {
          saveBoxState(pan)
        }}
      />
      <CustomBtn titleTxt={"Move Box"}
        onPress={() => {
          pan.setValue({ x: 0, y: -500 })
          // saveBoxState(pan)
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }], ...style.box
        }}
        {...panResponder.panHandlers}>
        <View style={style.box} />
      </Animated.View>
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
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default Home;
