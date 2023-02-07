// import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { React, useState } from 'react';

const initialState = {
  email: '',
  password:'',
}


export default function App() {
  const image = { uri: 'https://reactjs.org/logo-og.png' };
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [state, setState] = useState(initialState)
  
  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    // console.log(state);
    setState(initialState);
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <View style={{ ...styles.form, marginBottom: isShowKeyBoard ? 20 : 100 }}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Hello again</Text>
              <Text style={styles.headerTitle}>Welcome back</Text>
            </View>
          <View>
            <Text style={styles.inputTitle}>
              EMAIL ADDRES
            </Text>
                <TextInput style={styles.input} textAlign={'center'} onFocus={() => { setIsShowKeyBoard(true) }} onChangeText={(value) => setState(prevState => ({...prevState, email: value}))} value={state.email} />
          </View>
          <View style={{ marginTop: 20}}>
            <Text style={styles.inputTitle}>
              PASSWORD
            </Text>
                <TextInput style={styles.input} textAlign={'center'} secureTextEntry={true} onFocus={() => { setIsShowKeyBoard(true) }} onChangeText={(value) => setState(prevState => ({ ...prevState, password: value }))} value={state.password} />
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={keyboardHide}>
            <Text style={styles.btnTitle}>SIGN IN</Text>
        </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    color: 'green',
  },
  innerBox: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 30,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    height: 40,
    borderRadius: 10,
    color: '#fff',
  },
  form: {
    marginHorizontal: 30,
    padding: 24,
    // marginBottom:100,
  },
  inputTitle: {
    color: '#fff',
    marginBottom: 10,
    fontSize:18,
  },
  btn: {
    height: 40,
    borderRadius: 10,
    borderWidth:1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        borderColor:'#fff',
      },
      android: {
        backgroundColor: '#1e90ff',
        borderColor:'transparent',
      }
    })
  },
  btnTitle: {
    color: Platform.OS==='ios'?'#1e90ff':'#fff',
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    marginBottom:150,
  },
  headerTitle: {
    fontSize: 30,
    color:'#fff',
  }
});
