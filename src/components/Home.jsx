import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import themes from "../../themes.js";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "2%",
    marginBottom: 0,
    flexWrap: "wrap",
  },
  welcome: {
    fontSize: themes.fontSizes.titles,
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: "3%",
  },
  info: {
    fontSize: themes.fontSizes.subTitles,
    fontStyle: "italic",
    textAlign: "center",
    marginHorizontal: "10%",
    marginTop: "3%",
  },
  wishes: {
    fontSize: themes.fontSizes.subTitles,
    color: themes.colors.gold,
    fontStyle: "italic",
    textAlign: "center",
    marginHorizontal: "5%",
    fontWeight: "bold",
  },
  hr: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: themes.colors.black,
    width: "50%",
    alignSelf: "center",
    marginTop: "10%",
  },
  map: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    height: "25%",
    borderRadius: 10,
    paddingHorizontal: "2%",
    paddingVertical: "2%",
    backgroundColor: themes.colors.purple,
  },
  subcontainer: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    height: "45%",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  subsubcontainer: {
    display: "flex",
    flexDirection: "column",
    width: "47%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  userconfig: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "65%",
    borderRadius: 10,
    paddingHorizontal: "10%",
    paddingVertical: "4%",
    backgroundColor: themes.colors.purple,
  },
  notis: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "15%",
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap",
    backgroundColor: themes.colors.purple,
  },
  logout: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "15%",
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: themes.colors.red,
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap",
  },
  text: {
    color: themes.colors.white,
    fontSize: themes.fontSizes.body,
    textAlign: "center",
  },
});

const Welcome = (props) => {
  return <Text style={styles.welcome}>¡Bienvenid@, {props.name}!</Text>;
};

const Info = () => {
  return (
    <>
      <Text style={styles.info}>
        A continuación, se muestran las funciones disponibles que tienes como
        repartidor.
      </Text>
      <Text style={styles.wishes}>
        ¡Te deseamos una excelente jornada de repartos!
      </Text>
      <View style={styles.hr} />
    </>
  );
};

const Map = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.map}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Rutas", "Tabs")}
    >
      <Ionicons
        name="map"
        size={themes.fontSizes.bigIcon}
        color={themes.colors.white}
      />
      <Text style={styles.text}>
        Ingresa los paquetes que debes repartir hoy.
      </Text>
      <Text style={styles.text}>Genera la mejor ruta con Google Maps.</Text>
      <Text style={styles.text}>
        Valida la entrega del paquete, escaneando el código QR que el receptor
        te mostrará.
      </Text>
    </TouchableOpacity>
  );
};

const UserConfig = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.subcontainer}>
      <View style={styles.subsubcontainer}>
        <TouchableOpacity
          style={styles.userconfig}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Cuenta", "Tabs")}
        >
          <Ionicons
            name="person-circle"
            size={themes.fontSizes.bigIcon}
            color={themes.colors.white}
          />
          <Text style={styles.text}>
            Cambia tu foto de perfil, modifica tus datos de acceso y datos
            personales.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notis}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Notificaciones", "Tabs")}
        >
          <Ionicons
            name="notifications"
            size={themes.fontSizes.smallIcon}
            color={themes.colors.white}
          />
          <Text style={styles.text}>Notificaciones</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subsubcontainer}>
        <TouchableOpacity
          style={styles.userconfig}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Ajustes", "Tabs")}
        >
          <Ionicons
            name="settings-sharp"
            size={themes.fontSizes.bigIcon}
            color={themes.colors.white}
          />
          <Text style={styles.text}>
            Establece tus preferencias, accede a opciones de accesibilidad,
            solicita atención al usuario, soporte, revisa tutoriales o cierra
            sesión.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons
            name="log-out-outline"
            size={themes.fontSizes.smallIcon}
            color={themes.colors.white}
          />
          <Text style={styles.text}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <View style={styles.container}>
      <Welcome name="Beto" />
      <Info />
      <Map />
      <UserConfig />
    </View>
  );
};

export default Home;
