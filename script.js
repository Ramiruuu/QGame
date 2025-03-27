const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "What is the capital of France?",
        options: ["Florida", "Paris", "London", "Berlin"],
        answer: "Paris"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const timeEl = document.getElementById("time");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    currentQuestion.options.forEach(option => {
        const div = document.createElement("div");
        div.textContent = option;
        div.classList.add("option");
        div.addEventListener("click", () => selectOption(option));
        optionsEl.appendChild(div);
    });
}

function resetState() {
    nextBtn.classList.add("hidden");
    while (optionsEl.firstChild) {
        optionsEl.removeChild(optionsEl.firstChild);
    }
}

function selectOption(selected) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = optionsEl.children;
    for (let option of options) {
        option.style.pointerEvents = "none";
        if (option.textContent === currentQuestion.answer) {
            option.classList.add("correct");
        } else if (option.textContent === selected) {
            option.classList.add("wrong");
        }
    }
    if (selected === currentQuestion.answer) score++;
    nextBtn.classList.remove("hidden");
}

function startTimer() {
    clearInterval(timer);
    timeEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    clearInterval(timer);
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreEl.textContent = `You scored ${score} out of ${questions.length}!`;
}

restartBtn.addEventListener("click", () => {
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    startQuiz();
});

// Start the quiz on page load
startQuiz();