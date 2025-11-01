const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");
const thinking = document.getElementById("thinking");

let voiceEnabled = false;

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  alert(voiceEnabled ? "Voice enabled" : "Voice disabled");
}

async function sendMessage() {
  const userMsg = input.value.trim();
  if (!userMsg) return;

  addMessage(userMsg, "user");
  input.value = "";
  thinking.style.display = "block";

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await response.json();
    thinking.style.display = "none";
    addMessage(data.reply, "bot");

    if (voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(data.reply);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  } catch (error) {
    thinking.style.display = "none";
    addMessage("⚠️ Yukito encountered an error. Please try again.", "bot");
    console.error(error);
  }
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
