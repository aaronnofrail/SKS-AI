# Product Requirements Document (PRD)

**Project Name:** SKS-AI (Sistem Kebut Semalam AI) - Smart Study Companion
**Document Status:** Draft
**Date:** 2026-05-16
**Author:** Senior Product Manager

## 1. Product Overview

### 1.1 Product Vision
SKS-AI is a web-based, AI-powered application designed to help high school and university students effectively "cram" and learn study materials quickly, especially the day before an exam (H-1). The application seamlessly converts uploaded study materials into highly digestible and actionable formats: Summaries, Interactive Flashcards, and Quizzes.

### 1.2 Target Audience
*   **Primary Users:** High school students, university students, and lifelong learners.
*   **User Pain Points:** Overwhelmed by thick textbooks or long presentation slides, lacking the time to make comprehensive notes, and needing quick, effective ways to test their understanding at the last minute.

## 2. Goals & Success Metrics

*   **User Goal:** Quickly extract and understand the core concepts of their study materials and validate their readiness through interactive testing.
*   **Product Goal:** Provide a fast, reliable, and user-friendly Single-Page Application (SPA) that processes documents accurately and returns helpful study aids without friction.

## 3. User Stories

*   **As a student**, I want to upload my lecture notes or slides so that the AI can process the information.
*   **As a student**, I want to easily switch between output formats (Summary, Flashcard, or Quiz) depending on how I want to study.
*   **As a user preparing for a test**, I want to configure the quiz difficulty and the number of questions so I can tailor the practice to my available time and target proficiency.
*   **As a user reviewing concepts**, I want to flip flashcards to reveal answers and detailed explanations, helping me memorize effectively.

## 4. Functional Requirements

### 4.1 File Upload Component
*   **Feature:** A drag-and-drop or click-to-upload area for study materials.
*   **Requirements:**
    *   Must support standard document formats (e.g., PDF, DOCX, TXT).
    *   Must display clear feedback during upload and processing (e.g., loading spinners, success indicators).

### 4.2 Output Configuration Controls
*   **Mode Selection:** Prominent buttons or a toggle group to select the desired output format:
    *   **Summary:** Generates a concise overview of the uploaded material.
    *   **Flashcard:** Generates key term/concept cards.
    *   **Quiz:** Generates multiple-choice or short-answer questions to test knowledge.
*   **Quiz Settings (Dynamic):**
    *   **Difficulty Selector:** Dropdown or buttons to select Easy, Medium, or Hard (visible only when 'Quiz' is selected).
    *   **Question Count Selector:** Input or predefined options (e.g., 5, 10, 15) to select the number of quiz questions (visible only when 'Quiz' is selected).

### 4.3 Output Displays
The application must dynamically display the appropriate component based on the user's selected mode:
*   **Summary Display:** A clean, scrollable text area with rich formatting (bullet points, bold text) for easy reading of key information.
*   **Flashcard Display:** Interactive card components.
    *   **Front:** Displays the question or concept.
    *   **Interaction:** Clicking or tapping the card triggers a flip animation.
    *   **Back:** Reveals the answer along with a brief explanation.
*   **Quiz Display:**
    *   An interactive interface presenting questions clearly.
    *   Allows users to select or input their answers and submit them.
*   **Quiz Results Display:**
    *   Shows the final score upon quiz completion.
    *   Highlights correct versus incorrect answers, providing explanations for mistakes to aid in learning.

## 5. Non-Functional Requirements

*   **Responsiveness:** The user interface must be fully responsive and accessible on both desktop and mobile devices. Mobile optimization is critical for students studying on their phones.
*   **Performance:** AI processing time should be minimized. The UI must provide continuous feedback (e.g., "Analyzing document...", "Generating quiz...") so the user does not think the app has frozen.
*   **Simplicity:** The entire experience must be contained within a single web page to eliminate unnecessary navigation and reduce cognitive load.

## 6. User Experience (UX) & Interface (UI) Guidelines

*   **Design Aesthetic:** Clean, modern, and focused. Avoid visual clutter. Use a premium aesthetic (e.g., soft gradients, glassmorphism, modern typography like Inter or Roboto).
*   **Theme:** A "Dark Mode" option is highly recommended to reduce eye strain for students studying late at night.
*   **Layout Structure (Single Page):**
    *   **Header:** App logo and simple title.
    *   **Left Panel / Top Section:** Upload zone and all configuration controls (Mode, Difficulty, Count).
    *   **Main Content Area:** A large, prominent display area that dynamically updates to show either the Summary, the Flashcard deck, or the Quiz interface.

## 7. Out of Scope (For MVP Phase 1)

*   User Authentication / Login and Accounts.
*   Saving history of previous summaries, flashcards, or quizzes to a database.
*   Social sharing features or multiplayer leaderboards.
*   Payment gateways or subscription tiers.
