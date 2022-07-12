import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home.jsx";
import Account from "./Account.jsx";
import Routes from "./Routes.jsx";
import Notifications from "./Notifications.jsx";
import Settings from "./Settings.jsx";
import themes from "../../themes.js";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cuenta") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Rutas") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Notificaciones") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Ajustes") {
            iconName = focused ? "settings-sharp" : "settings-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={themes.fontSizes.titles}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: themes.colors.purple,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cuenta"
        component={Account}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Rutas"
        component={Routes}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Ajustes"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
