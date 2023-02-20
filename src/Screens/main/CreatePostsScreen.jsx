
import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet,TouchableWithoutFeedback,TextInput,Keyboard,Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Fontisto, EvilIcons, AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';

const initialState = {
  photoName: '',
  photoLocation:'',
}

export default CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const isPhotoDataReady = !!photo && !!state.photoName && !!state.photoLocation;

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const refreshPhoto = () => {
    setPhoto('')
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      getLocation();
      setPhoto(uri);
      setCoordinates('');
    }
  };

  const publishPost = () => {
    navigation.navigate('DefaultScreen', { photo })
    setPhoto('')
    setState(initialState)
  }

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync();
    const coordinates = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    setCoordinates(coordinates);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
       <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {photo ? (
           <>
           <View style={styles.imageContainer}>
             <Image style={styles.image} source={{ uri: photo }} />
           </View>
              <TouchableOpacity
                activeOpacity={0.8}
             style={styles.refreshButton}
             onPress={refreshPhoto}
           >
            <Fontisto name="spinner-refresh" size={20} color="#BDBDBD" style={ styles.iconCamera} />
           </TouchableOpacity>
         </>
        ) : (
          <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.photoView}>
                  <TouchableOpacity
                    activeOpacity={0.8}
              style={styles.flipContainer}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
            </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                  style={styles.button}
                  onPress={takePhoto}
                > 
                   <Fontisto name="camera" size={20} color="#BDBDBD" style={ styles.iconCamera} />
              <View style={styles.takePhotoOut}>
                <View style={styles.takePhotoInner}></View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
        )
      }
      
        </View>
        <Text style={styles.text}>
          {photo?'Edit photo': 'Download photo' }
        </Text>
        <View style={styles.inputContainer}>
          <TextInput style={{...styles.input,paddingBottom:15}} textAlign="left" placeholder="Name..." placeholderTextColor="#BDBDBD" onFocus={() => { setIsShownKeyboard(true) }} onChangeText={(value) => setState(prevState => ({ ...prevState, photoName: value }))} value={state.photoName} />
          <TextInput style={{...styles.input,paddingBottom:15,paddingLeft:20}} textAlign="left" placeholder="Location..." placeholderTextColor="#BDBDBD" onFocus={() => { setIsShownKeyboard(true) }} onChangeText={(value) => setState(prevState => ({ ...prevState, photoLocation: value }))} value={state.photoLocation}/>
     <EvilIcons name="location" size={24} color="#BDBDBD" style={styles.iconLocation} />
        </View>
        <TouchableOpacity onPress={publishPost} style={{...styles.btnPublish,backgroundColor: isPhotoDataReady ? "#FF6C00" : "#F6F6F6"}} activeOpacity={0.8} disabled={!isPhotoDataReady}>
          <Text style={{...styles.textBtnPublish,color: isPhotoDataReady ? "#FFFFFF" : "#BDBDBD"}}>Publish</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={styles.btnDelete} activeOpacity={0.8}>
        <AntDesign name="delete" size={20} color="#BDBDBD" style={{alignSelf:'center'}} />
        </TouchableOpacity>
    </View>
   </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cameraContainer: {
        height: 243,
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        width: 365,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        
      },
  camera:
  {
    height: '100%',
    width: '100%',
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "center",
  },

  button: {
    alignSelf:'center',
  },
  refreshButton: {
    position: "absolute",
    top: 90,
    right: 155,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 50,
    alignSelf:'center',
  },
  iconCamera: {
    zIndex:1,
    position: 'absolute',
    top: 18,
    left:18,
  },
  takePhotoOut: {
    borderColor: "white",
    height: 60,
    width: 60,
    borderRadius: 50,
  },

  takePhotoInner: {
    borderColor: "white",
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderRadius: 50,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    marginTop: 8,
    paddingHorizontal:13,
    color: '#BDBDBD',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'start',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    marginTop: 48,
  },
  input: {
    marginBottom:32,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    width: 365,
    color: '#BDBDBD',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'start',
    alignSelf: 'flex-start',
  },
  iconLocation: {
    position: 'absolute',
    top: 65,
    left:-5,
    
  },
  btnPublish: {
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    width: 365,
    height: 51,
    alignItems: 'center',
    justifyContent:'center',
  },
  textBtnPublish: {
    color: '#BDBDBD',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight:19,
  },
  btnDelete: {
    width: 70,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    marginTop: 75,
    paddingTop: 8,
    paddingBottom:8,
  },
});