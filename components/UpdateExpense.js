import { Formik, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { Button, TextInput, View, Text, StyleSheet, Switch, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { forwardRef, useRef, useImperativeHandle } = React;
import { firebase, db } from "../config";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Background from './Background';

// Then inside the component body

const UpdateExpense = ({ route, navigation }) => {
    const data = route.params.data;
    const expenseCollection = firebase.auth().currentUser.uid + '?tbl=expenses';
    const expenseRef = firebase.firestore().collection(expenseCollection).doc(data.id);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('other');
    const [items, setItems] = useState([
        { label: 'Transportation', value: 'transportation' },
        { label: 'Food', value: 'food' },
        { label: 'Accommodation', value: 'accommodation' },
        { label: 'Outsource', value: 'outsource' },
        { label: 'Equipment', value: 'equipment' },
        { label: 'Other...', value: 'other' }
    ]);
    const [dates, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setMode('date')
        setShow(true)
    };

    const showTimepicker = () => {
        setMode('time')
        setShow(true)
    };
    return (
        <Background>
            <Formik
                initialValues={{
                    amount: data.amount,
                    comment: data.comment,
                    date: data.date,
                    expense_name: data.expense_name,
                    expense_type: data.expense_type,
                    time: data.time,
                    trip_id: data.trip_id
                }}
                onSubmit={values => {
                    values.date = dates.getDate() + '/' + (dates.getMonth() + 1) + '/' + dates.getFullYear();
                    values.time = dates.getHours() + ':' + dates.getMinutes();
                    values.expense_type = value;
                    console.log("Update Expense ===> ", values);

                    expenseRef.set(values, { merge: true })
                        .then((docRef) => {
                            Alert.alert(
                                'Successfully',
                                'You have updated this expense successfully ',
                                [
                                  {
                                    text: 'OK', onPress: () => {
                                    }
                                  },
                                ],
                                { cancelable: false },
                              );
                            navigation.goBack();
                            console.log("New Expense with ID: ", docRef.id);
                        })

                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        automaticallyAdjustKeyboardInsets={true}>
                        <View style={{ padding: 10, marginTop: 100 }}>
                            <Text style={styles.header}>Expense name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('expense_name')}
                                onBlur={handleBlur('expense_name')}
                                value={values.expense_name}
                                placeholder="Booking grab.."
                            />
                            <Text style={styles.header}>Expense Type</Text>
                            <DropDownPicker
                                style={styles.input}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                            />
                            <Text style={styles.header}>Amount:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('amount')}
                                onBlur={handleBlur('amount')}
                                value={values.amount}
                                placeholder="180.25..."
                                keyboardType='numeric'
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.header}>Date</Text>
                                    <TextInput
                                        style={styles.inputDate}
                                        onBlur={() => setShow(false)}
                                        onFocus={showDatepicker}
                                        value={(dates.getDate() == new Date().getDate()) ? values.date : (dates.getDate() + '/' + (dates.getMonth() + 1) + '/' + dates.getFullYear())}
                                        placeholder="dd/mm/yyyy"
                                    />
                                </View>
                                <View style={{ flexDirection: 'column', paddingLeft: 12 }}>
                                    <Text style={styles.header}>Time</Text>
                                    <TextInput
                                        style={styles.inputTime}
                                        onBlur={() => setShow(false)}
                                        onFocus={showTimepicker}
                                        value={(dates.getDate() == new Date().getDate()) ? values.time : (dates.getHours() + ':' + dates.getMinutes())}
                                        placeholder="hh:mm"
                                    />
                                </View>
                            </View>

                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dates}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onChange}
                                    display='spinner'
                                    themeVariant='light'
                                    accentColor='#9c618a'
                                    textColor='white'
                                />
                            )}

                            <Text style={styles.header}>Comment:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('comment')}
                                onBlur={handleBlur('comment')}
                                value={values.comment}
                                placeholder="Need billings"
                            />
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={styles.button}
                            >
                                <Text style={{ fontFamily: 'Geomanist', fontSize: 18, color: '#bd8dab' }}>Update this expense</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
            </Formik>
        </Background>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        fontFamily: 'Geomanist',
        fontSize: 18,
        color: 'white'
    },
    input: {
        height: 40,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        width: 350,
        height: 50
    },
    inputDate: {
        height: 40,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 10,
        backgroundColor: 'white',
        width: 170,
        height: 50
    },
    inputTime: {
        height: 40,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        width: 150,
        height: 50
    },
    button: {
        marginTop: 30,
        marginLeft: 70,
        height: 70,
        width: 200,
        backgroundColor: '#ffdadb',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        fontFamily: 'Geomanist'
    }
});

export default UpdateExpense