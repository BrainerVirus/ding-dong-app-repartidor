import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scanner from "./Scanner.jsx";
import Maps from "./Maps.jsx";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Maps">
        <Stack.Screen
          name="Maps"
          component={Maps}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
