import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const UserChat = () => {
  const navigation=useNavigation()
  return (
    <Pressable
    onPress={()=>navigation.navigate("Chatting")}
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
    <Image style={{ width: 50, height: 50, borderRadius: 25, resizeMode: 'cover' }} source={require("../assets/profile.jpg")} />
    <View>
        <Text style={{ fontWeight: 'bold' }}>harryOsbon</Text>
        <Text style={{ marginTop: 5, color: 'gray', fontWeight: '500' }}>Hii There!</Text>
      </View>
      
  </Pressable>
  )
}

export default UserChat

const styles = StyleSheet.create({})