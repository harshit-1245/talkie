import React, { useEffect, useState } from "react";
import { View, Modal, StyleSheet, TextInput, TouchableOpacity, Image, Text, FlatList, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios"

const SearchModal = ({ visible, closeModal }) => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://192.168.74.201:4200");
        setData(response.data); 
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const filteredData = data && data.user && Array.isArray(data.user) 
  ? data.user.filter(item =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];


  const renderItem = ({ item }) => (
    <View>
      <Pressable onPress={()=>navigation.navigate("Chatting",{
         recepientUsername:item.username,
         recepientProfile:item.profile
      })} style={styles.userProfile}>
        <Image source={{ uri: item.profile }} style={styles.profileImage} />
        <Text style={styles.profileText}>{item.username}</Text>
      </Pressable>
      <View style={{ height: 1, backgroundColor: "gray", marginHorizontal: 10, width: "100%" }} />
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPressOut={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Search</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
              autoFocus={true}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    padding: 5,
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  userProfile: {
    marginTop:20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileText: {
    fontSize: 16,
  },
});

export default SearchModal;
