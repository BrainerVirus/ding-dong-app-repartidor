import React from "react";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import themes from "../../themes.js";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { DIRECTIONS_KEY } from "@env";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingVertical: "5%",
  },
  mapContainer: {
    height: RFValue(450, 737),
    width: "80%",
    padding: "1%",
    borderColor: themes.colors.gold,
    borderWidth: 1,
    borderRadius: 5,
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
    marginTop: "2%",
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
  title: {
    fontSize: themes.fontSizes.titles,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    width: 150,
    marginTop: "3%",
    alignItems: "center",
    justifyContent: "center",
  },
});

const customMapStyle = [
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

let stopAddress = [];
let stops = [];
let pinAddress;

const Maps = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [latLongValues, setLatLongValues] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [hasPermission, setHasPermission] = useState(false);
  stops = route.params;
  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });
  const navigation = useNavigation();

  const askForLocationPermission = () => {
    try {
      (async () => {
        const { status } =
          await Location.requestForegroundPermissionsAsync().catch((error) => {
            console.log("error en fore: " + error);
          });
        setHasPermission(status === "granted");
        let location = await Location.getCurrentPositionAsync({})
          .then((loc) => {
            setLocation(location);
            setOrigin({
              latitude: parseFloat(loc.coords.latitude),
              longitude: parseFloat(loc.coords.longitude),
            });
          })
          .catch((error) => {
            console.log("error en get: " + error);
          });
      })();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    askForLocationPermission();
  }, []);

  /*   useEffect(() => {
    console.log(
      `Stops 1: ${stops[0].latitude} ${stops[0].longitude} Stops 2: ${stops[1].latitude} ${stops[1].longitude} Stops 3: ${stops[2].latitude} ${stops[2].longitude}`
    );
  }, []); */

  if (stops && stopAddress.length === 0) {
    stops.forEach((element) => {
      stopAddress.push(element.address);
    });
  }

  const confirmation = () => {
    return Alert.alert(
      "Confirmación",
      "¿Estás seguro que deseas eliminar esta parada?",
      [
        {
          text: "Sí",
          onPress: () => {
            for (let i = 0; i < stops.length; i++) {
              if (stops[i].address === pinAddress) {
                stops.splice(i, 1);
                stopAddress.splice(i, 1);
              }
            }
            setIsDeleted(true);
            setIsDisabled(true);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Entregas en curso...</Text>
      <View style={styles.hr} />
      <TouchableOpacity
        style={styles.location}
        onPress={() => askForLocationPermission()}
      >
        <Ionicons
          name="location-sharp"
          size={themes.fontSizes.subTitles}
          color={themes.colors.red}
        />
        <Text style={{ fontSize: themes.fontSizes.body }}>
          Activar ubicación
        </Text>
      </TouchableOpacity>
      {!stops && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Scanner");
          }}
        >
          <Text style={styles.buttonTitle}>Agregar paquete</Text>
        </TouchableOpacity>
      )}
      {stops && stops.length < 10 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Scanner");
          }}
        >
          <Text style={styles.buttonTitle}>Agregar paquete</Text>
        </TouchableOpacity>
      )}
      <View style={styles.mapContainer}>
        {origin.latitude !== 0 && origin.longitude !== 0 && (
          <MapView
            initialCamera={{
              center: {
                latitude: origin.latitude,
                longitude: origin.longitude,
              },
              pitch: 0,
              zoom: 18,
              heading: 0,
              altitude: 1000,
            }}
            style={styles.map}
            showsBuildings={true}
            pitchEnabled={true}
            mapType="standard"
            zoomEnabled={true}
            zoomControlEnabled={false}
            showsPointsOfInterest={false}
            toolbarEnabled={false}
            showsUserLocation={true}
            followsUserLocation={true}
            customMapStyle={customMapStyle}
            /*             onUserLocationChange={(e) => {
              {
                askForLocationPermission();
                setOrigin({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                });
              }
            }} */
            loadingEnabled={true}
            loadingIndicatorColor={themes.colors.gold}
          >
            {stopAddress && stopAddress.length > 0 && (
              <>
                <MapViewDirections
                  origin={origin}
                  waypoints={stopAddress}
                  destination={stopAddress[stopAddress.length - 1]}
                  apikey={DIRECTIONS_KEY}
                  optimizeWaypoints={true}
                  strokeColor={themes.colors.gold}
                  strokeWidth={2}
                ></MapViewDirections>
              </>
            )}
            {stops &&
              stops.map((stop) => {
                return (
                  <Marker
                    key={stop.latitude}
                    coordinate={{
                      latitude: stop.latitude,
                      longitude: stop.longitude,
                    }}
                    pinColor={"purple"}
                    title={stop.address}
                    onPress={(e) => {
                      setIsDisabled(false);
                      setIsDeleted(false);
                      pinAddress = stop.address;
                    }}
                  ></Marker>
                );
              })}
          </MapView>
        )}
        {origin.latitude === 0 && origin.longitude === 0 && (
          <MapView
            style={styles.map}
            showsBuildings={true}
            pitchEnabled={true}
            mapType="standard"
            zoomEnabled={true}
            zoomControlEnabled={false}
            showsUserLocation={true}
            followsUserLocation={true}
            customMapStyle={customMapStyle}
            /*             onUserLocationChange={(e) => {
              setOrigin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }} */
            loadingEnabled={true}
            loadingIndicatorColor={themes.colors.gold}
          />
        )}
      </View>
      <View style={styles.hr} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(pinAddress);
          console.log(stopAddress);
        }}
      >
        <Text style={styles.buttonTitle}>Entregar paquete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonRed}
        disabled={isDisabled}
        onPress={() => {
          confirmation();
        }}
      >
        <Text style={styles.buttonTitle}>Eliminar paquete de la ruta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Maps;
