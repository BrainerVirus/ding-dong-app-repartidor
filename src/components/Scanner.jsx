import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import themes from "../../themes.js";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingVertical: "5%",
  },
  mapContainer: {
    height: RFValue(500, 737),
    width: "85%",
    padding: "1%",
    borderColor: themes.colors.purple,
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: "dashed",
    marginVertical: "5%",
  },
  map: {
    height: "100%",
    width: "100%",
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
  hr: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: themes.colors.black,
    width: "50%",
    alignSelf: "center",
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
  buttonGreen: {
    height: 40,
    width: "80%",
    backgroundColor: themes.colors.green,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  title: {
    fontSize: themes.fontSizes.titles,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  barCodeBox: {
    backgroundColor: themes.colors.white,
    alignItems: "center",
    justifyContent: "center",
    height: RFValue(300, 737),
    width: RFValue(300, 737),
    overflow: "hidden",
    borderRadius: 30,
    marginTop: "5%",
    borderColor: themes.colors.purple,
    borderWidth: 3,
  },
  mainText: {
    fontSize: 16,
    margin: 20,
  },
  scanning: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    width: "50%",
    marginTop: "3%",
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

let addresses = [];
const direcciones = [];
let direccion = "";
let coordenadas = {};

const Scanner = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [address, setAddress] = useState("");
  const [latLongValues, setLatLongValues] = useState(null);
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync().catch(
        (error) => {
          console.log("Error en requestPermission: " + error);
        }
      );
      setHasPermission(status === "granted");
    })();
  };

  //Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const getLatLong = async (add) => {
    try {
      const latLong = await Location.geocodeAsync(add)
        .then((coords) => {
          setLatLongValues({
            latitude: parseFloat(coords[0].latitude),
            longitude: parseFloat(coords[0].longitude),
          });
          coordenadas = {
            address: add,
            latitude: parseFloat(coords[0].latitude),
            longitude: parseFloat(coords[0].longitude),
          };
          /* console.log(coordenadas); */
        })
        .catch((error) => {
          console.log("error en getLatLong: " + error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //What happens when we scan the bar code
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    try {
      setAddress(
        JSON.parse(data).calle +
          " " +
          JSON.parse(data).numCalle +
          ", " +
          JSON.parse(data).comuna
      );
      direccion =
        JSON.parse(data).calle +
        " " +
        JSON.parse(data).numCalle +
        ", " +
        JSON.parse(data).comuna;
      getLatLong(direccion);
      direcciones.push(direccion);
    } catch (error) {
      setAddress("");
      Alert.alert("El código QR es inválido");
    }
    /* console.log("Type: " + type + "\nData: " + data); */
  };

  //Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Esperando el permiso para acceder a la cámara.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => askForCameraPermission()}
        >
          <Text style={styles.buttonTitle}>Permitir acceso a la cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRed}
          onPress={() => {
            navigator.navigate("Maps");
          }}
        >
          <Text style={styles.buttonTitle}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No se puede acceder a la cámara</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => askForCameraPermission()}
        >
          <Text style={styles.buttonTitle}>Permitir acceso a la cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRed}
          onPress={() => navigation.navigate("Maps")}
        >
          <Text style={styles.buttonTitle}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar paquete</Text>
      <View style={styles.hr}></View>
      <View style={styles.barCodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            height: 500,
            width: 500,
          }}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
      </View>
      <View style={styles.scanning}>
        <Ionicons
          name="qr-code-sharp"
          size={themes.fontSizes.titles}
          color={themes.colors.gold}
        />
        <Text style={{ fontSize: themes.fontSizes.buttons }}>
          Escanenado...
        </Text>
      </View>
      {scanned && addresses.length < 10 && (
        <>
          <Text style={styles.mainText}>{address}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonTitle}>¿Escanear de nuevo?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let cont = 0;
              if (addresses) {
                for (let i = 0; i < addresses.length; i++) {
                  if (addresses[i] == coordenadas) {
                    cont++;
                    console.log("cont++: " + cont);
                  }
                }
              }
              if (cont === 0) {
                addresses.push(coordenadas);
              }
              setScanned(false);
              console.log(addresses);
            }}
          >
            <Text style={styles.buttonTitle}>Agregar paquete</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.buttonRed}
        onPress={() => {
          addresses.length = 0;
          navigation.navigate("Maps", addresses);
        }}
      >
        <Text style={styles.buttonTitle}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonGreen}
        onPress={() => {
          /*  console.log(addresses); */
          navigation.navigate("Maps", addresses);
        }}
      >
        <Text style={styles.buttonTitle}>
          ¡Listo! ({addresses.length} paquetes)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Scanner;
