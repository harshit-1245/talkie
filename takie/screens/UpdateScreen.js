import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Entypo,FontAwesome6 } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from '@react-navigation/native';


const data = [
  { id: '1', username: 'user1', statusImage: require("../assets/profile.jpg") },
  // { id: '2', username: 'user2', statusImage: require("../assets/profile.jpg") },
  // { id: '3', username: 'user3', statusImage: require("../assets/profile.jpg") },
  
];

const handleSetStatus=async()=>{
  
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        
        console.log(result.uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };


  const UpdateScreen = () => {
    const navigation=useNavigation()
    const renderItem = ({ item }) => (
      <View style={styles.mainStatus}>
        <View style={styles.loadingBar}>
          <Image source={item.statusImage} style={styles.status} />
        </View>
        <View>
          <Text style={styles.user}>{item.username}</Text>
          <Text style={styles.timestamps}>Timestamps</Text>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Pressable style={styles.statusContainer} onPress={handleSetStatus}>
          <View style={styles.profileImageContainer}>
            <Image source={require("../assets/profile.jpg")} style={styles.profileImage} />
            <TouchableOpacity style={styles.addStatusButton}>
              <Entypo name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.addStatusText}>Tap to add status update</Text>
          </View>
        </Pressable>
        <View style={styles.line} />
        <View style={styles.footerContainer}>
          <Text style={styles.viewed}>View Status</Text>
          <Pressable style={styles.three}>
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </Pressable>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {/* Pencil Box */}
        <Pressable style={styles.pencilBox} onPress={()=>navigation.navigate("Status")}>
          <FontAwesome6 name="pencil" size={24} color="black" style={styles.pencilIcon} />
        </Pressable>
      </View>
    );
  }
  
  export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addStatusButton: {
    position: 'absolute',
    backgroundColor: '#ededed',
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    bottom: 0,
  },
  textContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    marginLeft: 10,
    paddingBottom: 10,
  },
  addStatusText: {
    fontSize: 16,
    color: 'black',
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginHorizontal: 20, // Adjust horizontal margin as needed
    marginTop: 10, // Adjust top margin as needed
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20
  },
  viewed: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  loadingBar: {
    width: 52, // Increase width to accommodate the border
    height: 52, // Increase height to accommodate the border
    borderRadius: 30, // Half of the increased width and height
    borderWidth: 30, // Add border
    borderColor: 'green', // Border color
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    marginRight: 10,
  },
  status: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  user: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:15
  },
  timestamps: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5, // Add margin to separate from the username
  },
  pencilBox: {
    position: 'absolute',
    right: 20,
    bottom: 60,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
  },
  pencilIcon: {
    alignSelf: 'center', // Center the icon inside the box
  },
});
