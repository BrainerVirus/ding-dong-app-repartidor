import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import themes from "../../themes.js";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login.jsx";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "3%",
  },
  notContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingVertical: "3%",
    paddingLeft: "5%",
  },
  hr: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: themes.colors.black,
    width: "50%",
    alignSelf: "center",
    marginTop: "2%",
  },
  title: {
    fontSize: themes.fontSizes.titles,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: themes.fontSizes.subTitles,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: "3%",
  },
  options: {
    fontSize: themes.fontSizes.subTitles,
  },
  optionsContainer: {
    alignSelf: "flex-start",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "3%",
  },
  button: {
    height: 40,
    width: "80%",
    backgroundColor: themes.colors.purple,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "5%",
    marginRight: "5%",
    paddingHorizontal: "3%",
  },
  buttonRed: {
    height: 40,
    width: "80%",
    backgroundColor: themes.colors.red,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "5%",
    marginRight: "5%",
    paddingHorizontal: "3%",
  },
  buttonTitle: {
    fontSize: themes.fontSizes.buttons,
    color: themes.colors.white,
    marginLeft: "5%",
  },
});

const Theme = () => {
  const [light, setLight] = useState(false);
  const [dark, setDark] = useState(false);
  const [def, setDef] = useState(true);

  const lightMode = () => {
    setLight(true);
    setDark(false);
    setDef(false);
  };

  const darkMode = () => {
    setLight(false);
    setDark(true);
    setDef(false);
  };

  const defMode = () => {
    setLight(false);
    setDark(false);
    setDef(true);
  };
  return (
    <>
      <Text style={styles.subtitle}>Tema</Text>
      <TouchableOpacity style={styles.optionsContainer} onPress={lightMode}>
        <Text style={styles.options}>Claro</Text>
        <BouncyCheckbox
          fillColor={themes.colors.purple}
          disableBuiltInState={true}
          isChecked={light}
          onPress={lightMode}
        ></BouncyCheckbox>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionsContainer} onPress={darkMode}>
        <Text style={styles.options}>Oscuro</Text>
        <BouncyCheckbox
          fillColor={themes.colors.purple}
          disableBuiltInState={true}
          isChecked={dark}
          onPress={darkMode}
        ></BouncyCheckbox>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionsContainer} onPress={defMode}>
        <Text style={styles.options}>Predeterminado del sistema</Text>
        <BouncyCheckbox
          fillColor={themes.colors.purple}
          disableBuiltInState={true}
          isChecked={def}
          onPress={defMode}
        ></BouncyCheckbox>
      </TouchableOpacity>
    </>
  );
};

const FontSize = () => {
  const [small, setSmall] = useState(false);
  const [def, setDef] = useState(true);
  const [big, setBig] = useState(false);

  const smallFont = () => {
    setSmall(true);
    setDef(false);
    setBig(false);
  };

  const defFont = () => {
    setSmall(false);
    setDef(true);
    setBig(false);
  };

  const bigFont = () => {
    setSmall(false);
    setDef(false);
    setBig(true);
  };
  return (
    <>
      <Text style={styles.subtitle}>Tamaño de la fuente</Text>
      <TouchableOpacity style={styles.optionsContainer} onPress={smallFont}>
        <Text style={styles.options}>Pequeña</Text>
        <BouncyCheckbox
          fillColor={themes.colors.purple}
          disableBuiltInState={true}
          isChecked={small}
          onPress={smallFont}
        ></BouncyCheckbox>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionsContainer} onPress={defFont}>
        <Text style={styles.options}>Predeterminada</Text>
        <BouncyCheckbox
          fillColor={themes.colors.purple}
          disableBuiltInState={true}
          isChecked={def}
          onPress={defFont}
        ></BouncyCheckbox>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionsContainer} onPress={bigFont}>
        <Text style={styles.options}>Grande</Text>
        <BouncyCheckbox
          fillColor={themes.colors.purple}
          disableBuiltInState={true}
          isChecked={big}
          onPress={bigFont}
        ></BouncyCheckbox>
      </TouchableOpacity>
    </>
  );
};

const Help = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.subtitle}>Ayuda</Text>
      <TouchableOpacity style={styles.button}>
        <Ionicons
          name="help-buoy-sharp"
          size={themes.fontSizes.smallIcon}
          color={themes.colors.white}
        />
        <Text style={styles.buttonTitle}>Soporte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonRed}
        onPress={() => navigation.navigate(Login)}
      >
        <Ionicons
          name="log-out-outline"
          size={themes.fontSizes.smallIcon}
          color={themes.colors.white}
        />
        <Text style={styles.buttonTitle}>Cerrar sesión</Text>
      </TouchableOpacity>
    </>
  );
};

const Settings = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Ajustes</Text>
        <View style={styles.hr}></View>
      </View>
      <ScrollView contentContainerStyle={styles.notContainer}>
        <Theme />
        <FontSize />
        <Help />
      </ScrollView>
    </>
  );
};

export default Settings;
