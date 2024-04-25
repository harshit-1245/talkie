import { View, FlatList, Image, Pressable, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const UserChat = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  
  const recepientIds = ["65ff05c31f5580ae6bfb191d"]; 

  useEffect(() => {
    const getUsers = async () => {
      try {
        const promises = recepientIds.map(async (recepientId) => {
          const response = await axios.get(`http://192.168.6.201:4200/getRecepient/${recepientId}`);
          return response.data; // Return the whole array instead of just the first element
        });
        const usersData = await Promise.all(promises);
        setUsers(usersData.flat()); // Flatten the array of arrays into a single array of users
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);


  const renderUserItem = useMemo(() => {
    return ({ item }) => (
      <Pressable
        onPress={() => navigation.navigate("Chatting",{
          recepientUsername:item.username,
          recepientProfile:item.profile
        })}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          borderWidth: 0.7,
          borderColor: '#D0D0D0',
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          padding: 10,
        }}
      >
        <Image style={{ width: 50, height: 50, borderRadius: 25, resizeMode: 'cover' }} source={{ uri: item?.profile }} />
        <View>
          <Text style={{ fontWeight: 'bold' }}>{item?.username}</Text>
          <Text style={{ marginTop: 5, color: 'gray', fontWeight: '500' }}>Hii There!</Text>
        </View>
      </Pressable>
    );
  }, [navigation]);

  return (
    
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item?._id}
      />
    
  );
}

export default UserChat;
