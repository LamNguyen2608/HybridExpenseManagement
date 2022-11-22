import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native'
import React, {useState} from 'react'

const deviceHeight = Dimensions.get("window").height;
const BottomDialog = ({onTouchOutside}) => {
    const [show, setShow] = useState(true);
    const renderOutsideTouchable = (onTouch) => {
        const view = <View style={{flex: 1, width: "100%"}} />
        if (!onTouch) return view
        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: "100%"}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }
  return (
    <Modal
        animationType='fade'
        transparent={show}
        visible={show}
        onRequestClose={() => {setShow(false)}}>
        <View style={{
            flex:1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end'}}
            >
                {renderOutsideTouchable(onTouchOutside)}
                <View style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    paddingHorizontal: 10,
                    maxHeight: deviceHeight * 0.7
                }}>
                    <View>
                       <Text> HIIIII </Text>
                    </View>
                </View>
            </View>
    </Modal>
  )
}

export default BottomDialog