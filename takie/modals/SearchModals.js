import React from "react";
import { View, Modal, StyleSheet, TextInput, TouchableOpacity, Image, Text, FlatList, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const SearchModal = ({ visible, closeModal }) => {
  const navigation=useNavigation()
  const data = [
    { id: "1", name: "User 1", image: require("../assets/profile.jpg") },
    { id: "2", name: "User 1", image: require("../assets/profile.jpg") },
    
    // Add more user data as needed
  ];

  const renderItem = ({ item }) => (
    <View>
      <Pressable onPress={()=>navigation.navigate("Chatting")} style={styles.userProfile}>
        <Image source={item.image} style={styles.profileImage} />
        <Text style={styles.profileText}>{item.name}</Text>
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
            />
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
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
