import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, Text, ToastAndroid } from 'react-native';
import axios from 'axios';

const StatusModal = ({ visible, onClose }) => {
    const [statusText, setStatusText] = useState('');
    const userId = "65ff05c31f5580ae6bfb191d";

    const handleSave = async () => {
        try {
            // Post method for sending status to the backend
            const response = await axios.post(`http://192.168.6.201:4200/status`, {
                userId: userId,
                text: statusText // Use statusText instead of text
            });
            if (response.status === 200) {
                ToastAndroid.showWithGravity(
                    'Status saved successfully',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                onClose();
                setStatusText("");
            }
        } catch (error) {
            console.error('Error saving status:', error);
            ToastAndroid.showWithGravity(
                'Failed to save status',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your status here..."
                        value={statusText}
                        onChangeText={setStatusText}
                        multiline={true}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        minHeight: 100,
    },
    saveButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default StatusModal;
