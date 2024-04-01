document.addEventListener('DOMContentLoaded', () => {
    // Your Firebase configuration
    const firebaseConfig = {
        // Add your Firebase config here
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database service
    const database = firebase.database();

    // Reference to the chat messages
    const chatMessagesRef = database.ref('chats');

    // Reference to the chat list
    const chatList = document.querySelector('.chat-list');

    // Predefined list of chats
    const predefinedChats = [
        { id: 'chat1', name: 'Chat 1' },
        { id: 'chat2', name: 'Chat 2' },
        { id: 'chat3', name: 'Chat 3' },
        { id: 'chat4', name: 'Chat 4' },
        { id: 'chat5', name: 'Chat 5' },
        { id: 'chat6', name: 'Chat 6' },
        { id: 'chat7', name: 'Chat 7' },
        { id: 'chat8', name: 'Chat 8' },
        { id: 'chat9', name: 'Chat 9' },
        { id: 'chat10', name: 'Chat 10' },
        { id: 'chat11', name: 'Chat 11' },
        { id: 'chat12', name: 'Chat 12' },
        { id: 'chat13', name: 'Chat 13' },
        { id: 'chat14', name: 'Chat 14' },
        { id: 'chat15', name: 'Chat 15' }
        // Add more chats as needed
    ];

    // Function to load chat messages for a specific chat
    function loadChatMessages(chatId) {
        const chatMessagesRef = database.ref(`chats/${chatId}/messages`);
        chatMessagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            displayMessage(message.sender, message.text);
        });
    }

    // Load predefined chats
    predefinedChats.forEach(chat => {
        const chatListItem = document.createElement('div');
        chatListItem.textContent = chat.name;
        chatListItem.classList.add('chat-item');
        chatListItem.addEventListener('click', () => {
            // Clear previous chat messages
            chatMessages.innerHTML = '';
            // Load chat messages for the selected chat
            loadChatMessages(chat.id);
        });

        chatList.appendChild(chatListItem);
    });

    // Send message when Send button is clicked
    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            sendMessage('user', messageText);
            messageInput.value = ''; // Clear input field after sending message
        }
    });

    // Function to send message
    function sendMessage(sender, text) {
        const chatId = getCurrentChatId(); // Implement this function to get the current chat ID
        const newMessageRef = database.ref(`chats/${chatId}/messages`).push();
        newMessageRef.set({
            sender: sender,
            text: text
        });
    }

    // Function to display message
    function displayMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }
});
