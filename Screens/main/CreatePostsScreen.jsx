// import React,{useState} from 'react';
// import { View,  StyleSheet, TouchableOpacity,Text,Image} from 'react-native';
// import { Camera } from 'expo-camera';
// import { Fontisto } from '@expo/vector-icons';
// import * as MediaLibrary from "expo-media-library";

// export default CreatePostsScreen = () => {
//   // let camera: Camera
  
//   const [cameraRef, setCameraRef] = useState(null);
//   const [photo, setPhoto] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [hasPermission, setHasPermission] = useState(null);

// //   const startCamera = async() => {
// //     const {status} = await Camera.requestPermissionsAsync()
// //  if(status === 'granted'){
// //    // do something

// //  }else{
// //    Alert.alert("Access denied")
// //  }
//   // }
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();

//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const takePhoto = async () => {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//     // if (cameraRef) {
//     //   await cameraRef.onCameraReady();
//     //   const { uri } = await cameraRef.takePictureAsync();
//     //   // await onCameraReady(uri);
//     //   // await MediaLibrary.createAssetAsync(uri);
//     //   setPhoto(uri);
//     // }
//     // const photoUri = await camera.takePictureAsync();
//     // console.log(photo.uri);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cameraContainer}>
//       <Camera style={styles.camera} ref={(ref) => {
//                 setCameraRef(ref);
//               }} type={type} >
//           {photo && (
//              <View style={styles.imageContainer}>
//              <Image source={{ uri: photo }} style={styles.image} />
//             </View>
//           )
//        }
//           <View style={styles.photoView}>
//           <TouchableOpacity style={styles.buttonContainer} onPress={takePhoto}>
//             <Fontisto name="camera" size={20} color="#BDBDBD" style={ styles.iconCamera} />
//           </TouchableOpacity>
//          </View>
    
//       </Camera>
//    </View>
//       <Text style={styles.text}>Download photo</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   cameraContainer: {
//     height: 243,
//     marginTop: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F6F6F6',
//     width: 343,
//     borderWidth: 1,
//     borderColor: '#E8E8E8',
//     borderRadius: 8,
//   },
  
//   camera: {

  
//     height: '100%',
//     // marginTop: 32,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // backgroundColor: 'transparent',
//     width: '100%',
//     // borderWidth: 1,
//     // borderColor: '#E8E8E8',
//     // borderRadius: 8,
    
//   },
//   buttonContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     width: 60,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   iconCamera: {
//   },
//   text: {
//     marginTop: 8,
//     color: '#BDBDBD',
//     fontSize: 16,
//     lineHeight: 19,
//     textAlign: 'start',
//     alignItems: 'flex-start',
    
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   photoView: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "center",
//   },
  

// })



import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet,TouchableWithoutFeedback } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Fontisto } from '@expo/vector-icons';

export default CreatePostsScreen = ({navigation}) => {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

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
    }
    
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
       <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {photo ? (
           <>
           <View style={styles.imageWrapper}>
             <Image style={styles.image} source={{ uri: photo }} />
           </View>
           <TouchableOpacity
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
        width: 343,
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
  // refreshButton: {
  //   position: "absolute",
  //   top: 10,
  //   right: 10,
  //   alignSelf: "center",
  //   width: 40,
  //   height: 40,
  //   backgroundColor: "rgba(255, 255, 255, 0.3)",
  //   borderRadius: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
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
  }
});