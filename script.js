// define the DOM elements that we will work with
const quizArea = document.getElementById("quizArea");
const nextQButton = document.getElementById("nextQButton");
const buttonArea = document.getElementById("buttonArea");
const answerBtn = buttonArea.children;
const questionContent = document.getElementById("questionContent");
const answerStatus = document.getElementById("answerStatus");
const timeLeftArea = document.getElementById("timeLeftArea");

// store each question as an object
const questionArray = [
    {
        startHeader: "Coding Quiz Challenge",
        startDesc: "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    },
    {
        question: "1. Commonly Used Data Types DO NOT Include:",
        a: "Strings",
        b: "booleans",
        c: "alerts",
        d: "numbers",
        correctAnswer: "c"
        // how will you identify the correct answer?
    },
    {
        question: "2. The condition in an if/else statement is enclosed with _____.",
        a: "quotes",
        b: "curly brackets",
        c: "parenthesis",
        d: "square brackets",
        correctAnswer: "c"
    },
    {
        question: "3. Arrays in Javascript can be used to store:",
        a: "numbers and strings",
        b: "other arrays",
        c: "booleans",
        d: "all of the above",
        correctAnswer: "d"
    },
    {
        question: "4. String values must be closed within _____ when being assigned to variables.",
        a: "Commas",
        b: "Curly Brackets",
        c: "Quotes",
        d: "Parenthesis",
        correctAnswer: "c"
    },
    {
        question: "5. A very useful tool used during development and debugging for printing content to the debugger is:",
        a: "Javascript",
        b: "Terminal/Bash",
        c: "For loops",
        d: "console.log",
        correctAnswer: "d"
    }
];

// show the default message on page load
function defaultMessage() {
    questionContent.innerText = questionArray[0].startHeader;
    buttonArea.innerText = questionArray[0].startDesc;
}
defaultMessage();

// then set the current question to 1
var currentQuestion = 0;

// create timer for quiz
var timeLeft = 75;
var countdown = setInterval(function () {
    timeLeft--;
    timeLeftArea.innerText = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(countdown);
    }
    return timeLeft;
}, 1000);


// add event listener to the nextQButton element
nextQButton.addEventListener("click", function () { currentQuestion++; loadQuestion() });
// load quiz elements when loadQuestion() is called
function loadQuestion() {
    // console.log(currentQuestion);
    // console.log("correct answer: " + questionArray[currentQuestion].correctAnswer);
    if (currentQuestion < 6 ? createQuizButtons() : createScoreEntry());

    questionContent.innerText = questionArray[currentQuestion].question;
    answerBtn[0].innerText = questionArray[currentQuestion].a;
    answerBtn[1].innerText = questionArray[currentQuestion].b;
    answerBtn[2].innerText = questionArray[currentQuestion].c;
    answerBtn[3].innerText = questionArray[currentQuestion].d;
    validateAnswer();

    if (currentQuestion == 5 ? nextQButton.innerText = "Submit Quiz" : nextQButton.innerText = "Next Question");
}

function createQuizButtons() {
    // load answer buttons and listeners
    buttonArea.innerText = "";
    const mkBtn1 = document.createElement("button");
    const mkBtn2 = document.createElement("button");
    const mkBtn3 = document.createElement("button");
    const mkBtn4 = document.createElement("button");
    buttonArea.appendChild(mkBtn1);
    mkBtn1.setAttribute("id", "a");
    buttonArea.appendChild(mkBtn2);
    mkBtn2.setAttribute("id", "b");
    buttonArea.appendChild(mkBtn3);
    mkBtn3.setAttribute("id", "c");
    buttonArea.appendChild(mkBtn4);
    mkBtn4.setAttribute("id", "d");
}

function validateAnswer() {
    buttonArea.addEventListener("click", function (event) {
        const userAnswer = event.target;
        if (userAnswer.id === questionArray[currentQuestion].correctAnswer) {
            console.log("Correct answer clicked")
            answerStatus.innerText = "Correct!";
        } else {
            console.log("incorrect answer clicked")
            answerStatus.innerText = "Wrong!";
            timeLeft = (timeLeft - 10);
        }
    })
}


// save high scores
var highScoreArray = [];
var userScore = timeLeft;


// remove quiz elements, create the "save high score" screen
function createScoreEntry() {
    nextQButton.remove();
    questionContent.innerText = "All done!";
    buttonArea.innerText = "Your final score is " + userScore + ". Enter your initials.";
    scoreButton = document.createElement("button")
    initialsForm = document.createElement("input");
    buttonArea.appendChild(initialsForm);
    initialsForm.setAttribute("id", "initialsForm");
    buttonArea.appendChild(scoreButton);
    scoreButton.setAttribute("id", "submitScoreBtn");
    scoreButton.innerText = "Submit Score";
    scoreButton.addEventListener("click", function (event) { event.preventDefault(); saveHighScore(); });
}
// push user initials and score into the highScoreArray
// TODO : Save this array in local storage so that it is not deleted on reload
function saveHighScore() {
    highScoreArray.push(initialsForm.value + " - " + userScore);
    displayScores();
}

//display each item in the array within a span item
function displayScores() {
    if (highScoreArray.length === 0) {
        alert("No high scores yet! Play a game first.")
    } else {
        buttonArea.innerHTML = "";
        questionContent.innerText = "High Scores";
        const highScoreList = document.createElement("section");
        highScoreList.setAttribute("id", "highScoreList");
        quizArea.appendChild(highScoreList);
        //remove score submission elements
        initialsForm.remove();
        scoreButton.remove();
        // create high score page elements

        // BUG - high score page is created each time "view high scores" page is clicked
        // need to check if it already exists
        for (let i = 0; i < highScoreArray.length; i++) {
            var scoreEntry = document.createElement("span");
            var nameAndScore = document.createTextNode(highScoreArray[i]);
            highScoreList.appendChild(scoreEntry);
            scoreEntry.appendChild(nameAndScore);
        }
        const restartBtn = document.createElement("button");
        quizArea.appendChild(restartBtn);
        restartBtn.innerText = "Play Again";
        restartBtn.addEventListener("click", function () { location.reload(); });
        const clearScoresBtn = document.createElement("button");
        quizArea.appendChild(clearScoresBtn);
        clearScoresBtn.innerText = "Clear High Scores";
        clearScoresBtn.addEventListener("click", function () { clearScores(); });
    }
}
function clearScores() {
    var highScoreList = document.getElementById("highScoreList");
    highScoreArray = [];
    highScoreList.textContent = "";
    console.log("Cleared Scores");
}

// Things to do when the user submits their quiz:
// Save their score (to local storage?)
// Ask the user to input their initials
// Save their score and initials to an array array.push(userName + " - " + userScore)
// display their score on a high score board
// clear high scores when clear button is clicked


