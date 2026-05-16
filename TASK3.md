# TASK 3: AI Integration

**Objective:** Integrate the Google Gemini API to intelligently process extracted document text and return highly structured, formatted data for Summaries, Flashcards, and Quizzes.

## 1. Gemini SDK Setup
*   Install the official Google Generative AI SDK for Node.js (`npm install @google/generative-ai`).
*   Ensure the `GEMINI_API_KEY` is securely loaded via the `.env` file and never hardcoded.
*   Initialize the `GoogleGenerativeAI` client with the API key.

## 2. Prompt Engineering & JSON Schemas
Design strict, system-level prompts to force Gemini to return exactly what the frontend expects, preferably in clean JSON format.

*   **Summary Prompt:**
    *   **Instruction:** Read the provided text and create a comprehensive, easy-to-read summary. Use markdown formatting (headers, bullet points).
    *   **Expected Output:** A markdown string.
    
*   **Flashcard Prompt:**
    *   **Instruction:** Extract the most important terms and concepts from the text to create flashcards. Return the result STRICTLY as a JSON array.
    *   **Expected Output Format:**
        ```json
        [
          { "question": "...", "answer": "...", "explanation": "..." }
        ]
        ```

*   **Quiz Prompt:**
    *   **Instruction:** Create a multiple-choice quiz based on the text. Difficulty level: [User Difficulty], Number of questions: [User Count]. Return the result STRICTLY as a JSON array.
    *   **Expected Output Format:**
        ```json
        [
          { 
            "question": "...", 
            "options": ["A", "B", "C", "D"], 
            "correctAnswer": "A", 
            "explanation": "..." 
          }
        ]
        ```

## 3. Integration Service (`aiService.js`)
*   Create a dedicated file/module for AI interactions.
*   Implement an asynchronous function `generateStudyMaterial(text, mode, difficulty, count)`:
    1. Selects the appropriate prompt template based on the `mode`.
    2. Calls `model.generateContent(prompt + text)`.
    3. Retrieves the response text.

## 4. Response Parsing & Validation
*   Gemini sometimes wraps JSON in markdown code blocks (e.g., \`\`\`json ... \`\`\`). Implement a regex or string replacement step to strip these blocks before calling `JSON.parse()`.
*   Validate the parsed JSON structure to ensure it matches the expected schema.
*   Implement error handling (e.g., `try/catch` blocks) to manage situations where Gemini fails to generate valid JSON or if rate limits are hit.
