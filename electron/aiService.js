const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runStudyAssistant({ mode, text }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables.");
  }

  const trimmed = (text || "").trim();
  if (!trimmed) {
    throw new Error("Input text is empty.");
  }

  let instruction = "";

  if (mode === "summary") {
    instruction =
      "Summarize the following study notes clearly and concisely for a student. Keep it structured and easy to revise.";
  } else if (mode === "bullets") {
    instruction =
      "Convert the following study notes into clear bullet points for revision. Keep them concise and useful.";
  } else if (mode === "questions") {
    instruction =
      "Generate revision questions from the following study notes. Make them useful for self-testing.";
  } else {
    throw new Error("Invalid AI mode.");
  }

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: "You are a helpful study assistant inside a desktop productivity app.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `${instruction}\n\nStudy notes:\n${trimmed}`,
          },
        ],
      },
    ],
  });

  return response.output_text;
}

module.exports = {
  runStudyAssistant,
};