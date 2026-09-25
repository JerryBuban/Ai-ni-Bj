const chat = document.getElementById("chat");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const BACKEND_URL = "https://ai-nj-bj-backend.onrender.com";

chatForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const text = messageInput.value.trim();

    if (!text) return;

    addMessage(text, "user");
    messageInput.value = "";

    sendButton.disabled = true;
    messageInput.disabled = true;

    const thinkingMessage = addMessage("Thinking...", "ai");

    try {
        const response = await fetch(`${BACKEND_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        thinkingMessage.remove();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        addMessage(data.reply, "ai");

    } catch (error) {
        thinkingMessage.remove();

        addMessage(
            "I couldn't reach my brain right now. 😭",
            "ai"
        );

        console.error(error);

    } finally {
        sendButton.disabled = false;
        messageInput.disabled = false;
        messageInput.focus();
    }
});


function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    message.appendChild(bubble);
    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

    return message;
}


messageInput.focus();
