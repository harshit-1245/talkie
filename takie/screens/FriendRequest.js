import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';

const FriendRequest = () => {
  // Sample user data
  const userData = {
    username: "JohnDoe",
    profileImage: require("../assets/profile.jpg"), // Replace with actual image path
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={userData.profileImage} />
        <Text style={styles.username}>{userData.username} </Text>
      </View>
      <Pressable style={styles.acceptButton}>
        <Text style={styles.buttonText}>Accept</Text>
      </Pressable>
    </View>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:12
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#0066b2',
    paddingVertical: 10, // Increased padding for better touch area
    paddingHorizontal: 20, // Increased padding for better touch area
    borderRadius: 20,
    marginRight:12
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
