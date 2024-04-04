import React, { useState, useLayoutEffect, useEffect, memo } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather, FontAwesome5, Entypo, AntDesign,Zocial } from '@expo/vector-icons';
import { useNavigation,useRoute } from "@react-navigation/native";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import useChatStore from '../src/chatCart';
import socketServices from '../socketService/socket.io';




const ChatWithUser = () => {
  const route=useRoute()
  const navigation = useNavigation();
  const recepientUsername=route.params.recepientUsername;
  const recepientProfile=route.params.recepientProfile
  const { message, setMessage, showEmoji, setShowEmoji, selectedImage, setSelectedImage, chatMessage, setChatMessage } = useChatStore();
  // const [socket,setSocket]=useState(null);
  const userId = "65ff06101f5580ae6bfb1921";
  const recepientId = "65ff05c31f5580ae6bfb191d";

  useEffect(()=>{
    socketServices.initializeSocket()
  },[])


  

 


  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  }

const handleSend = async () => {
  try {
    console.log("Sending message:", message);
    // Emit a "send message" event to the backend with the message content
    socketServices.emit("send message", { senderId: userId, recepientId, messageText: message });
    // Clear the message input
    setMessage("");
  } catch (error) {
    console.error("Error while sending message:", error);
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
              source={{uri:recepientProfile}}
            />
            <Text style={styles.username}>{recepientUsername}</Text>
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
        <TouchableOpacity  style={styles.iconButton}>
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

export default memo(ChatWithUser);

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
