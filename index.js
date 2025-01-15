 var score= 0;
 let timerInterval; // Variable to store the timer interval
let elapsedTime = 0; // Variable to track elapsed time
const questionsData = [
    {
        question: "5 + 2 = x?",
        answers: ["6", "7", "8"], // Second is correct
        correctIndex: 1, // Correct answer is 7
    },
    {
        question: "9 - 3 = x?",
        answers: ["5", "6", "7"], // Second is correct
        correctIndex: 1, // Correct answer is 6
    },
    {
        question: "6 x 2 = x?",
        answers: ["10", "12", "14"], // Second is correct
        correctIndex: 1, // Correct answer is 12
    },
    {
        question: "8 ÷ 2 = x?",
        answers: ["4", "6", "8"], // First is correct
        correctIndex: 0, // Correct answer is 4
    },
    {
        question: "7 + 5 = x?",
        answers: ["11", "12", "13"], // Second is correct
        correctIndex: 1, // Correct answer is 12
    },
    {
        question: "15 - 4 = x?",
        answers: ["10", "11", "12"], // Second is correct
        correctIndex: 1, // Correct answer is 11
    },
    {
        question: "4 x 4 = x?",
        answers: ["12", "16", "18"], // Second is correct
        correctIndex: 1, // Correct answer is 16
    },
    {
        question: "18 ÷ 3 = x?",
        answers: ["5", "6", "7"], // Second is correct
        correctIndex: 1, // Correct answer is 6
    },
    {
        question: "20 + 5 = x?",
        answers: ["24", "25", "26"], // Second is correct
        correctIndex: 1, // Correct answer is 25
    },
    {
        question: "30 - 10 = x?",
        answers: ["18", "20", "22"], // Second is correct
        correctIndex: 1, // Correct answer is 20
    },
    {
        question: "3 x 5 = x?",
        answers: ["15", "10", "20"], // First is correct
        correctIndex: 0, // Correct answer is 15
    },
    {
        question: "36 ÷ 6 = x?",
        answers: ["5", "6", "7"], // Second is correct
        correctIndex: 1, // Correct answer is 6
    },
    {
        question: "10 + 8 = x?",
        answers: ["16", "18", "20"], // Second is correct
        correctIndex: 1, // Correct answer is 18
    },
    {
        question: "25 - 10 = x?",
        answers: ["14", "15", "16"], // Second is correct
        correctIndex: 1, // Correct answer is 15
    },
    {
        question: "5 x 6 = x?",
        answers: ["25", "30", "35"], // Second is correct
        correctIndex: 1, // Correct answer is 30
    },
    {
        question: "42 ÷ 7 = x?",
        answers: ["6", "7", "8"], // First is correct
        correctIndex: 0, // Correct answer is 6
    },
    {
        question: "11 + 9 = x?",
        answers: ["18", "19", "20"], // Second is correct
        correctIndex: 1, // Correct answer is 20
    },
    {
        question: "50 - 25 = x?",
        answers: ["20", "25", "30"], // Second is correct
        correctIndex: 1, // Correct answer is 25
    },
    {
        question: "8 x 3 = x?",
        answers: ["21", "22", "24"], // Third is correct
        correctIndex: 2, // Correct answer is 24
    },
    {
        question: "48 ÷ 8 = x?",
        answers: ["5", "6", "7"], // Second is correct
        correctIndex: 1, // Correct answer is 6
    }
];
// Initialize the current question index
let currentQuestionIndex = 0;
// Get DOM elements
const timerElement = document.getElementById("timer");
const questionElement = document.querySelector(".Questions");
const optionButtons = [document.getElementById("ans1"), document.getElementById("ans2"), document.getElementById("ans3")];
const feedbackMessage = document.getElementById("options");
const playButton = document.getElementById("play");
const stats = document.getElementById("stats");
const restart = document.getElementById("restart");
// Function to load a question and answers
function loadQuestion(index) {
    const questionData = questionsData[index];
    questionElement.textContent = questionData.question; // Set question text

    // Assign answer texts and set their click behavior
    optionButtons.forEach((button, i) => {
        button.textContent = questionData.answers[i]; // Set answer text
        button.onclick = () => handleAnswer(i, questionData.correctIndex); // Handle click
    });
}
// Function to handle the answer click event
function handleAnswer(selectedIndex, correctIndex) { 
    if (selectedIndex === correctIndex) {
        // Correct answer: Increment score and move to next question
        score++;
        currentQuestionIndex++;
        // Check if we've reached the end of the questions
        if (currentQuestionIndex >= questionsData.length) {
            currentQuestionIndex = 0; // Optionally restart the game
            showGameOver(); // Show the game over screen
        } else {
            loadQuestion(currentQuestionIndex);
        }
    } else {
        // Wrong answer: Show feedback and stay on the same question
        document.querySelectorAll("button:not(#timer), .Questions").forEach(el => el.style.display = "none");
        feedbackMessage.style.display = "block"; // Show feedback
    }
    document.getElementById("score").textContent = `Score: ${score}`;
}
function startTimer() {
    elapsedTime = 0; // Reset elapsed time
    timerElement.textContent = `Time: ${elapsedTime}s`; // Reset display
    // Start the timer interval
    timerInterval = setInterval(() => {
        elapsedTime++; // Increment time
        timerElement.textContent = `Time: ${elapsedTime}s`; // Update display
    }, 1000); // Update every second
}
// Start the game when "Play" button is clicked
playButton.onclick = function () {
    playButton.style.display = "none"; // Hide the play button
    questionElement.style.display = "block"; // Show the question
    optionButtons.forEach(button => (button.style.display = "inline-block")); // Show answer buttons
    loadQuestion(currentQuestionIndex); // Load the first question
    startTimer();
};
// Stop the timer
function stopTimer() {
    clearInterval(timerInterval); // Stop the interval
}
timerElement.onclick = function () {
    stopTimer();
};
// Hide feedback message and show the Next question and buttons 
document.getElementById("feedback").onclick = function () {
    feedbackMessage.style.display = "none"; // Hide feedback
    questionElement.style.display = "block"; // Show the question
    optionButtons.forEach(button => (button.style.display = "inline-block")); // Show buttons again
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex >= questionsData.length) {
        currentQuestionIndex = 0; // If at the end, restart to the first question
    }
    loadQuestion(currentQuestionIndex); // Load the next question
};
// Stop the game and show stats when "End" button is clicked
document.getElementById("stop").onclick = function () {
    stopTimer(); // Stop the timer
    questionElement.style.display = "none"; // Hide the question
    optionButtons.forEach(button => (button.style.display = "none")); // Hide answer buttons
    feedbackMessage.style.display = "none"; // Hide feedback
    stats.style.display = "block"; // Show stats
    restart.style.display="block";//show restart button
    // Display final score
    document.getElementById("final-score").textContent = `Your Final Score: ${score} points`;
};
// Function to show the game over screen
function showGameOver() {
    stopTimer(); // Stop the timer
    questionElement.style.display = "none"; // Hide the question
    optionButtons.forEach(button => (button.style.display = "none")); // Hide answer buttons
    feedbackMessage.style.display = "none"; // Hide feedback
    stats.style.display = "block"; // Show stats
    restart.style.display="block";//show restart button
    // Display the final score
    document.getElementById("final-score").textContent = `Your Final Score: ${score} points`;
}
// When "Restart" button is clicked
document.getElementById("restart").onclick = function () {
    // Hide the Restart button when the game is restarted
    document.getElementById("restart").style.display = "none";
    // Reset score and update the score display
    score = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
    // Reset timer and start again
    startTimer(); // Restart the timer
    // Hide stats and show the game view again
    stats.style.display = "none"; // Hide stats
    questionElement.style.display = "block"; // Show the question container
    optionButtons.forEach(button => (button.style.display = "inline-block")); // Show the answer buttons
    // Reset question index to start from the first question
    currentQuestionIndex = 0;
    loadQuestion(currentQuestionIndex); // Load the first question
};
// When the "End" button is clicked (Game Over)
document.getElementById("stop").onclick = function () {
    stopTimer(); // Stop the timer
    questionElement.style.display = "none"; // Hide the question
    optionButtons.forEach(button => (button.style.display = "none")); // Hide answer buttons
    feedbackMessage.style.display = "none"; // Hide feedback
    stats.style.display = "block"; // Show stats
    // Display final score
    document.getElementById("final-score").textContent = `Your Final Score: ${score} points`;
    // Show the Restart button when game is over
    document.getElementById("restart").style.display = "inline-block"; // Show restart button
};