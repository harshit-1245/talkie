// MyTabs.js
import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import SearchModal from "../modals/SearchModals";

import UpdateScreen from "../screens/UpdateScreen";
import CallScreen from "../screens/CallScreen";
import ChatScreen from "../screens/ChatScreen";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>talkie</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="camera-outline" size={24} color="black" style={styles.icon} />
            <View style={styles.iconSeparator} />
            <AntDesign name="search1" size={24} color="black" style={styles.icon} onPress={openModal} />
            <SearchModal visible={modalVisible} closeModal={closeModal} />
            <View style={styles.iconSeparator} />
            <Entypo name="dots-three-vertical" size={24} color="black" style={styles.icon} />
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.content}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#075e54',
            tabBarInactiveTintColor: '#929292',
            tabBarStyle: {
              backgroundColor: '#f2f2f2',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#075e54',
            },
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'none',
              margin: 0,
            },
            tabBarTabStyle: {
              paddingBottom: 4,
            },
          })}
        >
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Status" component={UpdateScreen} />
          <Tab.Screen name="Calls" component={CallScreen} />
        </Tab.Navigator>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C3A9FF',
    paddingTop: 30,
  },
  headerContainer: {
    backgroundColor: '#C3A9FF',
  },
  header: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  iconSeparator: {
    width: 10,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MyTabs;
