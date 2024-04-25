import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, FontAwesome5, Zocial, Entypo } from '@expo/vector-icons';
import EmojiSelector from "react-native-emoji-selector";
import socketServices from '../socketService/socket.io';
import axios from "axios";

const ChatWithUser = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const recepientProfile = route.params.recepientProfile;
  const recepientUsername = route.params.recepientUsername;
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [chatMessage, setChatMessage] = useState([]);
  const recepientId = "65ff06101f5580ae6bfb1921";
  const userId = "65ff05c31f5580ae6bfb191d";

  useEffect(() => {
    socketServices.initializeSocket();
    getChat();
  }, []);

  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  }

  const handleSend = async () => {
    try {
     const handleData={
      senderId:userId,
      recepientId:recepientId,
      messageText:message
     }
     const response=await axios.post("http://192.168.6.201:4200/sendMessage",handleData)
     if(response.status === 200){
      setMessage("");
      getChat()
     }
      
    } catch (error) {
      console.error("Error while sending message:", error.response);
    }
  };

  const getChat = async () => {
    try {
      const response = await axios.get(`http://192.168.6.201:4200/message/${userId}/${recepientId}`);
      setChatMessage(response.data.map((message, index) => ({ ...message, _id: index.toString() })));
    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <Feather onPress={() => navigation.goBack()} name="arrow-left" size={24} color="black" />
          <View style={styles.userContainer}>
            <Image style={styles.userImage} source={{ uri: recepientProfile }} />
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

  const renderMessageItem = ({ item }) => (
    <View style={[styles.messageContainer, item.senderId === userId ? styles.currentUserMessage : styles.recepientMessage]}>
      <Text style={item.senderId === userId ? styles.currentUserText : styles.recepientText}>{item.messageText}</Text>
    </View>
  );

  return (
    <ImageBackground source={require("../assets/takieChat.jpg")} style={styles.container}>
      <FlatList
        data={chatMessage}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.bottomBar}>
        {showEmoji ? (
          <Feather onPress={() => setShowEmoji(false)} name="close" size={24} color="black" />
        ) : (
          <Feather onPress={handleEmoji} style={{ marginRight: 10 }} name="smile" size={24} color="black" />
        )}

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Type your message"
            onChangeText={(text) => setMessage(text)}
            value={message}
          />
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>

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
    </ImageBackground>
  );
};

export default ChatWithUser;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  chatContainer: {
    paddingTop: 10, // Add padding to the top to give space for the input bar
    paddingHorizontal: 10,
    paddingBottom: 60, // Adjusted paddingBottom to accommodate bottomBar
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
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6', // Green background for current user's messages
  },
  recepientMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF', // White background for recipient's messages
  },
  currentUserText: {
    color: '#000000', // Black text color for current user's messages
  },
  recepientText: {
    color: '#000000', // Black text color for recipient's messages
  },
  bottomBar: {
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
