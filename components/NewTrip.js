import { Formik, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { Button, TextInput, View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { forwardRef, useRef, useImperativeHandle } = React;
import { firebase, db } from "../config";
import DateTimePicker from '@react-native-community/datetimepicker';


// Then inside the component body

const NewTrip = forwardRef((props, ref) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [trip, setTrip] = useState({});
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const tripCollection = firebase.auth().currentUser.uid + '?tbl=trips';
    const tripFB = firebase.firestore().collection(tripCollection);
    const formRef = useRef();

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);


    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate;
        setStart(currentDate);
    };

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate;
        setEnd(currentDate);
    };


    const showDatepicker = () => {
        setShowStart(true)
    };

    const showEndPicker = () => {
        setShowEnd(true)
    };

    useImperativeHandle(ref, () => ({
        uploadData() {
          alert("Test")
        },
        handleSubmit() {
            if (formRef.current) {
              formRef.current.handleSubmit()
            }
          }
      }));
    return (
        <Formik
            innerRef={formRef}
            initialValues={{
                trip_name: '',
                dateStart: '',
                dateEnd: '',
                destination: '',
                description: '',
                risk: false
            }}
            onSubmit={values => {
                console.log("new trip ==>", start, end)
                values.risk = isEnabled;
                values.dateStart = start.getDate() + '/' + (start.getMonth() + 1) + '/' + start.getFullYear();
                values.dateEnd = end.getDate() + '/' + (end.getMonth() + 1) + '/' + end.getFullYear();
                console.log("New Trip ===> ",values);
                tripFB.add(values)
                .then((docRef) => {
                    Alert.alert(
                        'Successfully',
                        'You have created new trip successfully ',
                        [
                          {
                            text: 'OK', onPress: () => {
                            }
                          },
                        ],
                        { cancelable: false },
                      );
                    console.log("New Trip with ID: ", docRef.id);
                })
                .catch((error) => {
                    alert("Failed to add new trip. Error: ", error);
                });
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => ( 
            <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}>
                <View>
                    <Text style={styles.header}>Trip name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('trip_name')}
                        onBlur={handleBlur('trip_name')}
                        value={values.name}
                        placeholder="Trip name..."
                    />
                    <Text style={styles.header}>Start date</Text>
                    <TextInput
                        style={styles.input}
                        onFocus={showDatepicker}
                        
                        onChangeText={handleChange('dateStart')}
                        onBlur={() => setShowStart(false)}
                        value={start.getDate() + '/' + (start.getMonth() + 1) + '/' + start.getFullYear()}
                        placeholder="dd/mm/yyyy"
                    />
                    {showStart && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={start}
                            mode='date'
                            display='spinner'
                            onChange={(e, d) => onChangeStart(e, d)}
                        />
                    )}
                    <Text style={styles.header} >End date</Text>
                    <TextInput
                        style={styles.input}
                        onFocus={() => showEndPicker()}
                        onChangeText={handleChange('dateEnd')}
                        onBlur={() => setShowEnd(false)}
                        value={end.getDate() + '/' + (end.getMonth() + 1) + '/' + end.getFullYear()}
                        placeholder="dd/mm/yyyy"
                    />
                    {showEnd && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={end}
                            mode='date'
                            is24Hour={true}
                            display='spinner'
                            onChange={(event, date) => onChangeEnd(event, date)}
                        />
                    )}
                    <Text style={styles.header}>Destination</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('destination')}
                        onBlur={handleBlur('destination')}
                        value={values.destination}
                        placeholder="London..."
                    />
                    <Text style={styles.header}>Description</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        placeholder="Working..."
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Text style={{ fontFamily: 'Geomanist', fontSize: 14, marginRight: 10}}>Require risk assessment</Text>
                        <Switch
                            trackColor={{ false: "#fbd9db", true: "#fbd9db" }}
                            thumbColor={isEnabled ? "#9a6787" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </ScrollView>
            )}
        </Formik>
    )
})

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        fontFamily: 'Geomanist',
        fontSize: 16
    },
    input: {
        height: 40,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
        marginVertical: 5
    },
});

export default NewTrip