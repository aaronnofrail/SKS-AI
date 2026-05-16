# System Architecture & UI Design (FULL DESIGN)

**Project Name:** SKS-AI (Sistem Kebut Semalam AI)
**Document Status:** Final
**Role:** Senior Fullstack Developer

## 1. System Architecture

The application is designed to be lightweight, fast, and easy to deploy. It follows a clean client-server architecture with no persistent database required, as processing happens on-the-fly to ensure user privacy and simplicity.

### 1.1 Tech Stack
*   **Frontend:** HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+). We are using a native stack without heavy frameworks (like React or Vue) to ensure the Single Page Application (SPA) remains extremely fast, lightweight, and easy to maintain.
*   **Backend:** Node.js (with Express.js or a similar minimal framework) to handle API routing, file parsing, and secure communication with the AI service.
*   **Database:** None. The application is completely stateless. (In-memory storage or browser `localStorage` will be used if temporary state persistence is needed during an active session).
*   **AI Integration:** Google Gemini API. This will act as the core engine for processing uploaded documents and generating the summaries, flashcards, and quizzes.

### 1.2 Data Flow
1.  **Client:** The user uploads a document (e.g., PDF, TXT) via the frontend interface.
2.  **Server (Node.js):** The backend receives the file, extracts the raw text, and constructs a tailored prompt based on user settings (format, difficulty, count).
3.  **AI Model (Gemini):** The backend sends the prompt and text securely to the Gemini API.
4.  **Server (Node.js):** The backend receives the generated JSON response from Gemini, formats it, and sends it back to the frontend.
5.  **Client:** The frontend dynamically updates the UI to display the requested study format without reloading the page.

---

## 2. User Interface (UI) Design

The application will be a clean, modern **Single-Page Application (SPA)** to eliminate page reloads and provide a frictionless, app-like experience.

### 2.1 Layout Structure

The UI will be divided into two main logical sections: the **Control Panel** (for input and settings) and the **Main Display Area** (for the AI output).

#### A. Control Panel (Input & Settings)
*   **File Upload Component:** A dedicated drag-and-drop zone or a clear "Upload Material" button. It must show upload progress and success/error states.
*   **Format Selection Buttons:** A clear, horizontal button group to select the desired output mode:
    *   `[ Summary ]` | `[ Flashcards ]` | `[ Quiz ]`
*   **Quiz Settings (Conditional UI):** These controls will dynamically appear *only* when the "Quiz" format is active:
    *   **Difficulty Selector:** A dropdown or button row (`Easy`, `Medium`, `Hard`).
    *   **Question Count:** A dropdown or preset buttons (e.g., `5`, `10`, `15` questions).
*   **"Generate" Button:** A prominent Call-to-Action (CTA) button to trigger the backend request. It will show a loading spinner while waiting for Gemini to respond.

#### B. Main Display Area (Output)
This area is a dynamic container that updates based on the selected format and the AI's response.

*   **State 1: Summary View**
    *   Displays the generated summary in a clean, highly readable typography layout.
    *   Supports basic markdown rendering (Headers, Bullet points, Bold text) to structure the summary effectively.

*   **State 2: Flashcard View**
    *   Displays a responsive grid or a single-card carousel of flashcards.
    *   **Interaction:** Each card shows the "Question" or "Concept" on the front. Clicking or tapping the card triggers a smooth 3D CSS flip animation to reveal the "Answer" and a brief "Explanation" on the back.

*   **State 3: Quiz View**
    *   **Active Quiz:** Displays questions sequentially or in a scrollable list. Includes radio buttons or text inputs for answers, and a final "Submit Quiz" button.
    *   **Quiz Results:** After submission, the view transitions to a results dashboard. It shows the final score (e.g., "8/10") and lists all questions, clearly highlighting correct answers (green) and incorrect answers (red) along with explanations for why an answer was wrong.

### 2.2 Design Aesthetic Guidelines
*   **Vibe:** Premium, focused, and distraction-free. 
*   **Color Palette:** We will implement a modern dark mode by default (e.g., deep charcoal backgrounds with sleek glassmorphism panels) to reduce eye strain for late-night studying. Accent colors (like vibrant indigo or violet) will be used for primary buttons and active states.
*   **Typography:** Clean, modern sans-serif fonts (like *Inter* or *Outfit*) for maximum readability.
*   **Micro-interactions:** Smooth CSS transitions for button hovers, dynamic component loading, and the signature flashcard flip animation to make the app feel responsive and "alive."
