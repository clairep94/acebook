const API_Endpoint = '/chats'; //full endpoint is localhost:8080/chats

// Load all the conversations where SessionUser is a member (ChatsController.UserInbox)
// Returns a list of chat documents with members.populated-select
const fetchChats = async (token, sessionUserID) => { 
    try {
        const response = await fetch(`${API_Endpoint}/${sessionUserID}`, {
            headers: {
                'Authorization': `Bearer ${token}` 
                }
        })

        const chatsData = await response.json();
        return chatsData;

    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
};


// Create a chat with a new user:
// Return the createChat's data so it can be added into the chatsList
const createChat = async (token, createChatPayload) => { 
    try {
        const response = await fetch (`${API_Endpoint}/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(createChatPayload),
        });

        const newChatData = await response.json();
        return newChatData;

    } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
    }
}


// Load the particular Chat between SessionUser and another member:
// Return a single chat document with author select-populated
const findChat = async (token, sessionUserID, conversationPartnerID) => { // NOT YET USED
    try {
        const response = await fetch(`${API_Endpoint}/find/${sessionUserID}/${conversationPartnerID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                },
        })

        const chatData = await response.json();
        return chatData;
        
    } catch (error) {
        console.error('Error fetching chat:', error);
        throw error;
    }
}

export { fetchChats, findChat, createChat };