import { View, Text, StyleSheet, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase, db } from "../config";

const Expense = ({ data }) => {
  const navigation = useNavigation();
  const expenseCollection = firebase.auth().currentUser.uid + '?tbl=expenses';
  const expenseRef = firebase.firestore().collection(expenseCollection).doc(data.id);
  function deleteExpense() {
    Alert.alert(
      'Delete Expense',
      'Please comfirm that you want to delete this expense: ' + data.expense_name,
      [
        {
          text: 'I confirm', onPress: () => {
            expenseRef.set({ delete: true }, { merge: true })
              .then(() => {
                Alert.alert(
                  'Successfully',
                  'You have deleted this expenses successfully ',
                  [
                    {
                      text: 'OK', onPress: () => {
                      }
                    },
                  ],
                  { cancelable: false },
                )
              })
              .catch((error) => {
                console.log(error);
              });
          }
        },
      ],
      { cancelable: false },
    );

  }
  function getTypeIcon(type) {
    switch (type) {
      case 'transportation':
        return <MaterialCommunityIcons
          name="car-estate"
          color='white'
          size='30'
        />;
      case 'food':
        return <MaterialCommunityIcons
          name="food"
          color='white'
          size='30'
        />;
      case 'equipment':
        return <MaterialCommunityIcons
          name="hammer-wrench"
          color='white'
          size='30'
        />;
      case 'accommodation':
        return <MaterialCommunityIcons
          name="home-city"
          color='white'
          size='30'
        />;
      case 'outsource':
        return <MaterialCommunityIcons
          name="account-cash-outline"
          color='white'
          size='30'
        />;
      default:
        return <MaterialCommunityIcons
          name="cash-multiple"
          color='white'
          size='30'
        />;
    }
  }
  return (
    <View style={styles.box}>
      <View style={styles.boxhalftop}>
        <View style={{ flexDirection: 'row', marginVertical: 2, marginLeft: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: 45, height: 45, borderColor: 'white', borderWidth: 2, borderRadius: '20' }}>
            {getTypeIcon(data.expense_type)}
          </View>
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <Text style={styles.value}>{data.expense_name}</Text>
            <Text style={styles.type}>{data.expense_type}</Text>
          </View>
        </View>
      </View>
      <View style={styles.boxhalfbottom}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <MaterialCommunityIcons
            name="calendar"
            color='#bd8dab'
            size='30'
          />
          <Text style={styles.field}>{data.date}</Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 10 }}
            name="clock-time-three"
            color='#bd8dab'
            size='30'
          />
          <Text style={styles.field}>{data.time}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
          <MaterialCommunityIcons
            style={{ marginLeft: 15, marginVertical: 5, marginRight: -10 }}
            name="currency-usd"
            color='black'
            size='55'
          />
          <Text style={styles.amount}>{data.amount}</Text>
          <TouchableOpacity style={{ marginTop: 10, marginLeft: 35, marginRight: 8 }} onPress={() => navigation.navigate('Update Expense', { data })}>
            <View style={{ backgroundColor: '#fbd9db', justifyContent: 'center', alignItems: 'center', width: 47, height: 47, borderColor: 'white', borderWidth: 2, borderRadius: '40' }}>
              <MaterialCommunityIcons
                name="pencil"
                color='#9a6787'
                size='28'
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={() => deleteExpense()}>
            <View style={{ backgroundColor: '#fbd9db', justifyContent: 'center', alignItems: 'center', width: 47, height: 47, borderColor: 'white', borderWidth: 2, borderRadius: '40' }}>
              <MaterialCommunityIcons
                name="delete"
                color='#9a6787'
                size='28'
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
  },
  box: {
    backgroundColor: '#fbd9db',
    borderRadius: 60,
    marginHorizontal: 10,
    width: 300,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  boxhalftop: {
    backgroundColor: '#fbd9db',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    width: 300,
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
    color: '#9a6787',
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
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5
  },
  boxhalfbottom: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomEndRadius: 50,
    width: 300,
    height: 130,
    flexDirection: 'column',
  }
});

export default Expense