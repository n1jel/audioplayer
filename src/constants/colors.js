import { DefaultTheme } from "@react-navigation/native";
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    text: "black",
    red: "red"
  },
  images: {
    logo: require("../assets/logo.png"),
  },
};

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "black",
    text: "white",
    red: "blue"
  },
  images: {
    logo: require("../assets/logodark.jpg"),
  },
};
export { LightTheme, DarkTheme };
