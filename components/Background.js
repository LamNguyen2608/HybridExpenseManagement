import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/home-04.png")} resizeMode="cover" style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  }
});
export default Background