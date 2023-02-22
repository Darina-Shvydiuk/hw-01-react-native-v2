import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useDispatch,useSelector } from "react-redux";
import { authSignOutUser } from '../../redux/auth/authOperations';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../../firebase/config";
import { EvilIcons, FontAwesome,MaterialIcons } from '@expo/vector-icons';

export default ProfileScreen = ({navigation}) => {
  const bgImage = require('../../../assets/images/photo-bg.png');
  const defaultAvatar=require('../../../assets/images/defaultAvatar.png');
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSignOutUser());
  };
  
  const getUserPosts = async () => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      setUserPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.error("Get user posts error: ", error.message);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.bgImage}>
        {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}> */}
          {/* <View style={{ ...styles.form, marginBottom: isShowKeyBoard ? -240 : 0, width:dimensions }}> */}
          <View style={styles.postsContainer}>
          <View style={styles.avatarWrapper}>
            <ImageBackground
              source={defaultAvatar}
              style={styles.avatar}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={logOut}
            style={styles.logOut}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>{login}</Text>
          </View>
          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.postWrapper}>
                <Image style={styles.image} source={{ uri: item.photo }} />
                <View style={styles.infoBox}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.infoWrapper}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate("CommentsScreen", {
                          postId: item.id,
                          photo: item.photo,
                        })
                      }
                      style={styles.commentsWrapper}
                    >
                      <FontAwesome name="comment-o" size={24} color="rgba(189, 189, 189, 1)" />
                      <Text style={styles.commentsCount}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate("MapScreen", item)}
                      style={styles.locationWrapper}
                    >
                       <EvilIcons name="location" size={28} color="#BDBDBD" />
                      <Text style={styles.location}>{item.location}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          
            )}
          />
        </View>
          {/* </View> */}
    {/* </KeyboardAvoidingView> */}
      </ImageBackground>
</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent:'flex-end',
  },
  postsContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontFamily: "Roboto-Regular",
    width:'100%',
    height: "80%",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  avatarWrapper: {
    alignSelf: "center",
    transform: [{ translateY: -60 }],
    position: "absolute",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatar: {
    height: 120,
    width: 120,
    resizeMode: "cover",
  },
  logOut: {
    position: "absolute",
    right: 0,
    top: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  nameWrapper: {
    marginTop: 50,
    marginBottom: 30,
  },
  name: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  postWrapper: {
    paddingBottom: 32,
  },
  image: {
    borderRadius: 8,
    height: 243,
    width: "100%",
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
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  locationWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },

  location: {
    textDecorationLine: "underline",
  },
  commentsWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  commentsCount: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
    letterSpacing: 0.7,
    marginLeft: 9,
  },
  

});