import 'react-native-gesture-handler';
import React, { useCallback,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useRoute  from './router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium':require('./assets/fonts/Roboto-Medium.ttf'),
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


  const routing = useRoute();

  return (
   <Provider store={store}>
       <NavigationContainer>
      {routing}
  </NavigationContainer>
   </Provider>
  
  );
}

