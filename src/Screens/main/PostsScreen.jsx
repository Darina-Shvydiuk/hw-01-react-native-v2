import React from 'react';
import {TouchableOpacity,View,StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultScreen from '../nested/DefaultScreen';
import CommentsScreen from '../nested/CommentsScreen';
import MapScreen from '../nested/MapScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { authSignOutUser } from '../../redux/auth/authOperations';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const NestedScreen = createStackNavigator();

export default PostsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authSignOutUser())
  }
  return (
    <NestedScreen.Navigator screenOptions={{
        tabBarShowLabel: false, tabBarStyle: { height: 83, paddingLeft: 80, paddingRight: 80, },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          color: "#212121",
        },
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.3)",
        },
        // tabBarStyle: ((route) => {
        //   const routeName = getFocusedRouteNameFromRoute(route) ?? "";
        //   if (routeName === "CommentsScreen" || routeName === "MapScreen") {
        //     return {display: "none"};
        //   }
        //   return {
        //     height: 85,
        //     paddingLeft: 80,
        //     paddingRight: 80,
        //     borderTopWidth: 1,
        //     borderColor: "rgba(0, 0, 0, 0.1)",
        //   };
        // })(route),
    }}
      initialRouteName='DefaultScreen'>
      <NestedScreen.Screen options={{
            headerTitle: "Posts",
            headerLeft: () => "",
            headerRight: () => (
              <TouchableOpacity
              activeOpacity={0.5}
              onPress={logOut}
            >
              <View style={styles.logOut}>
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
            )
          }} name='DefaultScreen' component={DefaultScreen } />
      <NestedScreen.Screen options={{
       
          tabBarStyle: {
            display: "none",
        },
        
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