import { Animated, Easing, Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const navigation=useNavigation()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to track password visibility

    const [animationValue] = useState(new Animated.Value(0));

    const onSubmit = async (data) => {
        setIsLoading(true); // Set loading state to true during submission
        // Simulate a delay (replace with actual login logic)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false); // Set loading state back to false after submission
        console.log(data);
        // Handle login logic here
    };

    // Animation for the submit button
    const animateButton = () => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const translateY = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20], // Adjust the translateY value as needed
    });

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.content} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
                <Image source={require("../assets/login.png")} style={styles.image} />
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email Address</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Enter your email address"
                                placeholderTextColor={'#666666'}
                                keyboardType="email-address"
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        )}
                        name="email"
                        defaultValue=""
                        rules={{ required: 'Email address is required' }}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </View>
                <View style={styles.inputContainer}>
    <Text style={styles.label}>Password</Text>
    <View style={styles.passwordInput}>
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor={'#666666'}
                    secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on isPasswordVisible state
                    style={styles.passwordTextInput}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                />
            )}
            name="password"
            defaultValue=""
            rules={{ required: 'Password is required' }}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
            {isPasswordVisible ? <Ionicons name="eye-off-sharp" size={24} color="black" /> : <Entypo name="eye" size={24} color="black" />}
        </TouchableOpacity>
    </View>
    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
    <Pressable onPress={() => navigation.navigate("Mobile")} style={{marginLeft:150}}>
    <Text style={styles.loginWithPhoneText}>Login with Phone</Text>
</Pressable>
</View>


                
                <Animated.View style={[styles.submitButtonContainer, { transform: [{ translateY }] }]}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit(onSubmit)}
                        onPressIn={animateButton}
                    >
                        {isLoading ? 
                            <Image source={require("../assets/loading.gif")} style={styles.loadingImage}/> // Adjust the loading image size
                            : <Text style={styles.submitButtonText}>Submit</Text>}
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#128C7E",
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 225,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    label: {
        color: '#ffffff',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingLeft: 10,
    },
    passwordInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordTextInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingLeft: 10,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
    errorText: {
        color: 'red',
    },
    submitButtonContainer: {
        alignItems: 'center',
        marginBottom: 40, // Adjust spacing between input fields and submit button
    },
    submitButton: {
        backgroundColor: '#ff9f43',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    submitButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingImage: {
        width: 20, // Adjust the width of the loading image
        height: 20, // Adjust the height of the loading image
    },
    loginWithPhoneText: {
        color: '#ffffff',
        fontSize: 16,
        textDecorationLine: 'underline',
        
    },
});

export default LoginScreen;
