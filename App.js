import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, LogBox } from "react-native";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect, createContext } from "react";
import { NativeBaseProvider } from "native-base";
import { firebase } from "./config";
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from "./src/Login";
import Register from "./src/Register";
import Dashboard from "./src/Dashboard";
import Account from "./src/Account";
import Settings from "./src/Settings";
import ViewAllTrips from "./src/ViewAllTrips";
import ViewTripDetail from "./src/ViewTripDetail";
import Header from "./components/Header";
import NewTrip from "./components/NewTrip";
import NewExpense from "./components/NewExpense";
import UpdateExpense from "./components/UpdateExpense";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const UserContext = createContext();

function TripStack() {
  return (
    <Stack.Navigator
      initialRouteName="All Trips">
      <Stack.Screen
        name="All Trips"
        component={ViewAllTrips} 
        options={{
          headerTransparent: true,
          headerTitle: () => <Header name="Trip Records" />,
          headerStyle: {
            height: 100,
            shadowColor: "#000",
            color: 'white'
          },
          headerTitleAlign: 'center'}}/>
      <Stack.Screen
        name="Details"
        component={ViewTripDetail}
        options={{
          headerTransparent: true,
          headerTitle: () => <Header name="Trip Details" />,
          headerStyle: {
            height: 100,
            shadowColor: "#000",
            color: 'white'
          },
          headerTitleAlign: 'center'}}/>
      <Stack.Screen
        name="New Expense"
        component={NewExpense}
        options={{
          headerTransparent: true,
          headerTitle: () => <Header name="New Expense" />,
          headerStyle: {
            height: 100,
            shadowColor: "#000",
            color: 'white'
          },
          headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Update Expense"
        component={UpdateExpense}
        options={{
          headerTransparent: true,
          headerTitle: () => <Header name="Update Expense" />,
          headerStyle: {
            height: 100,
            shadowColor: "#000",
            color: 'white'
          },
          headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
}

function AuthenticationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTransparent: true,
          headerTitle: () => <Header name="Login" />,
          headerStyle: {
            height: 100,
            shadowColor: "#000",
            color: 'white'
          },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTransparent: true,
          headerTitle: () => <Header name="Register" />,
          headerStyle: {
            height: 100,
            shadowColor: "#000",
            color: 'white'
          },
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  const [initialize, setInitialize] = useState(true);
  const [user, setUser] = useState();
  LogBox.ignoreAllLogs();//Ignore all log notifications

  function onAuthStateChange(user) {
    setUser(user);
    if (initialize) setInitialize(false);
  }

  useEffect(() => {
    const mauth = firebase.auth().onAuthStateChanged(onAuthStateChange);
    return mauth;
  }, []);

  if (initialize) return null;

  if (!user) {
    return (
      AuthenticationStack()
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Trips"
      screenOptions={{
        activeTintColor: '#b7a5e7',
      }}>
      <Tab.Screen
        name="Trips"
        component={TripStack}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="wallet-travel"
              color={color}
              size={size}
            />
          ),
        }} />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerTransparent: true,
          headerTitle: () => <Header name="Account" />,
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            />
          ),
        }} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="menu"
              color={color}
              size={size}
            />
          ),
        }} />
    </Tab.Navigator>
  );
}

export default () => {
  const [loaded] = useFonts({
    Geomanist: require('./assets/fonts/geomanist.otf'),
    Hysteria: require('./assets/fonts/hysteria.otf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};


