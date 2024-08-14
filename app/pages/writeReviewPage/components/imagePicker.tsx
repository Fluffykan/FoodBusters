import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type ImagePickerButtonProps = {
  imageUri:string;
  setImageUri:(uri:string) => void;
}

export default function ImagePickerButton({imageUri, setImageUri}:ImagePickerButtonProps) {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {imageUri && 
      <View style={styles.container}><Image source={{ uri: imageUri }} style={styles.image} /></View>}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  image: {
    width: 200,
    height: 200,
  },
});
