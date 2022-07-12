import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import themes from "../../themes.js";

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
});

const Notifications = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Notificaciones</Text>
        <View style={styles.hr}></View>
      </View>
      <ScrollView contentContainerStyle={styles.notContainer}></ScrollView>
    </>
  );
};

export default Notifications;
