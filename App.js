import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "./src/redux/Store/store";
import { LightTheme, DarkTheme } from "./src/constants/colors";
import MainStack from "./src/routes/mainStack/mainStack";
import AppUtils from "./src/utils/appUtils";
import notifee, { AndroidImportance } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import UpdatePopup from "./src/screens/modals/UpdatePopup";
import { useNetInfo } from "@react-native-community/netinfo";
import NetInfo from "./src/screens/modals/NetInfo";
import { PersistGate } from "redux-persist/integration/react";
import { LocalizationProvider } from "./src/localization/localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SetAppLanguage} from './src/redux/Reducers/userData'
import { strings } from "./src/constants/variables";
const App = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const netInfo = useNetInfo();
  const theme = useColorScheme();

  useEffect(() => {
    AppUtils.disableFontScale()
    getFcm();
    checkUpdate();
    getLanguage();
    const unsubscribe = messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    return unsubscribe;

  }, []);

  useEffect(() => {
    if (netInfo.isConnected != null) {
      setIsConnected(netInfo.isConnected);
    }
  }, [netInfo.isConnected]);


  const getLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem(strings.appLanguage);
      if (value !== null) {
        const result = JSON.parse(value);
        store.dispatch(SetAppLanguage(result.appLanguage));
      } else {
     
      }
    } catch (e) {
     
    } finally {
    }
  };


  const getFcm = async () => {
    let fcm = await AppUtils.getToken();
    AppUtils.showLog("Fcm Token ===>", fcm);
  };

  const checkUpdate = async () => {
    let isNew = await AppUtils.checkAppVersion();
    setIsUpdateAvailable(isNew);
  };

  async function onMessageReceived(message) {
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default",
      importance: AndroidImportance.HIGH,
    });
    notifee.displayNotification({
      title: message?.notification?.title,
      body: message?.notification?.body,
      android: {
        channelId,
      },
      data: message?.data,
      ios: {
        sound: "default",
      },
    });
  }

  return (
    <>
      <NetInfo isVisible={!isConnected} />
      <UpdatePopup
        onBackDropPress={() => setIsUpdateAvailable(false)}
        isVisible={isUpdateAvailable}
      />
      <LocalizationProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={theme == "dark" ? DarkTheme : LightTheme}>
            <MainStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      </LocalizationProvider>
    </>
  );
};

export default App;
