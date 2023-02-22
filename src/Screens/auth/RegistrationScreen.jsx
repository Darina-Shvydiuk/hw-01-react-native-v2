import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,Dimensions,Image,Button } from 'react-native';
import { React, useState,useEffect } from 'react';
import { authSignUpUser } from '../../redux/auth/authOperations';
import { useDispatch } from "react-redux";

const initialState = {
  login:'',
  email: '',
  password:'',
}


export default RegistrationScreen = ({ navigation }) => {
  const bgImage = require('../../../assets/images/photo-bg.png');
  const imagePhoto = require('../../../assets/images/rectangle22.png');
  const icon = require('../../../assets/images/add.png')
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [credentials, setCredentials] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      console.log('width', width);
      setDimensions(width)
    }
    const listener = Dimensions.addEventListener('change', onChange);
    return () => {
      listener.remove();
    }
  }, [])
  
  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    
  }
  const handleSubmit = () => {
    dispatch(authSignUpUser(credentials));
    setCredentials(initialState);
  }


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.image}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={{ ...styles.form, marginBottom: isShowKeyBoard ? -190 : 0, width:dimensions }}>
              <Image source={imagePhoto} style={ styles.imagePhoto} />
              <Image source={icon} style={styles.icon} />
              <Text style={styles.titleForm}>
                Registration
              </Text>
              <TextInput style={styles.input} textAlign={'start'} onFocus={() => { setIsShowKeyBoard(true) }} onChangeText={(value) => setCredentials(prevState => ({ ...prevState, login: value }))} value={credentials.login} placeholder={ 'Login'} />
              <TextInput style={styles.input} textAlign={'start'} onFocus={() => { setIsShowKeyBoard(true) }} onChangeText={(value) => setCredentials(prevState => ({ ...prevState, email: value }))} value={credentials.email} placeholder={ 'Email'}/>
              <TextInput style={styles.input} textAlign={'start'} onFocus={() => { setIsShowKeyBoard(true) }} onChangeText={(value) => setCredentials(prevState => ({ ...prevState, password: value }))} value={credentials.password} placeholder={'Password'} />
              <TouchableOpacity>
                <Text style={styles.showPassword}>Show password</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTitle}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style={styles.link}>Already have an account? 
                  <Text style={styles.btnLogIn} onPress={() => navigation.navigate('LoginScreen')}>Log In</Text>
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
  },
  imagePhoto: {
    position: 'absolute',
    bottom: 493,
    left:135,
  },
  icon: {
    position: 'absolute',
    right: 123,
    top:20,
    width: 25,
    height:25,
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
    paddingLeft:16,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width:375,
    height: 549,
  },
  titleForm: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    marginTop: 75,
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
    color: '#1B4371',
    letterSpacing:0.5,
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
  btnLogIn: {
  },
});
