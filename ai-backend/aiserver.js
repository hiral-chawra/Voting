import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

// Debug
console.log("Loaded KEY:", process.env.OPENROUTER_API_KEY);

if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ OPENROUTER_API_KEY missing");
  process.exit(1);
} else {
  console.log("✅ API Key Loaded");
}

app.post("/chat", async (req, res) => {
  try {
    const { message, userData, systemData } = req.body;

    // ✅ Validate input
    if (!message) {
      return res.json({ reply: "Message is required" });
    }

    const systemPrompt = `
You are an AI assistant for a digital voting system.

User Info:
- Voter ID: ${userData?.voterId}
- Has Token: ${userData?.hasToken}
- Has Voted: ${userData?.hasVoted}

System Info:
- Election State: ${systemData?.state}

Rules:
- Guide step-by-step
- Keep answers short
- Do not ask for data already available
`;

    // ✅ Try multiple models (fallback system)
    const models = [
      "meta-llama/llama-3-8b-instruct",
      "mistralai/mistral-7b-instruct",
      "openchat/openchat-3.5-0106"
    ];

    let reply = "AI not available right now";

    for (let model of models) {
      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:5000",
              "X-Title": "AI Voting System"
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
              ]
            })
          }
        );

        const data = await response.json();

        if (response.ok && data?.choices?.[0]?.message?.content) {
          reply = data.choices[0].message.content;
          break; // ✅ stop when success
        } else {
          console.log(`⚠️ Model failed: ${model}`);
        }

      } catch (err) {
        console.log(`❌ Error with model ${model}:`, err.message);
      }
    }

    res.json({ reply });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    res.status(500).json({
      reply: "Server error. Try again."
    });
  }
});

app.listen(5000, () => {
  console.log("🚀 AI running on http://localhost:5000");
});