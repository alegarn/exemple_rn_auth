import { useState } from 'react';
import {View, Text, Button, Alert, Image, StyleSheet } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

export default function ImagePicker() {
  const [currentImage, setCurrentImage] = useState(null);
  const [hasPermission, requestPermission] = useCameraPermissions();

  async function verifyPermission() {
    if (hasPermission .status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    };
    if (hasPermission .status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions", 'Access to camera is denied');
      return false;
    };
    return true;
  }

  const takePictureHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    };

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setCurrentImage(image.assets[0]);
  };

  let imagePreview = currentImage ? <Image source={{ uri: currentImage.uri}} style={styles.image}/> : <Text>No image captured yet</Text>;


  return (
    <View>
      <Text>ImagePicker</Text>
      <View style={styles.imageContainer}>
        {imagePreview}
      </View>
      <Button title="Pick an image from camera roll" onPress={takePictureHandler}/>
    </View>
  );
}

const styles = StyleSheet.create({

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  }
});
