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

    // 4. Generate Button (API Integration)
    generateBtn.addEventListener('click', async () => {
        if (!currentFile) return;

        // UI Loading State
        const btnText = generateBtn.querySelector('.btn-text');
        const loader = generateBtn.querySelector('.loader');
        
        btnText.textContent = 'Processing with AI...';
        loader.classList.remove('hidden');
        generateBtn.disabled = true;

        // Hide all views
        emptyState.classList.add('hidden');
        summaryContainer.classList.add('hidden');
        flashcardContainer.classList.add('hidden');
        quizContainer.classList.add('hidden');

        try {
            const formData = new FormData();
            formData.append('file', currentFile);
            formData.append('mode', currentMode);
            
            if (currentMode === 'quiz') {
                formData.append('difficulty', quizDifficulty);
                formData.append('count', quizCount);
            }

            const response = await fetch('http://localhost:3000/api/generate', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!response.ok || result.status === 'error' || result.status === 'fail') {
                throw new Error(result.message || 'An error occurred during generation.');
            }

            // Render Output based on mode
            renderRealOutput(currentMode, result.data.generatedResults);

        } catch (error) {
            console.error('Error:', error);
            alert(`Failed to generate study material: ${error.message}`);
            emptyState.classList.remove('hidden');
        } finally {
            btnText.textContent = 'Generate Study Material';
            loader.classList.add('hidden');
            generateBtn.disabled = false;
        }
    });

    // --- Dynamic Data Rendering ---
    
    function renderRealOutput(mode, data) {
        if (mode === 'summary') {
            summaryContainer.classList.remove('hidden');
            // Check if marked.js is available
            if (typeof marked !== 'undefined' && data.summary) {
                document.getElementById('summaryContent').innerHTML = marked.parse(data.summary);
            } else {
                // Fallback if marked is missing or data structure is different
                document.getElementById('summaryContent').innerText = typeof data === 'string' ? data : data.summary;
            }
        } 
        else if (mode === 'flashcard') {
            flashcardContainer.classList.remove('hidden');
            setupFlashcards(data);
        }
        else if (mode === 'quiz') {
            quizContainer.classList.remove('hidden');
            setupQuiz(data);
        }
    }

    // Flashcard Logic
    function setupFlashcards(cardsArray) {
        const card = document.getElementById('flashcard');
        const nextBtn = document.getElementById('nextCard');
        const prevBtn = document.getElementById('prevCard');
        const counter = document.getElementById('cardCounter');
        
        if (!Array.isArray(cardsArray) || cardsArray.length === 0) {
            alert('No flashcards generated.');
            return;
        }

        let currentIndex = 0;

        function renderCard() {
            card.classList.remove('is-flipped'); // reset flip
            
            // wait for flip back animation before changing text
            setTimeout(() => {
                const currentCard = cardsArray[currentIndex];
                document.getElementById('fcQuestion').textContent = currentCard.question || 'N/A';
                document.getElementById('fcAnswer').textContent = currentCard.answer || 'N/A';
                document.getElementById('fcExplanation').textContent = currentCard.explanation || 'N/A';
                counter.textContent = `${currentIndex + 1} / ${cardsArray.length}`;
            }, 300);
        }

        // Flip interaction (remove previous listener to avoid duplicates if generated multiple times)
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        newCard.addEventListener('click', () => {
            newCard.classList.toggle('is-flipped');
        });

        const newNextBtn = nextBtn.cloneNode(true);
        const newPrevBtn = prevBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);

        newNextBtn.addEventListener('click', () => {
            if (currentIndex < cardsArray.length - 1) {
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
    function setupQuiz(questionsArray) {
        if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
            alert('No quiz questions generated.');
            return;
        }

        const activeView = document.getElementById('quizActiveView');
        const resultView = document.getElementById('quizResultView');
        const optionsGroup = document.getElementById('quizOptions');
        const submitBtn = document.getElementById('submitQuizBtn');
        const restartBtn = document.getElementById('restartQuizBtn');
        
        activeView.classList.remove('hidden');
        resultView.classList.add('hidden');

        let currentQIndex = 0;
        let userAnswers = [];

        function renderQuestion() {
            const q = questionsArray[currentQIndex];
            document.getElementById('quizProgress').textContent = `Question ${currentQIndex + 1} of ${questionsArray.length}`;
            document.getElementById('quizQuestion').textContent = q.question;
            
            optionsGroup.innerHTML = '';
            q.options.forEach((opt, index) => {
                const optId = `opt_${index}`;
                optionsGroup.innerHTML += `
                    <label class="option-label" for="${optId}">
                        <input type="radio" name="quiz_option" id="${optId}" value="${opt.replace(/"/g, '&quot;')}">
                        ${opt}
                    </label>
                `;
            });

            if (currentQIndex === questionsArray.length - 1) {
                submitBtn.textContent = 'Submit Quiz';
            } else {
                submitBtn.textContent = 'Next Question';
            }
        }

        // Remove old listeners
        const newSubmitBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

        newSubmitBtn.addEventListener('click', () => {
            const selected = document.querySelector('input[name="quiz_option"]:checked');
            if (!selected) {
                alert("Please select an answer");
                return;
            }

            // Save answer
            userAnswers[currentQIndex] = selected.value;

            if (currentQIndex < questionsArray.length - 1) {
                // Next question
                currentQIndex++;
                renderQuestion();
            } else {
                // Finish quiz
                showQuizResults();
            }
        });

        function showQuizResults() {
            activeView.classList.add('hidden');
            resultView.classList.remove('hidden');
            
            let score = 0;
            let feedbackHTML = '';

            questionsArray.forEach((q, i) => {
                const isCorrect = userAnswers[i] === q.correctAnswer;
                if (isCorrect) score++;

                feedbackHTML += `
                    <div class="feedback-item ${isCorrect ? 'correct' : 'incorrect'}">
                        <h4>Q${i + 1}: ${q.question}</h4>
                        <p>Your answer: ${userAnswers[i]}</p>
                        <p class="correct-ans">Correct answer: ${q.correctAnswer}</p>
                        <p class="exp">${q.explanation}</p>
                    </div>
                `;
            });

            document.getElementById('quizScore').textContent = `${score} / ${questionsArray.length}`;
            document.getElementById('quizFeedback').innerHTML = feedbackHTML;
        }

        // Restart listener
        const newRestartBtn = restartBtn.cloneNode(true);
        restartBtn.parentNode.replaceChild(newRestartBtn, restartBtn);
        
        newRestartBtn.addEventListener('click', () => {
            currentQIndex = 0;
            userAnswers = [];
            activeView.classList.remove('hidden');
            resultView.classList.add('hidden');
            renderQuestion();
        });

        // Init first question
        renderQuestion();
    }
});
