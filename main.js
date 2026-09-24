const chat = document.getElementById("chat");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

chatForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = messageInput.value.trim();

    if (!text) return;

    addMessage(text, "user");

    messageInput.value = "";

    setTimeout(() => {
        addMessage(
            "Yo 😆 I'm still getting my brain installed. We'll connect the actual AI next.",
            "ai"
        );
    }, 500);
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
}

messageInput.focus();

