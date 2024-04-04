import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import UserChat from '../components/UserChat';

const ChatScreen = () => {
  return (
    <FlatList
      data={[{ key: '1' }]} // Dummy data, since FlatList requires data prop
      renderItem={() => (
        <Pressable onPress={() => {}}>
          <UserChat />
        </Pressable>
      )}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
