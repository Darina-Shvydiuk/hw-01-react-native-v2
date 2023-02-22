import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { View,  StyleSheet,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard,FlatList,Image,Text } from 'react-native';
import {AntDesign } from '@expo/vector-icons';
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default CommentsScreen = ({ navigation, route }) => {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const { postId, photo } = route.params;
  const { login } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const createComment = async () => {
    
    const commentDate = () => {
      const date = new Date();
    
      let hours = date.getHours();
      let min = date.getMinutes();
    
      if (hours.length === 1) {
        hours = "0" + hours;
      }
    
      if (min.length === 1) {
        min = "0" + min;
      }
    
      return `${date.toDateString()} | ${hours}:${min}`;
    };
    
    try {
      const uniqName = Date.now().toString();
      await setDoc(doc(db, "posts", postId, "comments", uniqName), {
        login,
        comment,
        createdAt: commentDate(),
      });
      keyboardHide();
      setComment("");
    } catch (error) {
      console.error("Create comment error: ", error.message);
    }
  }

  const getAllComments = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "posts", postId, "comments")
      );

      if (querySnapshot) {
        setAllComments(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    } catch (error) {
      console.error("Get comments error: ", error.message);
    }
  };

  useEffect(() => {
    getAllComments();
   
  }, [])

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
      <View style={styles.imageContainer}>
          <Image style={styles.image} source={ {uri:photo}} />
        </View>
      <FlatList data={allComments} keyExtractor={(item) => item.id} renderItem={({ item,index }) => (
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
         
        <TouchableOpacity disabled={!comment} onPress={createComment} style={styles.sendComment} activeOpacity={0.8}>
        <TextInput style={styles.inputTextComment} placeholder={'Comment...'} value={comment} onChangeText={(value)=>{setComment(value)}}/>
          <View style={styles.iconArrow} >
          <AntDesign name="arrowup" size={18} color='#fff' style={ {paddingVertical:7,paddingHorizontal:8}} />
    </View>
        </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
    
  },
  imageContainer: {
    marginBottom:32,
  },
  image: {
    borderRadius: 8,
    height: 243,
    width: '100%',
  },
  commentWrapper: {
    width: 299,
    borderRadius: 10,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginBottom: 24,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,

    color: "#212121",
  },
  commentLogin: {
    fontFamily: "Roboto-Medium",
    fontSize: 10,
    lineHeight: 18,
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
  sendComment: {
    marginTop: 32,
    marginBottom:10,
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
  iconArrow: {
    backgroundColor: '#FF6C00',
    width: 34,
    height: 34,
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom:8,
  },
  
})