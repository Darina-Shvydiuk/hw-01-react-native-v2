import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from "./src/Screens/auth/LoginScreen";
import RegistrationScreen from './src/Screens/auth/RegistrationScreen';
import HomeScreen from './src/Screens/main/HomeScreen';

const AuthStack = createStackNavigator();

export default useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen options={{
          headerShown: false
        }} name='LoginScreen' component={LoginScreen} />
        <AuthStack.Screen options={{
          headerShown: false
        }} name='RegisterScreen' component={RegistrationScreen} />
      </AuthStack.Navigator>
    );
  } 
    return (
     <AuthStack.Navigator >
    <AuthStack.Screen options={{
          headerShown: false
        }} name='HomeScreen' component={HomeScreen} />
       </AuthStack.Navigator>
      )
   }

