import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import useRoute  from '../../router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { authStateChangeUser } from '../redux/auth/authOperations';


SplashScreen.preventAutoHideAsync();

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium':require('../../assets/fonts/Roboto-Medium.ttf'),
  })

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.log("SplashScreen: ", error.message);
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const routing = useRoute(stateChange);

  return (
    <NavigationContainer>
    {routing}
</NavigationContainer>
  )
}
