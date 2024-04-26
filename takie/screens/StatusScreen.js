import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, Easing, Image } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import axios from 'axios';

const StatusScreen = () => {
    const route=useRoute()

     const profile=route.params.profile;
     const statusData=route.params.statusData;
     const author=route.params.profileUser

    


    const [loadingWidth] = useState(new Animated.Value(0)); // Initialize the loading bar width
    const navigation = useNavigation();

    const userId = "65ff05c31f5580ae6bfb191d";



    useEffect(() => {
        const animate = () => {
            Animated.timing(loadingWidth, {
                toValue: 1,
                duration: 5000, // 5 seconds
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                navigation.navigate("Status");
            });
        };

        
        animate();
    }, []);

    

    const renderItem = ({ item }) => (
        <View style={styles.statusItem}>
            <Text style={styles.statusText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.loadingBar, { width: loadingWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
            <View style={styles.profileContainer}>
                <Image source={{uri:profile}} style={styles.profileImage} />
                <Text style={styles.username}>{author}</Text>
            </View>
            <FlatList
                data={statusData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4CAF50', // Green background color
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
    },
    statusText: {
        fontSize: 18,
        textAlign: 'center',
    },
    loadingBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '0.5%',
        backgroundColor: '#FFFFFF', // White loading bar color
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10, // Adjust top padding as needed
        marginTop:30
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25, // Half of width and height to make it circular
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default StatusScreen;
