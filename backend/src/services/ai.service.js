const { GoogleGenerativeAI } = require("@google/generative-ai");
const AppError = require("../utils/AppError");

// Initialize Gemini SDK
// IMPORTANT: The GEMINI_API_KEY must be in the .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Helper to safely parse JSON from Gemini's text response.
 */
const parseGeminiResponse = (text) => {
  try {
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json/, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```/, "");
    }

    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.replace(/```$/, "");
    }

    return JSON.parse(cleanedText.trim());
  } catch (error) {
    throw new AppError(
      "Failed to parse AI response as JSON. The model returned invalid format.",
      500,
    );
  }
};

/**
 * Generates content using Google Gemini API.
 * @param {string} text - The extracted text from the document.
 * @param {Object} options - { mode, difficulty, count }
 * @returns {Promise<Object>} - Formatted JSON response
 */
const generateContent = async (text, options) => {
  const { mode, difficulty = "medium", count = 5 } = options;

  if (!text) {
    throw new AppError("No text provided for generation.", 400);
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new AppError("GEMINI_API_KEY is not configured in the server environment.", 500);
  }

  try {
    // Best Practice: Use gemini-1.5-pro for complex reasoning tasks (educational content generation)
    // Best Practice: Use system instructions to set the persona
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction:
        "You are an expert Educational AI Engineer and Instructional Designer. Your goal is to analyze provided documents and generate highly accurate, structured, and pedagogically effective study materials. You must ALWAYS return pure JSON matching the exact schema requested without any conversational filler. IMPORTANT: ALL generated content (summaries, flashcard questions/answers, quiz questions/options/explanations) MUST be in Indonesian (Bahasa Indonesia).",
    });

    let prompt = "";

    // Best Practice: Prompt Engineering with strict schema definitions
    switch (mode) {
      case "summary":
        prompt = `
          Task: Create a comprehensive, easy-to-read summary of the provided text.
          Requirements:
          - Use Markdown formatting (headers, bullet points, bold text for emphasis).
          - Capture the main ideas and supporting details accurately.
          
          Expected JSON Schema:
          {
            "summary": "String (The full markdown formatted summary)"
          }
          
          Text to summarize:
          ---
          ${text}
          ---
        `;
        break;
      case "flashcard":
        prompt = `
          Task: Extract the most critical terms, concepts, and definitions from the provided text to create flashcards.
          Requirements:
          - Generate concise and clear questions.
          - Provide direct and accurate answers based only on the text.
          - Include a brief explanation or context to aid learning.
          
          Expected JSON Schema (Array of Objects):
          [
            { 
              "question": "String (The flashcard question)", 
              "answer": "String (The direct answer)", 
              "explanation": "String (Brief context or explanation)" 
            }
          ]
          
          Text to process:
          ---
          ${text}
          ---
        `;
        break;
      case "quiz":
        prompt = `
          Task: Create a multiple-choice quiz based on the provided text.
          Requirements:
          - Difficulty Level: ${difficulty}
          - Number of Questions: ${count}
          - Ensure the distractors (incorrect options) are plausible but demonstrably incorrect based on the text.
          - The options array must contain exactly 4 strings.
          - The correctAnswer must exactly match one of the strings in the options array.
          
          Expected JSON Schema (Array of Objects):
          [
            { 
              "question": "String (The quiz question)", 
              "options": ["Option A", "Option B", "Option C", "Option D"], 
              "correctAnswer": "String (The exact correct option)", 
              "explanation": "String (Why the answer is correct based on the text)" 
            }
          ]
          
          Text to process:
          ---
          ${text}
          ---
        `;
        break;
      default:
        throw new AppError(`Invalid generation mode: ${mode}`, 400);
    }

    // Best Practice: Force the model to output application/json
    const generationConfig = {
      responseMimeType: "application/json",
      temperature: 0.3, // Lower temperature for more factual and structured output
    };

    // Call Gemini API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const responseText = result.response.text();

    // Parse the response using our helper (though responseMimeType usually guarantees valid JSON without markdown)
    const parsedData = parseGeminiResponse(responseText);

    return {
      success: true,
      data: {
        mode,
        difficulty,
        count,
        generatedResults: parsedData,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`AI Generation failed: ${error.message}`, 500);
  }
};

module.exports = {
  generateContent,
};
