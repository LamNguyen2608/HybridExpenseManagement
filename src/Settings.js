import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { firebase } from "../config"

const Settings = () => {
  const navigation = useNavigation();
  const logoutUser = async (email, password) => {
    try {
        await firebase.auth().signOut().then(() => {
          Alert.alert(
            'Successfully',
            'You have logged out successfully ',
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
    <View style={{alignItems:'center', marginTop: 100}}>
      <Text style={{marginTop: 10}}>version 1.0.1</Text>
      <Button style={{marginTop: 100}} title='Log out' onPress={() => {
      
        Alert.alert(
          'Log out',
          'Do you want to log out? ',
          [
            {
              text: 'No', onPress: () => {
                
              }
            },
            {
              text: 'Yes', onPress: () => {
                logoutUser();
              }
            },
          ],
          { cancelable: false },
        );
      }}/>
    </View>
  )
}

export default Settings