import React from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AppUtils from '../../utils/appUtils';

const CustomImagePickerModal = (props) => {
  const openGallery = () => {
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: false,
        mediaType: "photo",
      }).then(image => {
        props.attachments(image);
        props.pressHandler();
      });
    } catch (error) {
      AppUtils.showToast(error?.message ?? "Error")
    }
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: false,
    }).then(image => {
      props.attachments(image);
      props.pressHandler();
    });
  };

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      {...props}>
      <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
        <View style={styles.modalContanier}>
          <View style={styles.pickerContanier}>
            <Text style={styles.chooseMedia}>Choose Media</Text>
          </View>

          <View style={styles.optionsContanier}>
            <TouchableOpacity onPress={() => openGallery()}>
              <Text style={styles.options}>GALLERY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openCamera()}>
              <Text style={styles.options}>CAMERA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalScreen: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContanier: {
    backgroundColor: 'white',
    height: '17%',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  chooseMedia: {
    fontSize: 16,
  },
  options: {
    fontSize: 16,
    color: '#2F6A98',
  },
  optionsContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CustomImagePickerModal;
