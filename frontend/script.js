document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    let currentFile = null;
    let currentMode = 'summary'; // summary, flashcard, quiz
    let quizDifficulty = 'medium';
    let quizCount = 10;

    // --- DOM Elements ---
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const generateBtn = document.getElementById('generateBtn');
    
    const modeBtns = document.querySelectorAll('.mode-btn');
    const countBtns = document.querySelectorAll('.count-btn');
    const difficultySelect = document.getElementById('difficultySelect');
    const quizSettings = document.getElementById('quizSettings');

    // Display Areas
    const emptyState = document.getElementById('emptyState');
    const summaryContainer = document.getElementById('summaryContainer');
    const flashcardContainer = document.getElementById('flashcardContainer');
    const quizContainer = document.getElementById('quizContainer');

    // --- Event Listeners ---

    // 1. File Upload
    uploadZone.addEventListener('click', () => fileInput.click());
    
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    function handleFileSelect(file) {
        currentFile = file;
        fileNameDisplay.textContent = `File selected: ${file.name}`;
        fileNameDisplay.classList.remove('hidden');
        checkGenerateBtnState();
    }

    // 2. Mode Selection
    modeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            modeBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMode = e.target.dataset.mode;
            
            // Toggle Quiz Settings visibility
            if (currentMode === 'quiz') {
                quizSettings.classList.remove('hidden');
            } else {
                quizSettings.classList.add('hidden');
            }
        });
    });

    // 3. Quiz Settings Selection
    difficultySelect.addEventListener('change', (e) => {
        quizDifficulty = e.target.value;
    });

    countBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            countBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            quizCount = parseInt(e.target.dataset.count);
        });
    });

    function checkGenerateBtnState() {
        if (currentFile) {
            generateBtn.disabled = false;
        }
    }

    // 4. Generate Button
    generateBtn.addEventListener('click', async () => {
        if (!currentFile) return;

        // UI Loading State
        const btnText = generateBtn.querySelector('.btn-text');
        const loader = generateBtn.querySelector('.loader');
        
        btnText.textContent = 'Processing...';
        loader.classList.remove('hidden');
        generateBtn.disabled = true;

        // Hide all views
        emptyState.classList.add('hidden');
        summaryContainer.classList.add('hidden');
        flashcardContainer.classList.add('hidden');
        quizContainer.classList.add('hidden');

        // Simulate network delay for mock functionality
        setTimeout(() => {
            btnText.textContent = 'Generate Study Material';
            loader.classList.add('hidden');
            generateBtn.disabled = false;

            renderMockOutput(currentMode);
        }, 1500);
    });

    // --- Mock Data Rendering ---
    
    function renderMockOutput(mode) {
        if (mode === 'summary') {
            summaryContainer.classList.remove('hidden');
            document.getElementById('summaryContent').innerHTML = `
                <h3>Core Concepts</h3>
                <p>This is a simulated summary of your document. In the final product, Gemini will generate this based on your PDF.</p>
                <ul>
                    <li><strong>Key Point 1:</strong> Important definition goes here.</li>
                    <li><strong>Key Point 2:</strong> Another crucial concept extracted from the text.</li>
                    <li><strong>Key Point 3:</strong> Summary of the overall conclusion.</li>
                </ul>
            `;
        } 
        else if (mode === 'flashcard') {
            flashcardContainer.classList.remove('hidden');
            setupMockFlashcards();
        }
        else if (mode === 'quiz') {
            quizContainer.classList.remove('hidden');
            setupMockQuiz();
        }
    }

    // Flashcard Logic
    function setupMockFlashcards() {
        const card = document.getElementById('flashcard');
        const nextBtn = document.getElementById('nextCard');
        const prevBtn = document.getElementById('prevCard');
        const counter = document.getElementById('cardCounter');
        
        const mockCards = [
            { q: "What does SKS stand for?", a: "Sistem Kebut Semalam", exp: "An Indonesian slang for cramming study materials a night before the exam." },
            { q: "What AI powers this app?", a: "Google Gemini", exp: "Gemini is used to intelligently summarize and generate quizzes from raw text." }
        ];

        let currentIndex = 0;

        function renderCard() {
            card.classList.remove('is-flipped'); // reset flip
            
            // wait for flip back animation before changing text
            setTimeout(() => {
                document.getElementById('fcQuestion').textContent = mockCards[currentIndex].q;
                document.getElementById('fcAnswer').textContent = mockCards[currentIndex].a;
                document.getElementById('fcExplanation').textContent = mockCards[currentIndex].exp;
                counter.textContent = `${currentIndex + 1} / ${mockCards.length}`;
            }, 300);
        }

        // Flip interaction
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });

        // Ensure listeners are only added once
        const newNextBtn = nextBtn.cloneNode(true);
        const newPrevBtn = prevBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);

        newNextBtn.addEventListener('click', () => {
            if (currentIndex < mockCards.length - 1) {
                currentIndex++;
                renderCard();
            }
        });

        newPrevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                renderCard();
            }
        });

        renderCard();
    }

    // Quiz Logic
    function setupMockQuiz() {
        const activeView = document.getElementById('quizActiveView');
        const resultView = document.getElementById('quizResultView');
        const optionsGroup = document.getElementById('quizOptions');
        const submitBtn = document.getElementById('submitQuizBtn');
        const restartBtn = document.getElementById('restartQuizBtn');
        
        activeView.classList.remove('hidden');
        resultView.classList.add('hidden');

        // Mock a single question for demonstration
        document.getElementById('quizProgress').textContent = `Question 1 of ${quizCount} (Mock)`;
        document.getElementById('quizQuestion').textContent = "Which architecture pattern does SKS-AI use?";
        
        const options = ["Microservices", "Single Page Application (SPA)", "Server-side Rendering (SSR)", "Monolith"];
        
        optionsGroup.innerHTML = '';
        options.forEach((opt, index) => {
            optionsGroup.innerHTML += `
                <label class="option-label">
                    <input type="radio" name="q1" value="${opt}">
                    ${opt}
                </label>
            `;
        });

        // Use event delegation or re-assign to avoid multiple bindings
        submitBtn.onclick = () => {
            const selected = document.querySelector('input[name="q1"]:checked');
            if (!selected) {
                alert("Please select an answer");
                return;
            }

            // Show results
            activeView.classList.add('hidden');
            resultView.classList.remove('hidden');
            
            document.getElementById('quizScore').textContent = selected.value === "Single Page Application (SPA)" ? "1/1" : "0/1";
            
            document.getElementById('quizFeedback').innerHTML = `
                <div class="feedback-item ${selected.value === "Single Page Application (SPA)" ? 'correct' : 'incorrect'}">
                    <h4>Q: Which architecture pattern does SKS-AI use?</h4>
                    <p>Your answer: ${selected.value}</p>
                    <p class="correct-ans">Correct answer: Single Page Application (SPA)</p>
                    <p class="exp">SKS-AI uses a Vanilla HTML/JS frontend that communicates with a Node.js backend without reloading the page.</p>
                </div>
            `;
        };

        restartBtn.onclick = () => {
            activeView.classList.remove('hidden');
            resultView.classList.add('hidden');
            const radios = document.querySelectorAll('input[name="q1"]');
            radios.forEach(r => r.checked = false);
        };
    }
});
