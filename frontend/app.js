const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender = "bot") {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  message.style.marginBottom = "12px";
  message.style.padding = "12px";
  message.style.borderRadius = "10px";
  message.style.maxWidth = "80%";

  if (sender === "bot") {
    message.style.background = "#e2e8f0";
    message.style.color = "#0f172a";
  } else {
    message.style.background = "#0f172a";
    message.style.color = "#ffffff";
    message.style.marginLeft = "auto";
  }

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleSend() {
  const text = chatInput.value.trim();

  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  setTimeout(() => {
    addMessage("Bot response will come here.", "bot");
  }, 400);
}

sendBtn.addEventListener("click", handleSend);

chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSend();
  }
});

addMessage("Assalam o Alaikum! Main aapki appointment booking mein help karunga.", "bot");
