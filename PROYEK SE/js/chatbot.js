// chatbot.js (pastikan dipanggil dengan <script type="module" src="...">)
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

$(document).ready(function () {
  const chatInput = $('#chat-input');
  const chatOutput = $('#chat-output');
  const sendButton = $('#send-button');

  const apiKey = 'AIzaSyC1alty5aKgWmfyBonk6KYPG6qVxZWJsys'; // ganti dengan API Gemini kamu
  const modelName = 'gemini-2.0-flash';
  const apiURL = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;

  let currentUser = null;

  // ✅ Cek login
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert("Kamu belum login");
      window.location.href = "login.html";
    } else {
      currentUser = user;
    }
  });

  sendButton.on('click', sendMessage);
  chatInput.on('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  async function sendMessage() {
    const messageText = chatInput.val().trim();
    if (messageText === '') return;

    displayMessage(messageText, 'user');
    chatInput.val('');

    const typingMessageId = 'typing-' + Date.now();
    displayMessage('Bot is typing...', 'bot-typing', typingMessageId);

    // ✅ Simpan pesan ke Firestore
    if (currentUser) {
      await saveChatToFirestore(currentUser.uid, messageText);
    }

    getAIResponse(messageText, typingMessageId);
  }

  async function saveChatToFirestore(uid, message) {
    try {
      await addDoc(collection(db, "users", uid, "chatbot_history"), {
        message,
        sender: "user",
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Gagal simpan riwayat:", error);
    }
  }

  function displayMessage(message, sender, messageId) {
    const messageElement = $('<div></div>').addClass('message').addClass(sender + '-message');
    if (messageId) messageElement.attr('id', messageId);
    messageElement.text(message);
    chatOutput.append(messageElement);
    chatOutput.scrollTop(chatOutput.prop('scrollHeight'));
  }

  async function getAIResponse(userInput, typingMessageId) {
    if (typingMessageId) $('#' + typingMessageId).remove();

    try {
      const requestBody = {
        contents: [{ parts: [{ text: userInput }] }]
      };

      const response = await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = `Error: ${response.status} ${response.statusText}`;
        if (errorData.error && errorData.error.message) {
          errorMessage += ` - ${errorData.error.message}`;
          if (errorData.error.details) {
            errorMessage += ` Details: ${JSON.stringify(errorData.error.details)}`;
          }
        }
        console.error('API Error:', errorData);
        throw new Error(errorMessage);
      }

      const data = await response.json();

      let botResponse = "Maaf, saya tidak dapat memproses permintaan itu saat ini.";
      if (
        data.candidates?.[0]?.content?.parts?.[0]?.text
      ) {
        botResponse = data.candidates[0].content.parts[0].text;
      }

      displayMessage(botResponse, 'bot');
    } catch (error) {
      console.error('AI response error:', error);
      displayMessage(`Gagal mendapatkan respons dari AI: ${error.message}`, 'bot-error');
    }
  }
});
