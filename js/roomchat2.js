window.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const chatOutput = document.getElementById("chat-output");
    const chatbox = document.getElementById("chatbox");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");

    let currentUser = "laurance";  // Hardcoded for this example
    let currentChatUser = "dr.Stevanus";  // Fix ke 'dr.Yossy'

    // Store users in localStorage for testing purposes
    if (!localStorage.getItem("users")) {
        const users = ["Laurance", "Brandon", "Steven", "Radit", "Varen"];
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Fetch all users from localStorage (this can be used later if needed)
    function getAllUsers() {
        const users = JSON.parse(localStorage.getItem("users"));
        userList.innerHTML = ""; // Clear previous user list
        users.forEach((user) => {
            const userItem = document.createElement("li");
            userItem.textContent = user;
            userItem.addEventListener("click", () => startChat(user));
            userList.appendChild(userItem);
        });
    }

    // Initialize chatroom with fixed user (dr.Yossy)
    function initChat() {
        chatbox.style.display = "block";  // Show the chatbox
        fetchMessages(currentChatUser);  // Load previous messages

        // Add automated "Hi" message from dr.Yossy (if not already sent)
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        const hiMessageExists = messages.some(
            (message) => message.sender === currentChatUser && message.message === "Hi, I'm " + currentChatUser + "!"
        );

        if (!hiMessageExists) {
            const hiMessage = {
                sender: currentChatUser,  // Sender is fixed to dr.Yossy
                receiver: currentUser,    // Receiver is the current logged-in user
                message: "Hi, I'm " + currentChatUser + "!",  // Fixed message from dr.Yossy
                timestamp: new Date().toISOString(),
            };

            // Store the "Hi" message in localStorage
            messages.push(hiMessage);
            localStorage.setItem("messages", JSON.stringify(messages));

            // Refresh the chat output to show the "Hi" message
            fetchMessages(currentChatUser);
        }
    }

    // Fetch chat messages for the selected user
    function fetchMessages(user) {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        const userMessages = messages.filter(
            (message) => (message.sender === currentUser && message.receiver === user) || 
                         (message.receiver === currentUser && message.sender === user)
        );

        chatOutput.innerHTML = ""; // Clear previous messages
        userMessages.forEach((message) => {
            const messageElement = document.createElement("div");
            messageElement.textContent = message.message;
            messageElement.classList.add(message.sender === currentUser ? "sent" : "received");
            chatOutput.appendChild(messageElement);
        });

        // Scroll to the bottom of the chat output
        chatOutput.scrollTop = chatOutput.scrollHeight;  // Ensure the scroll is at the bottom
    }

    // Send message to the selected user
    sendButton.addEventListener("click", () => {
        const messageText = chatInput.value.trim();
        if (messageText !== "") {
            const newMessage = {
                sender: currentUser,  // Sender is the current logged-in user
                receiver: currentChatUser,  // Receiver is dr.Yossy
                message: messageText,
                timestamp: new Date().toISOString(),
            };

            // Get existing messages from localStorage or initialize an empty array
            const messages = JSON.parse(localStorage.getItem("messages")) || [];
            messages.push(newMessage);  // Add the new message
            localStorage.setItem("messages", JSON.stringify(messages));  // Store updated messages

            chatInput.value = ""; // Clear input field
            fetchMessages(currentChatUser); // Refresh the chat output
        }
    });

    // Initialize chatroom right after the page loads
    initChat();  // This will start the chat automatically with dr.Yossy
});
