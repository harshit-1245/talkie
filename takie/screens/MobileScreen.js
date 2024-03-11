import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MobileScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedArea, setSelectedArea] = useState(null);
    const [areas, setAreas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        fetch('https://restcountries.com/v2/all')
            .then((response) => response.json())
            .then((data) => {
                let areaData = data.map((item) => {
                    return {
                        code: item.alpha2Code,
                        item: item.name,
                        callingCode: `+${item.callingCodes[0]}`,
                        flag: `https://restcountries.com/data/${item.alpha2Code.toLowerCase()}.svg`,
                    };
                });

                setAreas(areaData);
                if (areaData.length > 0) {
                    let defaultData = areaData.filter((a) => a.code === 'US');

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0]);
                    }
                }
            });
    }, []);

    const { control, handleSubmit } = useForm();

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

    const renderAreasCodesModal = () => {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}
                    onPress={() => {
                        setSelectedArea(item);
                        setModalVisible(false);
                    }}>
                    <Image source={{ uri: item.flag }} style={{ width: 30, height: 20, marginRight: 10 }} />
                    <Text style={{ color: 'white', fontSize: 16 }}>{`${item.item} (${item.callingCode})`}</Text>
                </TouchableOpacity>
            );
        };

        return (
            <Modal animationType='slide' transparent={true} visible={modalVisible}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 400, width: width * 0.8, backgroundColor: '#342342', borderRadius: 12 }}>
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                style={{ padding: 20 }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/login.png')} style={styles.profileImage} />
            <View style={{ marginBottom: 12 }}>
                <Text style={styles.labelText}>Phone Number</Text>
                <View style={styles.phoneInputContainer}>
                    <Pressable style={{ marginRight: 10,paddingBottom:20 }} onPress={() => setModalVisible(true)}>
                        <Image source={{ uri: selectedArea?.flag }} style={{ width: 30, height: 20, marginRight: 5 }} />
                        <Text style={[styles.countryCodeText, { backgroundColor: 'white' }]}>{selectedArea?.callingCode}</Text>
                    </Pressable>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Enter your phone number"
                                placeholderTextColor="black"
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
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginWithEmailText}>Login with email</Text>
                </Pressable>
            </View>
            <Animated.View style={[styles.sendOtpButton, styles.submitButton, { transform: [{ translateY }] }]}>
                <Pressable onPress={handleSubmit(onSubmit)}>
                    {isLoading ? (
                        <Image source={require('../assets/loading.gif')} style={styles.loadingImage} />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                </Pressable>
            </Animated.View>
            {renderAreasCodesModal()}
        </SafeAreaView>
    );
};

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
        borderRadius: 125,
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
    countryCodeText: {
        color: 'black',
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40, // Align text vertically in the middle
        borderRadius: 8,
    }
});

export default MobileScreen;
