import { Animated, Easing, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import { useNavigation } from "@react-navigation/native";
import useSWR from "swr"

const MobileScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedArea,setSelectedArea]=useState(null)

    const [animatedValue] = useState(new Animated.Value(0));
   


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const animateButton = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        animateButton();
        // Simulate loading
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        console.log(data.phoneNumber); // Log the phone number
    };

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20],
    });

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source={require("../assets/login.png")} 
                style={styles.profileImage}
            />

            <View style={{ marginBottom: 12 }}>
                <Text style={styles.labelText}>Phone Number</Text>
                <View style={styles.phoneInputContainer}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="+91"
                                placeholderTextColor={'black'}
                                keyboardType="numeric"
                                style={[styles.inputField, styles.countryCodeInput]}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                        name="countryCode"
                        defaultValue=""
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Enter your phone number"
                                placeholderTextColor={'black'}
                                keyboardType="numeric"
                                style={[styles.inputField, styles.phoneNumberInput]}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                        name="phoneNumber"
                        defaultValue=""
                    />
                </View>
                <Pressable onPress={() => navigation.navigate("Login")}> 
                    <Text style={styles.loginWithEmailText}>Login with email</Text>
                </Pressable>
            </View>

            <Animated.View style={[styles.sendOtpButton, styles.submitButton, { transform: [{ translateY }] }]}>
                <Pressable onPress={handleSubmit(onSubmit)}>
                    {isLoading ? (
                        <Image source={require("../assets/loading.gif")} style={styles.loadingImage} />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                </Pressable>
            </Animated.View>
        </SafeAreaView>
    )
}

export default MobileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#128C7E',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    profileImage: {
        width: 250,
        height: 250,
        marginBottom: 20,
        borderRadius: 125, // Half of the width and height to make it round
    },
    labelText: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
        color: 'white',
    },
    inputField: {
        height: 48,
        borderRadius: 8,
        paddingLeft: 22,
        marginBottom: 0,
        backgroundColor: 'white',
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    countryCodeInput: {
        width: '20%',
        marginRight: 5,
    },
    phoneNumberInput: {
        flex: 1,
    },
    loginWithEmailText: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'flex-end',
        marginBottom: 10,
        paddingRight: 20,
        textDecorationLine: 'underline',
    },
    sendOtpButton: {
        marginTop: 18,
        marginBottom: 4,
        backgroundColor: '#ff9f43',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    submitButton: {
        marginTop: 18,
        marginBottom: 4,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    loadingImage: {
        width: 20,
        height: 20,
    },
});
