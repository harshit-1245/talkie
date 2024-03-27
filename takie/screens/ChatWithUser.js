import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather, FontAwesome5, Entypo, AntDesign,Zocial } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import {io} from "socket.io-client"
import useChatStore from '../src/chatCart';

const ChatWithUser = () => {
  const navigation = useNavigation();
  const { message, setMessage, showEmoji, setShowEmoji, selectedImage, setSelectedImage, chatMessage, setChatMessage } = useChatStore();
  const [socket,setSocket]=useState(null);
  const userId = "65feb55c63c642a740a09991";
  const recepientId = "65feb5bb63c642a740a09995";

  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  }

  //initialize socket io connection 

  useEffect(()=>{
   const newSocket=io("http://192.168.29.163:4200")
   setSocket(newSocket)
   return ()=>{
    newSocket.disconnect()
   }
  },[])

  // Handle receiving new messages
  useEffect(() => {
    if (!socket) return;

    socket.on("new message", (newMessage) => {
      // Handle the received message
      console.log("New message received:", newMessage);
    });

    return () => {
      socket.off("new message");
    };
  }, [socket]);


  //getting Chat
  const getChat=async()=>{
      try {
        
      } catch (error) {
        console.error(error)
      }
  }

  const handleSend=async()=>{
    try {
      const requestData={
        senderId:userId,
        recepientId:recepientId,
        messageType:messageType
      }
      if (messageType === "text") {
        requestData.messageText = message;
      } else if (messageType === "image") {
        requestData[messageType] = selectedImage;
      }
      const response = await axios.post(
        "http://192.168.29.163:4200/sendMessage",
        requestData
      );
  
      if (response.status === 200) {
        setMessage("");
        setSelectedImage("");
        setMessageType("text"); // Reset messageType after sending
        getChat();
      }
    } catch (error) {
      console.error("Error details:", error.response.data);
      console.error("Status code:", error.response.status);
    }
  }

  const uploadImage = async (mode) => {
    try {
      let result = {};
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
      if (!result.cancelled) {
        saveImage(result.uri, "image");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveImage = (image, messageType) => {
    try {
      setMessageType(messageType);
      setMessage(image);
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <Feather onPress={() => navigation.goBack()} name="arrow-left" size={24} color="black" />
          <View style={styles.userContainer}>
            <Image
              style={styles.userImage}
              source={require("../assets/profile.jpg")}
            />
            <Text style={styles.username}>harryOsbon</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 8 }}>
          <FontAwesome5 name="video" size={20} color="black" style={{ paddingRight: 12 }} />
          <Zocial name="call" size={24} color="black" style={{ paddingLeft: 12, paddingRight: 12 }} />
          <Entypo name="dots-three-vertical" size={24} color="black" style={{ paddingLeft: 12 }} />
        </View>
      )
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Chat content */}
      <Text>ChatWithUser</Text>

      {/* Search bar */}
      <View style={styles.bottomBar}>
        {showEmoji ? (
          <AntDesign onPress={() => setShowEmoji(false)} name="close" size={24} color="black" />
        ) : (
          <Entypo onPress={handleEmoji} style={{ marginRight: 10 }} name="emoji-happy" size={24} color="black" />
        )}

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Type your message"
            onChangeText={(text) => setMessage(text)}
            value={message}
          />
        </View>

        {/* Camera icon */}
        <TouchableOpacity onPress={() => uploadImage("gallery")} style={styles.iconButton}>
          <FontAwesome5 name="camera" size={24} color="black" />
        </TouchableOpacity>

        {/* Mic icon */}
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="mic" size={24} color="black" />
        </TouchableOpacity>

        {/* Send button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Emoji selector */}
      {showEmoji && (
        <View style={styles.emojiSelector}>
          <EmojiSelector
            onEmojiSelected={(emoji) => {
              setMessage((prevMessage) => prevMessage + emoji)
            }}
            style={{ height: 200 }}
          />
        </View>
      )}
    </View>
  );
};

export default ChatWithUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  username: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  searchBarContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10, // Added margin to separate TextInput from buttons
  },
  searchBar: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  emojiSelector: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
});
