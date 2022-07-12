import { RFValue } from "react-native-responsive-fontsize";

const themes = {
  colors: {
    purple: "#540B66",
    gold: "#C48E3C",
    white: "#fff",
    black: "#000",
    red: "rgba(240,0,0,0.8)",
    green: "rgba(0,240,0,0.8)",
  },
  fontSizes: {
    titles: RFValue(28, 737),
    subTitles: RFValue(16, 737),
    body: RFValue(14, 737),
    buttons: RFValue(18, 737),
    hugeIcon: RFValue(200, 737),
    bigIcon: RFValue(50, 737),
    smallIcon: RFValue(30, 737),
  },
  fonts: {
    main: "System",
  },
};

export default themes;
