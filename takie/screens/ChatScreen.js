import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserChat from '../components/UserChat'

const ChatScreen = () => {
  return (
   <ScrollView>
    <Pressable>
      <UserChat/>
    </Pressable>
   </ScrollView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})