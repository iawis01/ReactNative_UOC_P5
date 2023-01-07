import {Text, View, Button, Image, Alert, Platform, TouchableOpacity,  } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { PermissionsAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

import { addDoc, collection, doc, Firestore, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../db/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import uuid from "react-native-uuid";

function PhotoMenu({passId}){
  const [pickedImage, setPickedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(false);
  const[cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [fireStorageUri, setFireStorageUri] = useState('');
  const storage = getStorage();
  const identifier = uuid.v4();

  const navigation = useNavigation();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Goal Photo App Camera Permission",
          message:
            "Goal Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  async function verifyPermissions(){
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
       const permissionResponse = await requestPermission();
       return permissionResponse.granted;
    }
     if(cameraPermissionInformation.status === PermissionStatus.DENIED){
       Alert.alert("Camera permissions needed for use this app.");
       return false;
     }
     return true;
   }

  async function takeImageHandler(){
    if(Platform.OS === "android"){
      const hasPermission = await requestCameraPermission();
  
      if(!hasPermission) {
        return;
        }
      }


   if(Platform.OS === "ios"){
    const hasPermission = await verifyPermissions();

    if(!hasPermission) {
      return;
    }
    }
  
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.5,

    });
    setPickedImage(image.uri);
    
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.uri);
    }
  }

  async function uploadImage(imageUri) {
    
      try {
        const response = await fetch(imageUri)
        const blobFile = await response.blob()
    
        const reference = ref(storage, identifier)
        const result = await uploadBytes(reference, blobFile)
        const url = await getDownloadURL(result.ref)

          setUploadedImage(true);
          setFireStorageUri(url);
          alert("Imagen subida a FireStorage. Pulsa Save imagen para subir a elemento");
    
        return url
        
      } catch (err) {
        setUploadedImage(false);
        return Promise.reject(err)
    }
    }

    async function editPhotoGoal(passId, fireStorageUri) {

      const goal = doc(db, "retos", passId);

       updateDoc(goal, {
        iconoURI: fireStorageUri
      });
  
      navigation.navigate("Home");
      alert("Foto añadida a elemento");
    }



  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <TouchableOpacity style={styles.buttonStyle}>
        <FontAwesomeIcon.Button name ="camera"  onPress={() => takeImageHandler()} >
        Take photo with camera
          </FontAwesomeIcon.Button>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle}>
        <FontAwesomeIcon.Button name ="photo"  onPress={() => pickImage()} >
        Select gallery image
          </FontAwesomeIcon.Button>
      </TouchableOpacity>
      {pickedImage && <Image source={{ uri: pickedImage }} style={styles.image} />}
      {pickedImage && !uploadedImage && <TouchableOpacity style={styles.buttonStyle}>
        <FontAwesomeIcon.Button name ="save"  onPress={() => uploadImage(pickedImage)} >
        Upload Image
          </FontAwesomeIcon.Button>
      </TouchableOpacity>}
      {fireStorageUri && <TouchableOpacity style={styles.buttonStyle}>
        <FontAwesomeIcon.Button name ="save"  onPress={() => editPhotoGoal(passId, fireStorageUri)} >
        Save Image
          </FontAwesomeIcon.Button>
      </TouchableOpacity>}
      


  </View>
}



export default PhotoMenu;
const styles = StyleSheet.create({
  imagePreview: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  image: {
    width: 100,
    height: 100
  },
  buttonStyle: {
      color: "white",
      fontSize: 30,
      lineHeight: 70,
      margin: 15,
      marginHorizontal: 40,
      borderRadius: 15,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
      
  
    }

});