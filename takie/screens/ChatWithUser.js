import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Feather, FontAwesome5, Zocial, Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const ChatWithUser = () => {
  const navigation = useNavigation();

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
      headerRight: () => ( // Return JSX elements
        <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 8 }}>
          <FontAwesome5 name="video" size={20} color="black" style={{paddingRight:12}} />
          <Zocial name="call" size={24} color="black" style={{paddingLeft:12,paddingRight:12}} />
          <Entypo name="dots-three-vertical" size={24} color="black" style={{paddingLeft:12}} />
        </View>
      )
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>ChatWithUser</Text>
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
    fontSize:18,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
