import { View, Text, StyleSheet, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Trip = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{marginVertical: 8}} onPress={() => navigation.navigate('Details', {data})}>
      <View style={styles.box}>
        <View style={styles.boxhalftop}>
          <View style={{ flexDirection: 'row', marginVertical: 2, marginLeft: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 45, height: 45, borderColor: 'white', borderWidth: 2, borderRadius: '20' }}>
              <MaterialCommunityIcons
                name="bag-suitcase-outline"
                color='white'
                size='40'
              />
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text style={styles.value}>{data.trip_name}</Text>
              <Text style={styles.type}>{data.destination}</Text>
            </View>
          </View>
        </View>
        <View style={styles.boxhalfbottom}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <MaterialCommunityIcons
              name="calendar"
              color='#86b4ea'
              size='30'
            />
            <Text style={styles.field}>{data.dateStart}</Text>
            <MaterialCommunityIcons
              name="arrow-right-thin"
              color='#86b4ea'
              size='30'
            />
            <MaterialCommunityIcons
              style={{ marginLeft: 10 }}
              name="calendar"
              color='#86b4ea'
              size='30'
            />
            <Text style={styles.field}>{data.dateEnd}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
            <MaterialCommunityIcons
              style={{ marginLeft: 5, marginVertical: 5, marginRight: -10 }}
              name="currency-usd"
              color='black'
              size='55'
            />
            <Text style={styles.amount}>{(Math.random() * 1000).toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  },
  box: {
    backgroundColor: '#c6e6ff',
    borderRadius: 60,
    marginHorizontal: 10,
    width: 340,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  boxhalftop: {
    backgroundColor: '#c6e6ff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    width: 340,
    height: 70
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Geomanist',
    color: '#1f2735',
    marginRight: 5,
    marginTop: 5
  },
  type: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Geomanist',
    color: '#63abd6',
    marginRight: 5,
    marginTop: 1
  },
  field: {
    fontSize: 18,
    fontFamily: 'Geomanist',
    color: '#463284',
    marginLeft: 10,
    marginRight: 15,
    marginTop: 5
  },
  amount: {
    marginTop: 5,
    fontSize: 45,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5
  },
  boxhalfbottom: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomEndRadius: 50,
    width: 340,
    height: 130,
    flexDirection: 'column',
  }
});

export default Trip