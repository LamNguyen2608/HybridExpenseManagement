import {
  FlatList,
  Button,
  View,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Image
} from "react-native";
import Dialog, {
  DialogContent,
  SlideAnimation,
  DialogTitle,
  DialogButton,
  DialogFooter,
} from "react-native-popup-dialog";
import { useNavigation } from '@react-navigation/native'
import { firebase, db } from "../config";
import React, { useState, useEffect } from 'react'
import UpdateTrip from "../components/UpdateTrip";
import { useIsFocused } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Expense from "../components/Expense";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Account = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/melbourne.jpg")} resizeMode="cover" style={styles.image}>
          <Image source={require("../assets/profile.jpg")} resizeMode="cover" style={styles.profile}/>
      </ImageBackground>
      <Text style={styles.tripname}>Lamie Nguyen</Text>
      <Text style={styles.title}>{firebase.auth().currentUser.email}</Text>
    </View>  
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    height: deviceHeight,
    width: '100%',
    paddingTop: 200,
  },
  profile: {
    height: 150,
    width: 150,
    borderRadius: 100
  },
  top: {
    flex: 1,
    height: deviceHeight * 0.4,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: "column"
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 80,
    paddingTop: 50,
    width: deviceWidth * 0.95,
    height: deviceHeight * 0.65
  },
  tripname: {
    marginTop: 80,
    fontSize: 55,
    fontFamily: 'Hysteria',
    color: 'white'
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Geomanist',
    fontWeight: 'bold',
    marginTop: 10
  },
  field: {
    fontSize: 18,
    fontFamily: 'Geomanist',
    color: '#463284',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5
  },
  value: {
    fontSize: 18,
    fontFamily: 'Geomanist',
    color: 'black',
    marginRight: 10,
    marginTop: 5
  },
  destination: {
    fontSize: 15,
    fontFamily: 'Geomanist',
    color: 'white'
  }
});

export default Account