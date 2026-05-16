# TASK 2: Backend Development

**Objective:** Build a lightweight Node.js/Express server to handle file uploads, extract text from documents, and act as a secure bridge between the frontend and the AI service.

## 1. Project Initialization
*   Initialize a new Node.js project (`npm init -y`).
*   Install core dependencies: 
    *   `express` (web server framework)
    *   `cors` (to handle cross-origin requests from the frontend)
    *   `multer` (middleware for handling `multipart/form-data` file uploads)
    *   `dotenv` (for loading environment variables securely)
    *   `pdf-parse` (or similar, for extracting raw text from PDFs)

## 2. Server Setup
*   Create `server.js`.
*   Configure Express middleware: `express.json()`, `express.urlencoded()`, and `cors()`.
*   Set up a basic health check endpoint (e.g., `GET /api/health`).

## 3. File Upload & Text Extraction
*   Configure `multer` to receive files and store them temporarily in memory (`multer.memoryStorage()`).
*   Implement a utility function to extract text based on the file MIME type:
    *   **TXT:** Convert the buffer directly to a string.
    *   **PDF:** Pass the buffer to `pdf-parse` to extract text.
    *   **(Optional) DOCX:** Implement text extraction for Word documents if time permits.

## 4. Main API Endpoint
*   **POST `/api/generate`**
    *   **Receives:** The uploaded file buffer, `mode` (summary, flashcard, quiz), `difficulty`, and `count` from the `req.body` and `req.file`.
    *   **Action:** 
        1. Extracts the raw text from the file.
        2. Passes the text and the user settings to the AI Integration Module (Task 3).
        3. Awaits the generated response from the AI.
        4. Sends the formatted JSON response back to the frontend.

## 5. Error Handling
*   Validate the incoming request (ensure a file is attached and a mode is selected).
*   Handle file parsing errors gracefully.
*   Return standard HTTP status codes (400 for Bad Request, 500 for Internal Server Error) with helpful error messages.
