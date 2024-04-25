import axios from "axios";

export const sendStatus = async (userId, text) => {
    try {
        const response = await axios.post(`http://192.168.6.201:4200/status/`, {
            userId: userId,
            text: text,
        });
        return response.data; // Assuming you want to return the response data
    } catch (error) {
        console.error("Error sending status:", error);
        throw error; // Re-throw the error to be handled by the caller if needed
    }
};
