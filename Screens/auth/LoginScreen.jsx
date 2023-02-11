import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,Dimensions,Image,Button } from 'react-native';
import { React, useState,useCallback,useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

const initialState = {
  email: '',
  password:'',
}


export default LoginScreen = ({navigation}) => {
  console.log('navigation', navigation);
  const bgImage = require('../../assets/images/photo-bg.png');
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium':require('../../assets/fonts/Roboto-Medium.ttf'),
  })

  useEffect(() => {
        const onChange = () => {
          const width = Dimensions.get('window').width;
          console.log('width', width);
          setDimensions(width)
        }
        const listener= Dimensions.addEventListener('change', onChange);
        return () => {
          listener.remove();
        }
      },[])
  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    
  }
  const submit = () => {
    console.log(state); 
    setState(initialState);
    navigation.navigate('HomeScreen');
  }

const onLayoutRootView = useCallback(async () => {
  if (fontsLoaded) {
    await SplashScreen.hideAsync();
  }
}, [fontsLoaded]);

if (!fontsLoaded) {
  return null;
}

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground source={bgImage} style={styles.image}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={{ ...styles.form, marginBottom: isShowKeyBoard ? -240 : 0, width:dimensions }}>
              <Text style={styles.titleForm}>
                Log In
              </Text>
              <TextInput style={styles.input} textAlign={'start'} onFocus={() => { setIsShowKeyBoard(true) }} onChangeText={(value) => setState(prevState => ({ ...prevState, email: value }))} value={state.email} placeholder={ 'Email'}/>
              <TextInput style={styles.input} textAlign={'start'} onFocus={() => { setIsShowKeyBoard(true) }} onChangeText={(value) => setState(prevState => ({ ...prevState, password: value }))} value={state.password} placeholder={'••••••••••••'} />
              <TouchableOpacity>
                <Text style={styles.showPassword}>Show password</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={submit}>
          <Text style={styles.btnTitle}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.link}>Don't have an account?
                <Text style={styles.btnRegister} onPress={()=>navigation.navigate('RegisterScreen')}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
      </KeyboardAvoidingView>
        </ImageBackground>
</View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems:'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    marginBottom: 16,
    marginHorizontal: 24,
    width: 343,
    height: 50,
    paddingLeft: 16,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width:375,
    height: 489,
  },
  titleForm: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    marginTop: 33,
    marginBottom:33,
  },
  btn: {
    height: 51,
    borderRadius: 100,
    marginTop: 27,
    marginBottom:16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    backgroundColor: '#FF6C00',
    width:343,
  },
  btnTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight:19,
    fontFamily:'Roboto-Regular',
  },
  link: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color:'#1B4371',
  },
  showPassword: {
    position: 'absolute',
    right: 50,
    bottom: 32,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color:'#1B4371',
  },
  btnRegister: {
    // fontFamily: 'Roboto-Regular',
    // fontSize: 16,
    // lineHeight: 19,
    // color:'#1B4371',
  },
});
