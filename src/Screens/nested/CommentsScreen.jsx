import React,{useState,useEffect} from 'react';
import { View,  StyleSheet,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard,FlatList,Image,Text } from 'react-native';
import {AntDesign } from '@expo/vector-icons';


export default CommentsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState)=>[...prevState,route.params])
    }
   
  }, [route.params])

  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState(null);
  // const { photo } = route.params;

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
      <View style={styles.imageContainer}>
          <Image style={styles.image} source={ {uri:photo}} />
        </View>
      <FlatList data={allComments} keyExtractor={(item, indx) => indx.toString()} renderItem={({ item }) => (
        <View
        style={{
          ...styles.commentWrapper,
          marginLeft: index % 2 === 0 ? "auto" : 0,
          marginRight: index % 2 == 0 ? 0 : "auto",
        }}
      >
        <Text style={styles.commentLogin}>{item.login}</Text>
        <Text style={styles.commentText}>{item.comment}</Text>
        <Text style={styles.commentDate}>{item.createdAt}</Text>
      </View>
        )} />
          <TextInput style={styles.inputTextComment} placeholder={'Comment...'} value={comment} onChangeText={(value)=>{setComment(value)}}/>
        <TouchableOpacity onPress={() => { }} style={styles.sendComment} activeOpacity={0.8}>
      
        <View style={styles.iconArrow } >
          <AntDesign name="arrowup" size={18} color="#fff" style={ {paddingVertical:7,paddingHorizontal:8}} />
    </View>
        </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: 32,
  },
  imageContainer: {
    marginTop:32,
  },
  image: {
    borderRadius: 8,
    height: 243,
    width: 365,
  },
  sendComment: {
   marginVertical:30,
    // display: 'flex',
    // alignItems: 'flex-end',
    // justifyContent:'flex-end',
  },
  inputTextComment: {
    backgroundColor: '#F6F6F6',
    width: 365,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#E8E8E8',
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 17,
    color:'#212121',
  },
  sendComment: {
    
  },
  iconArrow: {
    backgroundColor: '#FF6C00',
    width: 34,
    height: 34,
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'relative',
    bottom:42,
  },
  commentWrapper: {
    width: "80%",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#f6f6f6",
    marginBottom: 24,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.7,
    color: "#212121",
  },
  commentLogin: {
    fontFamily: "Roboto-Medium",
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: 0.7,
    color: "#292929",
    marginBottom: 7,
    textDecorationLine: "underline",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginTop: 8,
  },
})