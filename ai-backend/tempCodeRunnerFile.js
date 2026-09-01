import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix path issue for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from SAME folder
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Debug (keep this for now)
console.log("Loaded KEY:", process.env.OPENROUTER_API_KEY);

// ✅ Check API key
if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ OPENROUTER_API_KEY is missing in .env file");
  process.exit(1);
} else {
  console.log("✅ API Key Loaded");
}

app.post("/chat", async (req, res) => {
  try {
    const { message, userData, systemData } = req.body;

    const systemPrompt = `
You are an AI assistant for a digital voting system.

User Info:
- Voter ID: ${userData?.voterId}
- Has Token: ${userData?.hasToken}
- Has Voted: ${userData?.hasVoted}

System Info:
- Election State: ${systemData?.state}

Your job:
- Guide user step-by-step
- Keep answers short and clear
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "AI Voting System"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    // ✅ Handle API errors properly
    if (!response.ok) {
      console.error("❌ OpenRouter Error:", data);
      return res.json({
        reply: data?.error?.message || "AI service error"
      });
    }

    // ✅ Extract response safely
    const reply =
      data?.choices?.[0]?.message?.content ||
      "No response from AI";

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