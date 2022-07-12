import React from "react";
import { StyleSheet, View, ScrollView, StatusBar  } from "react-native";
import Logo from "./Logo.jsx";
import FormLogin from "./FormLogin.jsx";
import themes from "../../themes.js";

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        height: '100%',
        backgroundColor: '#540B66',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10
    },
});

const Login = () => {
    return(
        <ScrollView style={{backgroundColor: themes.colors.purple}}>
            <View style={styles.container}>
            <StatusBar backgroundColor={'#540B66'}/>
            <Logo/>
            <FormLogin/>
            </View>
        </ScrollView>
    );
}

export default Login;