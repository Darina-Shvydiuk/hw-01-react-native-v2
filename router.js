import React from 'react';
import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from './Screens/auth/RegistrationScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/main/HomeScreen';

const AuthStack = createNativeStackNavigator();


export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen options={{
          headerShown: false
        }} name='LoginScreen' component={LoginScreen} />
        <AuthStack.Screen options={{
          headerShown: false
        }} name='RegisterScreen' component={RegistrationScreen} />
        <AuthStack.Screen options={{
          headerShown: false
        }} name='HomeScreen' component={HomeScreen}/>
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator >
    <AuthStack.Screen options={{
          headerShown: false
        }} name='HomeScreen' component={HomeScreen}/>
    </AuthStack.Navigator>
  )
}