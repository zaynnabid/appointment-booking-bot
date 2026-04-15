const restartBtn = document.getElementById("restartBtn");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const restartBtn = document.getElementById("restartBtn");

let bookingData = {
  fullName: "",
  phone: "",
  email: "",
  appointmentType: "",
  preferredDate: "",
  preferredTime: "",
  note: "",
  _skippedFields: []
};


let currentField = null;
let isConversationStarted = false;
let isBookingSubmitted = false;

function addMessage(text, sender = "bot") {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  message.style.marginBottom = "12px";
  message.style.padding = "12px";
  message.style.borderRadius = "10px";
  message.style.maxWidth = "80%";
  message.style.whiteSpace = "pre-wrap";
  message.style.wordBreak = "break-word";

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

function setLoading(isLoading) {
  sendBtn.disabled = isLoading;
  chatInput.disabled = isLoading;
  sendBtn.textContent = isLoading ? "Sending..." : "Send";
}

async function sendMessageToApi(payload) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}

async function submitBooking(payload) {
  const response = await fetch("/api/submit-booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}

async function startConversation() {
  try {
    setLoading(true);

    const data = await sendMessageToApi({
      message: "",
      bookingData,
      currentField
    });

    if (data.success) {
      bookingData = data.bookingData || bookingData;
      currentField = data.currentField || null;
      addMessage(data.reply, "bot");
      isConversationStarted = true;
    } else {
      addMessage(data.message || "Conversation start nahi ho saki.", "bot");
    }
  } catch (error) {
    addMessage("Server se response nahi mila. Dobara try karein.", "bot");
  } finally {
    if (!isBookingSubmitted) {
      setLoading(false);
      chatInput.focus();
    }
  }
}

function resetConversation() {
  bookingData = {
    fullName: "",
    phone: "",
    email: "",
    appointmentType: "",
    preferredDate: "",
    preferredTime: "",
    note: "",
    _skippedFields: []
  };

  currentField = null;
  isConversationStarted = false;
  isBookingSubmitted = false;

  chatMessages.innerHTML = "";

  chatInput.disabled = false;
  sendBtn.disabled = false;
  sendBtn.textContent = "Send";

  addMessage("Nayi booking start karte hain.", "bot");
  startConversation();
}


async function handleSend() {
  const text = chatInput.value.trim();

  if (!text || isBookingSubmitted) return;

  if (!isConversationStarted) {
    isConversationStarted = true;
  }

  addMessage(text, "user");
  chatInput.value = "";
  setLoading(true);

  try {
    const data = await sendMessageToApi({
      message: text,
      bookingData,
      currentField
    });

    if (data.success) {
      bookingData = data.bookingData || bookingData;
      currentField = data.currentField || null;
      addMessage(data.reply, "bot");

      if (data.completed) {
        const submitResult = await submitBooking({
          fullName: bookingData.fullName,
          phone: bookingData.phone,
          email: bookingData.email,
          appointmentType: bookingData.appointmentType,
          preferredDate: bookingData.preferredDate,
          preferredTime: bookingData.preferredTime,
          note: bookingData.note
        });

        if (submitResult.success) {
          isBookingSubmitted = true;
          addMessage(
            `Your booking has been saved successfully.\nBooking ID: ${submitResult.bookingId}`,
            "bot"
          );
          chatInput.disabled = true;
          sendBtn.disabled = true;
          sendBtn.textContent = "Completed";
          return;
        }

        addMessage(
          submitResult.message || "Booking save nahi ho saki.",
          "bot"
        );
      }
    } else {
      addMessage(data.message || "Something went wrong.", "bot");
    }
  } catch (error) {
    addMessage("Server se response nahi mila. Dobara try karein.", "bot");
  } finally {
    if (!isBookingSubmitted) {
      setLoading(false);
      chatInput.focus();
    }
  }
}

sendBtn.addEventListener("click", handleSend);
restartBtn.addEventListener("click", resetConversation);

chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSend();
  }
});

addMessage("Assalam o Alaikum! Main aapki appointment booking mein help karunga.", "bot");
startConversation();
function resetConversation() {
  bookingData = {
    fullName: "",
    phone: "",
    email: "",
    appointmentType: "",
    preferredDate: "",
    preferredTime: "",
    note: "",
    _skippedFields: []
  };

  currentField = null;
  isConversationStarted = false;
  isBookingSubmitted = false;

  chatMessages.innerHTML = "";

  chatInput.disabled = false;
  sendBtn.disabled = false;
  sendBtn.textContent = "Send";

  addMessage("Nayi booking start karte hain.", "bot");
  startConversation();
}

