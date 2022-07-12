import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import themes from "../../themes.js";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingBottom: "10%",
    marginTop: "2%",
  },
  image: {
    width: 150,
    height: 150,
  },
  change: {
    fontSize: themes.fontSizes.subTitles,
    fontWeight: "bold",
    textAlign: "center",
    color: themes.colors.purple,
  },
  hr: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: themes.colors.black,
    width: "50%",
    alignSelf: "center",
    marginTop: "5%",
  },
  textInput: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    backgroundColor: themes.colors.white,
    paddingHorizontal: 10,
    fontSize: themes.fontSizes.body,
    marginTop: "5%",
  },
  buttonTitle: {
    fontSize: themes.fontSizes.body,
    color: themes.colors.white,
  },
  button: {
    height: 40,
    width: "80%",
    backgroundColor: themes.colors.purple,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  buttonRed: {
    height: 40,
    width: "80%",
    backgroundColor: themes.colors.red,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  info: {
    fontSize: themes.fontSizes.subTitles,
    fontStyle: "italic",
    textAlign: "center",
    marginHorizontal: "10%",
    marginTop: "3%",
  },
});

const Account = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={require("../../assets/images/account_circle_grey.png")}
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.change}>Cambiar foto</Text>
      </TouchableOpacity>
      <View style={styles.hr}></View>
      <TextInput
        style={styles.textInput}
        placeholder="Correo electrónico"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Nueva contraseña"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Confirmar contraseña"
      ></TextInput>
      <View style={styles.hr}></View>
      <TextInput style={styles.textInput} placeholder="Teléfono"></TextInput>
      <View style={styles.hr}></View>
      <TextInput
        style={styles.textInput}
        editable={false}
        placeholder="RUN"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        editable={false}
        placeholder="Nombre(s)"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        editable={false}
        placeholder="Apellido paterno"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        editable={false}
        placeholder="Apellido materno"
      ></TextInput>
      <Text style={styles.info}>
        *Para modificar tus datos personales debes contactarte con tu empresa*
      </Text>
      <View style={styles.hr}></View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>Guardar cambios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRed}>
        <Text style={styles.buttonTitle}>Descartar cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Account;
