// frontend/js/ai.js

function toggleChat() {
  const chat = document.getElementById("chatWindow");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

async function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatMessages");
  const msg = input.value.trim();

  if (!msg) return;

  // User message
  chatBox.innerHTML += `<div class="user-msg">${msg}</div>`;
  input.value = "";

  // Typing effect
  chatBox.innerHTML += `<div class="ai-msg" id="typing">Typing...</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const reply = await askAI(msg);
    document.getElementById("typing").remove();
    chatBox.innerHTML += `<div class="ai-msg">${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    document.getElementById("typing").innerText = "Error connecting to AI";
  }
}

async function askAI(message) {
  // 1. Fetch the REAL time-based election state from the backend
  let currentState = "Not Started";
  try {
    const statusRes = await fetch("/api/admin/status");
    const statusData = await statusRes.json();
    currentState = statusData.status;
  } catch (e) {
    currentState = "Unknown";
  }

  // 2. Send context to your AI server (Port 5000)
  const res = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: message,
      userData: {
        voterId: localStorage.getItem("verifiedVoterId"),
        // NEW FIX: Check for the actual JWT token we implemented
        hasToken: !!localStorage.getItem("evote_token"),
        // NEW FIX: Vote status is now in sessionStorage
        hasVoted: sessionStorage.getItem("hasVoted") === "true"
      },
      systemData: {
        state: currentState // Sends the real dynamic state
      }
    })
  });

  const data = await res.json();
  return data.reply;
}

// Enter key support
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chatInput");
  if (input) {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});
