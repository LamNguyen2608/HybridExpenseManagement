import { View, Text } from 'react-native'
import React, {useState} from 'react'

//import { useFonts } from 'expo-font';


const Header = (props) => {
    // const [loaded] = useFonts({
    //     hysteria: require('../assets/fonts/hysteria.otf'),
    //     geomanist: require('../assets/fonts/geomanist.otf')
    //   });
    
    // if (loaded) {
    //     return null;
    // }
    return (
        <View>
        <Text style={{
        fontSize: 20, 
        color: 'white',
        fontFamily: 'Geomanist'}}>{props.name}</Text>
        </View>
    )
}

export default Header