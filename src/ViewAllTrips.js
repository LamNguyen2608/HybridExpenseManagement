import {
  Button,
  View,
  Text,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import Dialog, {
  DialogContent,
  SlideAnimation,
  DialogTitle,
  DialogButton,
  DialogFooter,
} from "react-native-popup-dialog";
import Trip from "../components/Trip";
import { useNavigation } from '@react-navigation/native'
import { firebase, db } from "../config";
import { FlatList } from "react-native-gesture-handler";
import NewTrip from "../components/NewTrip";
const { forwardRef, useRef, useImperativeHandle } = React;
import { useIsFocused } from '@react-navigation/native';
import Background from "../components/Background";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const ViewAllTrips = () => {
  const [state, setState] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [trips, setTrips] = useState([]);
  const tripCollection = firebase.auth().currentUser.uid + '?tbl=trips';
  const tripFB = firebase.firestore().collection(tripCollection);
  const childRef = useRef();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => { fetchData() }, [isFocused])

  async function fetchData() {
    await tripFB.get().then(querySnapshot => {
      const lstOfTrips = [];
      querySnapshot.forEach(doc => {
        const { trip_name, dateStart, destination, status, risk, dateEnd, description } = doc.data();
        if (doc.data().deleted) {
        } else {
          lstOfTrips.push({
            id: doc.id,
            trip_name,
            dateStart,
            dateEnd,
            destination,
            status,
            risk,
            description
          })
        }
      });
      setTrips(lstOfTrips);
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (refreshing) {
    fetchData();
    setRefreshing(false);
  }

  return (
    <Background>
      <SafeAreaView style={{ marginTop: 110 }}>
        {console.log(navigation)}
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={trip => trip?.id}
          data={trips}
          renderItem={({ item }) => (
            <Trip data={item} />
          )}
        />
        <Background>
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
          dialogTitle={<DialogTitle title="New Trip"/>}
          footer={
            <DialogFooter style={{
              justifyContent: 'flex-end'
            }}>
              <DialogButton text="CANCEL" onPress={() => { setState(false) }} />
              <DialogButton text="OK" onPress={() => {
                childRef.current.handleSubmit();
                setState(false);
                setRefreshing(true);
              }} />
            </DialogFooter>
          }
          dialogStyle={{
            alignSelf: 'center',
            backgroundColor: '#ffffff',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingHorizontal: 10,
            maxHeight: deviceHeight * 0.7,
            width: deviceWidth * 0.8
          }}
        >
          <DialogContent style={{
            height: deviceHeight * 0.55,
            marginTop: 10
          }}>
            <NewTrip ref={childRef} />
          </DialogContent>
        </Dialog>
        </Background>
      </SafeAreaView>
      <TouchableOpacity
          onPress={() => setState(true)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            position: 'absolute',
            bottom: 15,
            right: 15,
            height: 60,
            backgroundColor: '#ffdadb',
            borderRadius: 100,
          }}
        >
          <MaterialCommunityIcons
              name="plus"
              color='#bd8dab'
              size='30'
            />
        </TouchableOpacity>
    </Background>
  );
};

export default ViewAllTrips;
