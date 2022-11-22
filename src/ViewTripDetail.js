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
  Alert
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
const { forwardRef, useRef, useImperativeHandle } = React;


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const ViewTripDetail = ({ route }) => {
  const [state, setState] = useState(false);
  const [trip, setTrip] = useState(route.params.data);
  const [expenses, setExpenses] = useState([]);
  const expenseCollection = firebase.auth().currentUser.uid + '?tbl=expenses';
  const expenseRef = firebase.firestore().collection(expenseCollection).where("trip_id", "==", trip.id); //change later
  const tripCollection = firebase.auth().currentUser.uid + '?tbl=trips';
  const tripRef = firebase.firestore().collection(tripCollection).doc(trip.id);
  const childRef = useRef();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => { fetchExpense() }, [isFocused])

  console.log("Trip===>", trip);

  function DeleteTrip() {
    tripRef.set({deleted: true}, { merge: true })
      .then(() => {
        Alert.alert(
          'Successfully',
          'You have deleted this trip successfully ',
          [
            {
              text: 'OK', onPress: () => {
              }
            },
          ],
          { cancelable: false },
        );
        navigation.navigate('All Trips')
      })
      .catch((error) => {
        alert("Failed to delete trip. Error: ", error);
      });
  }

  async function fetchExpense() {
    await expenseRef.get().then(querySnapshot => {
      const lstOfExpenses = [];
      querySnapshot.forEach(doc => {
        const { amount, comment, date, expense_name, expense_type, time } = doc.data();
        console.log("expenses ===>", doc.data());
        if (!doc.data().delete) {
          lstOfExpenses.push({
            id: doc.id,
            amount,
            comment,
            date,
            expense_name,
            expense_type,
            time,
            trip_id: trip.id
          })
        }
      });
      console.log("lst Expenses: ", lstOfExpenses);
      setExpenses(lstOfExpenses);
    })
  }

  useEffect(() => {
    fetchExpense();
  }, [])

  async function getTripDetail() {
    await tripRef.get().then(querySnapshot => {
      var newtrip = { 'id': trip.id, ...querySnapshot.data() }
      console.log("get detail ==>", newtrip);
      setTrip(newtrip);
    })
  }


  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/melbourne.jpg")} resizeMode="cover" style={styles.image}>
        <View style={{ marginLeft: 25, marginBottom: 60, paddingTop: 10 }}>
          <Text style={styles.tripname}>{trip.trip_name}</Text>
          <Text style={styles.destination}>{trip.destination}</Text>
        </View>
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.title}>Details</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
            <MaterialCommunityIcons
              name="calendar"
              color='#bd8dab'
              size='30'
            />
            <Text style={styles.field}>{trip.dateStart}</Text>
            <MaterialCommunityIcons
              name="arrow-right-thin"
              color='#bd8dab'
              size='40'
            />
            <MaterialCommunityIcons
              style={{ marginLeft: 10 }}
              name="calendar"
              color='#bd8dab'
              size='30'
            />
            <Text style={styles.field}>{trip.dateEnd}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
            <MaterialCommunityIcons
              name="alert-outline"
              color='#bd8dab'
              size='30'
            />
            <Text style={styles.field}>Require risk assessment: </Text>
            <Text style={styles.value}>{trip.risk ? 'Yes' : 'No'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
            <MaterialCommunityIcons
              name="note-text-outline"
              color='#bd8dab'
              size='30'
            />
            <Text style={styles.field}>Description: </Text>
            <Text style={styles.value}>{trip.description}</Text>
          </View>
          <Text style={styles.title}>Expenses</Text>
        </View>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={expense => expense.id}
          data={expenses}
          renderItem={({ item }) => (
            <Expense data={item} />
          )}
        />
        <ActionButton buttonColor="#ffdadb">
          <ActionButton.Item
            buttonColor="#ffdadb"
            title="Delete trip"
            onPress={() => Alert.alert(
              'Delele Trip',
              'Do you want to delete this trip? ',
              [
                {
                  text: 'No', onPress: () => {
                    
                  }
                },
                {
                  text: 'Yes', onPress: () => {
                    DeleteTrip();
                  }
                },
              ],
              { cancelable: false },
            )}>
            <MaterialCommunityIcons
              name="delete"
              color='#bd8dab'
              size='30'
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#ffdadb"
            title="Update trip"
            onPress={() => { setState(true) }}>
            <MaterialCommunityIcons
              name="pencil"
              color='#bd8dab'
              size='30'
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#ffdadb"
            title="Add expense"
            onPress={() => { navigation.navigate('New Expense', { trip }) }}>
            <MaterialCommunityIcons
              name="plus"
              color='#bd8dab'
              size='30'
            />
          </ActionButton.Item>
        </ActionButton>
        <SafeAreaView>
          <Dialog
            visible={state}
            onTouchOutside={() => {
              setState(false);
            }}
            dialogAnimation={
              new SlideAnimation({
                slideFrom: "bottom",
              })
            }
            dialogTitle={<DialogTitle title="Update Trip" />}
            footer={
              <DialogFooter style={{
                justifyContent: 'flex-end'
              }}>
                <DialogButton text="CANCEL" onPress={() => { setState(false) }} />
                <DialogButton text="OK" onPress={() => {
                  childRef.current.handleSubmit();
                  setState(false);
                  getTripDetail();
                }} />
              </DialogFooter>
            }
            dialogStyle={{
              alignSelf: 'center',
              backgroundColor: "#FFFFFF",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingHorizontal: 10,
              maxHeight: deviceHeight * 0.65,
              width: deviceWidth * 0.8
            }}
          >
            <DialogContent style={{
              height: deviceHeight * 0.48,
              marginVertical: 10
            }}>
              <UpdateTrip data={trip} ref={childRef} />
            </DialogContent>
          </Dialog>
        </SafeAreaView>
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
    alignItems: 'flex-start',
    height: 280,
    width: '100%',
    paddingTop: 150
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 80,
    paddingTop: 50,
    width: deviceWidth * 0.95,
    height: deviceHeight * 0.65
  },
  tripname: {
    fontSize: 55,
    fontFamily: 'Hysteria',
    fontWeight: '1200',
    color: 'white'
  },
  title: {
    fontSize: 25,
    fontFamily: 'Geomanist',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10
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

export default ViewTripDetail