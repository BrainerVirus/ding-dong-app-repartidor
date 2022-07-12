import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import themes from "../../themes.js";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    height: "100%",
  },
  textInputMail: {
    height: 40,
    borderRadius: 5,
    backgroundColor: themes.colors.white,
    paddingHorizontal: 10,
    fontSize: themes.fontSizes.body,
    marginBottom: "5%",
  },
  textInputPass: {
    height: 40,
    borderRadius: 5,
    backgroundColor: themes.colors.white,
    paddingHorizontal: 10,
    fontSize: themes.fontSizes.body,
    //marginBottom: "5%",
  },
  label: {
    fontSize: themes.fontSizes.body,
    color: themes.colors.white,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: "5%",
  },
  hr: {
    borderColor: themes.colors.white,
    borderWidth: 1,
    textAlign: "center",
    width: "65%",
    alignSelf: "center",
    marginBottom: "5%",
  },
  buttonGold: {
    height: 40,
    backgroundColor: "#C48E3C",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  buttonTitle: {
    fontSize: themes.fontSizes.buttons,
    color: themes.colors.white,
  },
  showErrMssg: {
    marginBottom: "5%",
    color: themes.colors.red,
  },
  hideErrMssg: {
    opacity: 0,
  },
});
const URI = "https://api-ding-dong.herokuapp.com/cuentas/login";
const URITipoUsuario = "https://api-ding-dong.herokuapp.com/tipoUsuario";
const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("repartidor");
  const [loginErr, setLoginErr] = useState(false);
  const navigation = useNavigation();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("entra al handleLogin");
    axios
      .post(URI, {
        email: email,
        password: pass,
      })
      .then((result) => {
        console.log("entra al then");
        if (result.data.id) {
          const userAth = {
            id: result.data.id,
            user: result.data.user,
            usuarioId: result.data.usuarioId,
            isLogged: result.data.isLogged,
            token: result.data.token,
          };
          console.log(
            "salimos del login de foma correcta sin cookies" + result.data.token
          );
          axios
            .get(URITipoUsuario + "/usuario/" + userAth.usuarioId)
            .then((res) => {
              userAth.tipoUsuario = res.data.tipoUsuario;
              console.log(
                "tipo de usuario login persona: " + userAth.tipoUsuario
              );
              if (email === userAth.user && role === userAth.tipoUsuario) {
                setLoginErr(false);
                navigation.navigate("Tabs");
                console.log("login exitoso");
              } else {
                console.log("login erroneo");
                setLoginErr(true);
              }
            })
            .catch((err) => {
              setLoginErr(true);
              console.log("error al obtener el tipo de usuario");
            });
        } else {
          setLoginErr(true);
          console.log("login erroneo");
        }
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputMail}
        placeholder="Correo electrónico"
        value={email}
        // onChangeText={handleMailInput}
        onChangeText={(text) => setEmail(text)}
        defaultValue={email}
      />
      <TextInput
        style={styles.textInputPass}
        secureTextEntry={true}
        placeholder="Contraseña"
        value={pass}
        // onChangeText={handlePassInput}
        onChangeText={(text) => setPass(text)}
        defaultValue={pass}
      />
      <Text style={loginErr ? styles.showErrMssg : styles.hideErrMssg}>
        Usuario y/o contraseña erroneo(s)
      </Text>
      <TouchableOpacity
        style={styles.buttonGold}
        // onPress={() => navigation.navigate("Tabs")}
        onPress={handleLogin}
        // onPress={showDataSeted}
      >
        <Text style={styles.buttonTitle}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.label}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      {/*
            <TouchableOpacity style={styles.buttonGold} onPress={() => email === 'beto_esquivel@gmail.com' && pass == '12345' ? navigation.navigate('Tabs') : Alert.alert('Usuario y/o contraseña incorrecto(s)')}></TouchableOpacity>
            */}
    </View>
  );
};

export default FormLogin;
