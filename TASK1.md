# TASK 1: Frontend Development

**Objective:** Build a responsive, fast, and visually premium Single-Page Application (SPA) using vanilla HTML, CSS, and JavaScript.

## 1. Project Setup
*   Create `index.html`, `style.css`, and `script.js`.
*   Set up modern typography (e.g., Inter or Outfit from Google Fonts).
*   Define global CSS variables for the color palette. Implement a "dark mode" aesthetic (e.g., deep charcoal backgrounds, subtle glassmorphism panels, and vibrant accent colors like indigo/violet).

## 2. Layout Structure (HTML/CSS)
*   **Header:** App Logo and Title ("SKS-AI").
*   **Main Container:**
    *   **Control Panel (Left/Top):** For all inputs and settings.
    *   **Main Display Area (Right/Bottom):** A dynamic container for the outputs.

## 3. UI Components Development
*   **File Upload Component:** Create a stylized drag-and-drop zone with a file selection button. Include a filename display when a file is selected.
*   **Format Selection:** Build a horizontal button group for `[ Summary ]`, `[ Flashcards ]`, and `[ Quiz ]`.
*   **Quiz Settings:** Create dropdowns or styled buttons for "Difficulty" (Easy, Medium, Hard) and "Question Count" (5, 10, 15). **Logic:** Hide these by default and show them only when "Quiz" is selected.
*   **Generate Button:** A prominent Call-to-Action. Include a "Loading Spinner" state to show when the AI is processing.

## 4. Output Displays (Dynamic Views)
*   **Summary View:** A clean text container supporting basic formatting (headers, bold text, bullet points).
*   **Flashcard View:** 
    *   Build the HTML/CSS structure for a card. 
    *   Implement the 3D flip animation using CSS (`transform-style: preserve-3d`, `backface-visibility: hidden`, and `transform: rotateY(180deg)`).
*   **Quiz View:**
    *   **Active:** A form presenting questions with radio buttons for options.
    *   **Results:** A dashboard showing the final score and color-coded results (green for correct, red for incorrect with explanations).

## 5. Logic & State Management (JavaScript)
*   Handle DOM elements and event listeners (clicks, file uploads).
*   Manage UI state (e.g., toggling the Quiz settings, switching between Summary/Flashcard/Quiz display containers).
*   Implement `fetch` API to send `FormData` (the uploaded file and selected settings) to the Node.js backend.
*   Parse the JSON response from the server and dynamically generate the HTML elements for the selected output.
