import React, {useEffect,useState} from 'react';
import { View,StyleSheet,FlatList,Image ,TouchableOpacity,Text} from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { db } from "../../../firebase/config";
import { collection, getDocs} from "firebase/firestore";


export default DefaultScreen = ({navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));

      if (querySnapshot) {
        setPosts(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    } catch (error) {
      console.error("Get posts error: ", error.message);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, [])

  
  return (
    <View style={styles.container}>
      <FlatList data={posts} keyExtractor={(item, indx) => indx.toString()} renderItem={({ item }) => (
        <View style={styles.postsContainer}>
          <Image style={styles.image} source={{ uri: item.photo }} />
          <View style={styles.infoBox}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.infoWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('CommentsScreen',{photo: item.photo,postId:item.id})} style={styles.btnComment}>
              <FontAwesome name="comment-o" size={24} color="rgba(189, 189, 189, 1)" />
              <Text style={styles.commentsCount}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MapScreen',item)} style={styles.locationWrapper}>
            <EvilIcons name="location" size={28} color="#BDBDBD" />
            <Text style={styles.location}>{item.location}</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop:32,
  },
  postsContainer: {
    marginBottom:32,
  },
  image: {
    borderRadius: 8,
    height: 243,
    width: '100%',
  },
  infoBox: {
    marginTop: 8,
    paddingHorizontal: 5,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },
  infoWrapper: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  btnComment: {
    alignItems: "center",
    flexDirection: "row",
  },
  commentsCount: {
    marginLeft: 9,
    color: '#BDBDBD',
    fontSize: 16,
    lineHeight: 19,
    fontFamily:'Roboto-Regular',
  },
  locationWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  location: {
    textDecorationLine: "underline",
    marginLeft: 8,
    color: '#212121',
    fontFamily:'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },

})