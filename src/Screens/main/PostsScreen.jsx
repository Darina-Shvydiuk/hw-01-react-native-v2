import React from 'react';
import {TouchableOpacity,View,StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultScreen from '../nested/DefaultScreen';
import CommentsScreen from '../nested/CommentsScreen';
import MapScreen from '../nested/MapScreen';
import {MaterialIcons } from '@expo/vector-icons';

const NestedScreen = createStackNavigator();

export default PostsScreen = ({route,navigation}) => {
  return (
    <NestedScreen.Navigator  screenOptions={{
      tabBarShowLabel: false,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "Roboto-Medium",
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: 0.7,
        color: "#212121",
      },
      headerStyle: {
        borderBottomWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.3)",
      },
      
    }}
      initialRouteName='DefaultScreen'>
      <NestedScreen.Screen options={{
            headerTitle: "Posts",
            headerLeft: () => "",
            headerRight: () => (
              <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log('logOut')}
            >
              <View style={styles.logOut}>
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
            )
          }} name='DefaultScreen' component={DefaultScreen } />
      <NestedScreen.Screen options={{
        
        headerTitle: "Comments",
        
        headerLeft: () => (
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('DefaultScreen')}
        >
          <View style={styles.backBtn}>
          <MaterialIcons name="keyboard-backspace" size={24} color="#BDBDBD" />
          </View>
        </TouchableOpacity>
        )
      }} name='CommentsScreen' component={CommentsScreen } />
      <NestedScreen.Screen options={{
        
        headerTitle: "Map",
        headerLeft: () => (
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('DefaultScreen')}
        >
          <View style={styles.backBtn}>
          <MaterialIcons name="keyboard-backspace" size={24} color="#BDBDBD" />
          </View>
        </TouchableOpacity>
        )
      }} name='MapScreen' component={MapScreen}/>
    </NestedScreen.Navigator>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff',
  },
  logOut: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  
})