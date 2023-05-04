import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import SolidView from "../components/SolidView";
import { useTheme } from "@react-navigation/native";
import ViewShot from "react-native-view-shot";
import CustomBtn from "../components/CustomBtn";
import RNFetchBlob from "rn-fetch-blob";
import FileViewer from 'react-native-file-viewer';

const ScreenTest = () => {
    const { colors } = useTheme();
    const ref = useRef(null);
    const [capturedImg, setCapturedImg] = useState(null)
    const [list, setList] = useState([])
    const styles = style(colors);
    const scrollref = useRef(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        let temp = []
        for (let i = 0; i < 18; i++) {
            temp.push({ value: i })
        }
        setList(temp)
    }, [])
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
            //  setKeyboardHeight(e.endCoordinates.height) 
            // console.log(e);
            setTimeout(() => {
                // scrollref?.current?.scrollToOffset({ scrollToOffset: e.endCoordinates.screenY, animated: true })
            }, 250);
        });
        const hideSubscription = Keyboard.addListener('keyboardWillHide', () => setKeyboardHeight(0));
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        }
    }, []);
    // useEffect(() => {
    //     console.log(keyboardHeight);
    //     if (keyboardHeight) {
    //         // scrollref?.current?.scrollTo({ x: 0, y: keyboardHeight, animated: true })
    //     }
    // }, [keyboardHeight])

    const captureImg = async () => {
        ref.current.capture().then(uri => {
            // console.log("do something with ", uri);
            setCapturedImg(uri)
        });
    }
    const viewImg = () => {
        console.log(capturedImg);
        try {
            FileViewer.open(capturedImg, {
                showOpenWithDialog: true,
                // onDismiss: () => RNFetchBlob.fs.unlink(res.path()),
            });
            // RNFetchBlob.config({
            //     fileCache: true,
            // })
        } catch (e) {
        }
    }



    return (
        <SolidView view={
            // <View>
            //     <ViewShot style={{ padding: 16 }} ref={ref}>
            //         <Text style={style(colors).txt}>Name: Solidappmaker</Text>
            //         <Text style={style(colors).txt}>Email: solidappmaker@gmail.com</Text>
            //         <Text style={style(colors).txt}>Phone no.:+91 9870876878</Text>
            //         <Text style={style(colors).txt}>Address: Mohali, India</Text>
            //     </ViewShot>
            //     <CustomBtn titleTxt={"Capture Image"}
            //         onPress={() => {
            //             captureImg()
            //         }}
            //     />
            //     {capturedImg &&
            //         <View>
            //             <Image source={{ uri: capturedImg }} style={{ height: 100, resizeMode: "contain" }} />
            //             <CustomBtn titleTxt={"View Image"}
            //                 onPress={() => {
            //                     viewImg()
            //                 }}
            //             />
            //         </View>
            //     }
            //     <Text>sdf</Text>
            // </View>
            <View style={{ padding: 10 }}>
                <CustomBtn
                    titleTxt={"Pdf"}
                    onPress={() => {
                    }}
                />
                {/* <KeyboardAvoidingView behavior={Platform?.OS == "ios" ? "padding" : null} keyboardVerticalOffset={40}> */}
                {/* <FlatList
                    ref={scrollref}
                    showsVerticalScrollIndicator={false}
                    data={list}
                    getItemLayout={(data, index) => (
                        { length: 66, offset: 66 * index, index }
                    )}
                    renderItem={({ item, index }) => {
                        return (
                            <TextInput
                                placeholder={index?.toString()}
                                placeholderTextColor={colors?.text}
                                style={{ backgroundColor: 'grey', marginBottom: 16, height: 66, fontSize: 41 }}
                                onFocus={() => {
                                    // console.log(keyboardHeight)
                                    setTimeout(() => {
                                        console.log(index);
                                        scrollref?.current?.scrollToIndex({ index: index, viewPosition: 0, animated: true })
                                    }, 250);
                                }}
                            />
                        )
                    }}
                /> */}
                {/* </KeyboardAvoidingView> */}
            </View>
        } />
    )
}

export default ScreenTest;

const style = theme => StyleSheet.create({
    txt: {
        fontSize: 20, marginBottom: 4, color: theme?.red
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
})