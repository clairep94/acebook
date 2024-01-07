const API_Endpoint = '/messages'; //full endpoint is localhost:8080/messages

// Get all messages in a chat (chatlog)
const fetchMessages = async (token, chat) => {
    try {
        const response = await fetch(`${API_Endpoint}/${chat._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const messagesData = await response.json();
        return messagesData; 

    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    };
};


// Send a new message
const sendMessage = async (token, sendMessagePayload) => {
    try {
        const response = await fetch(`${API_Endpoint}/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(sendMessagePayload),
        });
        const sentMessageData = await response.json();
        return sentMessageData; //return the data of the new message so it can be added to the chatlog

    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}



export { fetchMessages, sendMessage };