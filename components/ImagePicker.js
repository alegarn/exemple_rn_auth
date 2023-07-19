import {View, Text, Button, Alert } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

export default function ImagePicker() {

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
    console.log(image);
  }

  return (
    <View>
      <Text>ImagePicker</Text>
      <View>

      </View>
      <Button title="Pick an image from camera roll" onPress={takePictureHandler}/>
    </View>
  );
}
