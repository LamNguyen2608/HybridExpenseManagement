import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { firebase } from "../config"
import Background from '../components/Background'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                Alert.alert(
                    'Successfully',
                    'You have logged in successfully ',
                    [
                      {
                        text: 'OK', onPress: () => {
                        }
                      },
                    ],
                    { cancelable: false },
                  );
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Background>
            <View style={styles.container}>
                <Text style={{ fontFamily: 'Hysteria', fontSize: 67 }}>Welcome back!</Text>
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => loginUser(email, password)}
                    style={styles.button}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#bd8dab' }}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={{ marginTop: 20 }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 17, fontFamily: 'Geomanist' }}>
                        Don't have an account? Register Now
                    </Text>
                </TouchableOpacity>
            </View>
        </Background>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 80,
        paddingTop: 50,
        width: deviceWidth * 0.9,
        height: deviceHeight * 0.65
    },
    textInput: {
        borderRadius: 50,
        width: deviceWidth * 0.75,
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 15,
        fontFamily: 'Geomanist',
        backgroundColor: 'rgb(220,220,220)',
        fontSize: 20
    },
    button: {
        marginTop: 30,
        height: 50,
        width: deviceWidth * 0.75,
        backgroundColor: '#ffdadb',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        fontFamily: 'Geomanist'
    }
})

export default Login