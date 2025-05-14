$(document).ready(function() {
    const chatInput = $('#chat-input');
    const chatOutput = $('#chat-output');
    const sendButton = $('#send-button');

    const apiKey = 'AIzaSyC1alty5aKgWmfyBonk6KYPG6qVxZWJsys'; // Ganti dengan kunci API Anda yang valid

    const modelName = 'gemini-2.0-flash';
    const apiURL = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;

    sendButton.on('click', sendMessage);

    chatInput.on('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = chatInput.val().trim();
        if (messageText === '') {
            return;
        }

        displayMessage(messageText, 'user');
        chatInput.val('');

        const typingMessageId = 'typing-' + Date.now();
        displayMessage('Bot is typing...', 'bot-typing', typingMessageId);

        getAIResponse(messageText, typingMessageId);
    }

    function displayMessage(message, sender, messageId) {
        const messageElement = $('<div></div>').addClass('message').addClass(sender + '-message');
        if (messageId) {
            messageElement.attr('id', messageId);
        }
        messageElement.text(message);
        chatOutput.append(messageElement);
        chatOutput.scrollTop(chatOutput.prop('scrollHeight'));
    }

    async function getAIResponse(userInput, typingMessageId) {
        if (typingMessageId) {
            $('#' + typingMessageId).remove();
        }

        try {
            // Menghapus generationConfig untuk sementara
            const requestBody = {
                contents: [{
                    parts: [{
                        text: userInput
                    }]
                }]
                // generationConfig: {
                //     responseMimeType: 'text/plain' // Baris ini menyebabkan error
                // }
            };

            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})); // Coba parse error, default ke objek kosong jika gagal
                let errorMessage = `Error: ${response.status} ${response.statusText}`;
                if (errorData.error && errorData.error.message) {
                    errorMessage += ` - ${errorData.error.message}`;
                    // Sertakan detail jika ada, karena ini membantu debugging
                    if (errorData.error.details) {
                        errorMessage += ` Details: ${JSON.stringify(errorData.error.details)}`;
                    }
                }
                console.error('API Error Full Response:', errorData); // Log seluruh errorData untuk inspeksi
                throw new Error(errorMessage);
            }

            const data = await response.json();

            let botResponse = "Maaf, saya tidak dapat memproses permintaan itu saat ini.";
            // Logika untuk mengekstrak respons tetap sama karena API akan default ke JSON
            if (data.candidates && data.candidates.length > 0 &&
                data.candidates[0].content && data.candidates[0].content.parts &&
                data.candidates[0].content.parts.length > 0 && data.candidates[0].content.parts[0].text) {
                botResponse = data.candidates[0].content.parts[0].text;
            } else if (data.error && data.error.message) {
                botResponse = `API Error: ${data.error.message}`;
            } else if (data.promptFeedback && data.promptFeedback.blockReason) {
                botResponse = `Permintaan diblokir: ${data.promptFeedback.blockReason}.`;
                if (data.promptFeedback.safetyRatings) {
                    console.warn("Safety Ratings:", data.promptFeedback.safetyRatings);
                    botResponse += " Harap sesuaikan input Anda.";
                }
            }

            displayMessage(botResponse, 'bot');

        } catch (error) {
            console.error('Error fetching AI response:', error);
            displayMessage(`Gagal mendapatkan respons dari AI: ${error.message}`, 'bot-error');
        }
    }
}); 