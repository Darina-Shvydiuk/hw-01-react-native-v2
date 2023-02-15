import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import { Ionicons,Feather,MaterialIcons } from '@expo/vector-icons';

const MainTab = createBottomTabNavigator();

export default HomeScreen = () => {
  return (

    <MainTab.Navigator screenOptions={{
      tabBarShowLabel: false, tabBarStyle: { height: 83, paddingLeft: 80, paddingRight: 80, }
      }}>
      <MainTab.Screen options={{
         headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <View
              style={{
                ...styles.iconWrapper,
                backgroundColor: focused ? "#FF6C00" : "#ffffff",
              }}
            >
              <Ionicons
                name="grid-outline"
                size={24}
                color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
              />
            </View>
          );
        },
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
      }}
        name='PostsScreen' component={PostsScreen} />
      <MainTab.Screen options={{
          tabBarIcon:({ focused, color, size })=>{return (
            <View
              style={{
                ...styles.iconWrapper,
                backgroundColor: focused ? "#FF6C00" : "#ffffff",
              
              }}
            >
             <Ionicons name="add" size={24}  color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}/>
          </View>
          
          );}
        }}  name='CreatePostsScreen' component={CreatePostsScreen} />
        <MainTab.Screen  options={{
         headerShown: false,
        tabBarIcon:({ focused, color, size })=>{return (
          <View
            style={{
              ...styles.iconWrapper,
              backgroundColor: focused ? "#FF6C00" : "#ffffff",
            
            }}
          >
           <Feather name="user" size={24} color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"} />
        </View>
        
        );}
        }}name='ProfileScreen' component={ProfileScreen}/>
      </MainTab.Navigator>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  iconWrapper: {
    boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(13.5914px)',
    borderRadius: 20,
    paddingTop: 11,
    paddingBottom:11,
    paddingLeft: 22,
    paddingRight:22,   
  },
  logOut: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  }
})