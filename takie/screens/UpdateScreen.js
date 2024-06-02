import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo,FontAwesome6,AntDesign } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"
import { useNavigation,useRoute } from '@react-navigation/native';
import StatusModal from '../modals/statusModal';
import axios from "axios"





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
    const route=useRoute()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [users,setUsers]=useState([])
    const [profile,setProfile]=useState(null)
    const [username,setUsername]=useState([])
    const [statusData, setStatusData] = useState([]);
    const [author, setAuthor] = useState("");
    const [profileUser, setProfileUser] = useState(null); 
    
    const recepientIds = ["65ff05c31f5580ae6bfb191d"]; 

    useEffect(() => {
      
      getUsers();
      getProfile()
      getStatus()
    }, []);

    const getUsers = async () => {
      try {
        const promises = recepientIds.map(async (recepientId) => {
          const response = await axios.get(`http://192.168.74.201:4200/getRecepient/${recepientIds}`);
          return response.data; // Return the whole array instead of just the first element
        });
        const usersData = await Promise.all(promises);
        setUsers(usersData.flat()); // Flatten the array of arrays into a single array of users
      } catch (error) {
        console.log(error);
      }
    };

    const getProfile = async () => {
      try {
        const response = await axios.get("http://192.168.74.201:4200");
        const profileData = response.data; 
        setProfile(profileData.user[0].profile);
        setUsername(profileData.user[0].username);
      } catch (error) {
        console.log(error);
      }
    };
    const userId = "65ff05c31f5580ae6bfb191d";
    const getStatus = async () => {
      try {
          const response = await axios.get(`http://192.168.74.201:4200/status/${userId}`);
          // console.log("Response Data:", response.data);
          setStatusData(response.data);
          if (response.data.length > 0) {
              setAuthor(response.data[0].author.username);
              setProfileUser(response.data[0].author.profile)
          }
      } catch (error) {
          console.error("Error fetching status data:", error);
      }
  };

   
    



    const handlePencil = () => {
      setIsModalVisible(true)
    }

    const renderItem = ({ item }) => (
      <></>
      // <Pressable onPress={()=>navigation.navigate("StatusDekho",{
      //   profile:profileUser,
      //   author:username,
      //   statusData:statusData
      // })} style={styles.mainStatus}>
      //   <View style={styles.loadingBar}>
      //     <Image source={{ uri: item.profile }} style={styles.profileImage} />
      //   </View>
      //   <View>
      //     <Text style={styles.user}>{item.username}</Text>
      //     <Text style={styles.timestamps}>Timestamps</Text>
      //   </View>
      // </Pressable>
    );
  
    return (
      <View style={styles.container}>
      <Pressable style={styles.statusContainer} onPress={handleSetStatus}>
        <View style={styles.profileImageContainer}>
          {typeof profile === 'string' && profile.length > 0 && (
            <Image source={{ uri: profile }} style={styles.profileImage} />
          )}
          <TouchableOpacity style={styles.addStatusButton}>
            <Entypo name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.addStatusText}>Tap to add status update</Text>
        </View>
      </Pressable>
      <View style={styles.line} />
      
      <Pressable onPress={()=>navigation.navigate("StatusDekho",{
        profile:profileUser,
        author:username,
        statusData:statusData
      })} style={styles.mainStatus}>
        <View style={styles.loadingBar}>
          <Image source={{ uri: profile }} style={styles.profileImage} />
        </View>
        <View>
          <Text style={styles.user}>{username}</Text>
          <Text style={styles.timestamps}>Timestamps</Text>
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
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      {/* Pencil Box */}
      <Pressable style={styles.pencilBox} onPress={handlePencil}>
        <FontAwesome6 name="pencil" size={24} color="black" style={styles.pencilIcon} />
      </Pressable>
      <Pressable style={styles.cameraBox} onPress={handleSetStatus}>
        <AntDesign name="camerao" size={24} color="black" style={styles.pencilIcon} />
      </Pressable>
      <StatusModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
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
    bottom: 100,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
  },
  cameraBox: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
  },
  pencilIcon: {
    alignSelf: 'center', // Center the icon inside the box
  },
});
