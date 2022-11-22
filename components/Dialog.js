import {
    View,
    Text,
    TextInput,
    Dimensions,
    SafeAreaView,
    TouchableWithoutFeedback,
  } from "react-native";
import React from 'react'
import Dialog, {
    DialogContent,
    SlideAnimation,
    DialogTitle,
    DialogButton,
    DialogFooter,
  } from "react-native-popup-dialog";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const Dialog = ({visible}) => {
  return (
    <SafeAreaView>
        <Dialog
          visible={visible}
          onTouchOutside={() => {
            setState(false);
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          dialogTitle={<DialogTitle title="Dialog Title" />}
          footer={
            <DialogFooter style={{
              flex: 1,
              justifyContent: 'flex-end',
              height: 20
            }}>
              <DialogButton text="CANCEL" onPress={() => {setState(false)}} />
              <DialogButton text="OK" onPress={() => {}} />
            </DialogFooter>
          }
          dialogStyle={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingHorizontal: 10,
            maxHeight: deviceHeight * 0.7,
            width: deviceWidth * 0.8
          }}
        >
          <DialogContent style={{
            height: deviceHeight * 0.55
          }}>
            <Text>Hello</Text>
          </DialogContent>
        </Dialog>
      </SafeAreaView>
  )
}

export default Dialog