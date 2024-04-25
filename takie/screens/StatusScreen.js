import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const StatusScreen = () => {
  const [statusData, setStatusData] = useState([]);

  const userId = "65ff05c31f5580ae6bfb191d";

  const getStatus = async () => {
    try {
      const response = await axios.get(`http://192.168.6.201:4200/status/${userId}`);
      setStatusData(response.data);
    } catch (error) {
      console.error("Error fetching status data:", error);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.statusItem}>
      <Text style={styles.statusText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={statusData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Use index as key if id is not available
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  statusItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  statusText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default StatusScreen;
