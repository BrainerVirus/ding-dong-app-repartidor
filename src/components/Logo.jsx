import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import themes from '../../themes.js';

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'80%',
        height: '100%',
        alignItems: 'center',
        marginBottom: '10%'
    },  
    logo: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        zIndex:1
    },
    version: {
        color: themes.colors.gold,
        textAlign: 'center',
        fontSize: themes.fontSizes.titles,
        fontWeight: 'bold',
        fontStyle: 'italic',
        zIndex: 2,
        marginTop:'-15%'
    }
});

const Logo = () => {
    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/images/Ding-Dong-Logo-Dark.png')}/>
            <Text style={styles.version}>Repartidores</Text>
        </View>
    );
}

export default Logo;