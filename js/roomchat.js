import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

 onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert("Kamu belum login");
      window.location.href = "login.html";
    } else {
      currentUser = user;
    }
  });

window.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const chatOutput = document.getElementById("chat-output");
    const chatbox = document.getElementById("chatbox");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");

    let currentUser = "laurance";  // Hardcoded for this example
    let currentChatUser = null;

    // Store users in localStorage for testing purposes
    if (!localStorage.getItem("users")) {
        const users = ["Laurance", "Brandon", "Steven", "Radit", "Varen"];
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Fetch all users from localStorage
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

    // Start chat with a selected user
    function startChat(user) {
        currentChatUser = user;
        chatbox.style.display = "block";  // Show the chatbox
        fetchMessages(user);

        // Add automated "Hi" message from the receiver (if not already sent)
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        const hiMessageExists = messages.some(
            (message) => message.sender === currentChatUser && message.message === "Hi, I'm " + currentChatUser + "!"
        );

        if (!hiMessageExists) {
            const hiMessage = {
                sender: currentChatUser,
                receiver: currentUser,
                message: "Hi, I'm " + currentChatUser + "!",
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
                sender: currentUser,
                receiver: currentChatUser,
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

    // Initialize user list on page load
    getAllUsers();
});
