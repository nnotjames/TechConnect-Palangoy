const questions = [
    { q: "Which part of the computer is the 'Brain'?", options: ["Monitor", "CPU", "Keyboard", "Mouse"], correct: 1 },
    { q: "What does 'WWW' stand for?", options: ["World Wide Web", "Web World Wide", "Wireless Web"], correct: 0 },
    { q: "Which of these is an input device?", options: ["Printer", "Monitor", "Scanner", "Speaker"], correct: 2 },
    { q: "It is a temporary storage used by the computer.", options: ["Hard Drive", "RAM", "CPU", "USB Flash Drive"], correct: 1 }
];

let currentIdx = 0;
let lives = 3;
let score = 0;
let selectedIdx = null;

// Select Elements
const qText = document.getElementById('questionText');
const grid = document.getElementById('optionsGrid');
const checkBtn = document.getElementById('checkBtn');
const progressFill = document.getElementById('progressFill');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const feedback = document.getElementById('feedbackContainer');
const feedbackBox = document.getElementById('feedbackBox');
const statusIcon = document.getElementById('statusIcon');
const statusTitle = document.getElementById('statusTitle');
const statusMsg = document.getElementById('statusMsg');
const nextBtn = document.getElementById('nextBtn');

function loadQuestion() {
    selectedIdx = null;
    checkBtn.disabled = true;
    feedback.classList.remove('active');
    
    const current = questions[currentIdx];
    qText.innerText = current.q;
    grid.innerHTML = '';

    current.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            selectedIdx = i;
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            checkBtn.disabled = false;
        };
        grid.appendChild(btn);
    });
    updateProgress();
}

function updateProgress() {
    progressFill.style.width = (currentIdx / questions.length) * 100 + "%";
}

checkBtn.onclick = () => {
    const isCorrect = selectedIdx === questions[currentIdx].correct;
    feedback.classList.add('active');
    
    if (isCorrect) {
        score += 15;
        scoreDisplay.innerText = score;
        feedbackBox.className = 'feedback-content correct-bg';
        statusIcon.className = 'bx bxs-check-circle';
        statusTitle.innerText = "Correct! 🌟";
        statusMsg.innerText = "+15 XP earned!";
    } else {
        lives--;
        livesDisplay.innerText = lives;
        feedbackBox.className = 'feedback-content wrong-bg';
        statusIcon.className = 'bx bxs-x-circle';
        statusTitle.innerText = "Try Again!";
        statusMsg.innerText = `The answer was: ${questions[currentIdx].options[questions[currentIdx].correct]}`;
    }
};

nextBtn.onclick = () => {
    if (lives <= 0) {
        alert("Game Over! Keep practicing your ICT skills!");
        location.reload();
        return;
    }

    const wasCorrect = feedbackBox.classList.contains('correct-bg');
    if (wasCorrect) currentIdx++;

    if (currentIdx >= questions.length) {
        progressFill.style.width = "100%";
        alert(`Training Complete! Final Score: ${score} XP. Keep up the great work for Palangoy!`);
        window.location.href = "TestDashboard.html";
    } else {
        loadQuestion();
    }
};

loadQuestion();