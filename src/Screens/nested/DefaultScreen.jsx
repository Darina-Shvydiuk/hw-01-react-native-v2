import React, {useEffect,useState} from 'react';
import { View,StyleSheet,FlatList,Image ,TouchableOpacity,Text} from 'react-native';
import {  EvilIcons,FontAwesome } from '@expo/vector-icons';


export default DefaultScreen = ({ route,navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState)=>[...prevState,route.params])
    }
   
  }, [route.params])

  
  return (
    <View style={styles.container}>
      <FlatList data={posts} keyExtractor={(item, indx) => indx.toString()} renderItem={({ item }) => (
        <View style={styles.postsContainer}>
          <Image style={styles.image} source={{ uri: item.photo }} />
          <View style={styles.infoBox}>
          <Text style={styles.title}>{item.photoName}</Text>
          <View style={styles.infoWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('CommentsScreen',{photo: item.photo})} style={styles.btnComment}>
              <FontAwesome name="comment-o" size={24} color="rgba(189, 189, 189, 1)" />
              <Text style={styles.commentsCount}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MapScreen',item)} style={styles.locationWrapper}>
            <EvilIcons name="location" size={28} color="#BDBDBD" style={styles.iconLocation} />
            <Text style={styles.location}>{item.photoLocation}</Text>
              </TouchableOpacity>
              </View>
            </View>
       </View>
      )}
      />
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal:16,
  },
  postsContainer: {
    marginTop:32,
  },
  image: {
    borderRadius: 8,
    height: 243,
    width: 365,
  },
  infoWrapper: {
    // flex:1,
    // justifyContent: 'space-around',
    // flexWrap: 'nowrap',
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  btnComment: {
    marginRight:55,
  },
  location: {
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  commentsCount: {
    alignItems: "center",
    flexDirection: "row",
    // justifyContent:'space-around',
  },
  locationWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  infoBox: {
    marginTop: 8,
    paddingHorizontal: 5,
  },
})