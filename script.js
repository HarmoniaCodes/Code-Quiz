// define the DOM elements that we will work with
const quizArea = document.getElementById("quizArea");
const nextQButton = document.getElementById("nextQButton");
const buttonArea = document.getElementById("buttonArea");
const answerBtn = buttonArea.children;
const questionContent = document.getElementById("questionContent");


nextQButton.addEventListener("click", function () { loadQuestion() });
// store each question as an object
const questionArray = [
    {
        startHeader: "Coding Quiz Challenge",
        startDesc: "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    },
    {
        question: "Commonly Used Data Types DO NOT Include:",
        answer1: "Strings",
        answer2: "booleans",
        answer3: "alerts",
        answer4: "numbers",
        correctAnswer: 2
        // how will you identify the correct answer?
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        answer1: "quotes",
        answer2: "curly brackets",
        answer3: "parenthesis",
        answer4: "square brackets",
        correctAnswer: 3
    },
    {
        question: "Arrays in Javascript can be used to store:",
        answer1: "numbers and strings",
        answer2: "other arrays",
        answer3: "booleans",
        answer4: "all of the above",
        correctAnswer: 4
    },
    {
        question: "String values must be closed within _____ when being assigned to variables.",
        answer1: "Commas",
        answer2: "Curly Brackets",
        answer3: "Quotes",
        answer4: "Parenthesis",
        correctAnswer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "Javascript",
        answer2: "Terminal/Bash",
        answer3: "For loops",
        answer4: "console.log",
        correctAnswer: 4
    }
];

function defaultMessage() {
    questionContent.innerText = questionArray[0].startHeader;
    buttonArea.innerText = questionArray[0].startDesc;
}
defaultMessage();

var currentQuestion = 1;

function loadQuestion() {
    if (currentQuestion === 1) {
        buttonArea.innerText = "";
        buttonArea.appendChild(document.createElement("button"));
        buttonArea.appendChild(document.createElement("button"));
        buttonArea.appendChild(document.createElement("button"));
        buttonArea.appendChild(document.createElement("button"));
        answerListener();
    }

    questionContent.innerText = questionArray[currentQuestion].question;
    answerBtn[0].innerText = questionArray[currentQuestion].answer1;
    answerBtn[1].innerText = questionArray[currentQuestion].answer2;
    answerBtn[2].innerText = questionArray[currentQuestion].answer3;
    answerBtn[3].innerText = questionArray[currentQuestion].answer4;
    currentQuestion++;
    if (questionArray[currentQuestion] == undefined) {
        nextQButton.innerText = "Submit Quiz";
        // when the user clicks "submit quiz", the createScoreEntry() function will be called
        nextQButton.addEventListener("click", function () { createScoreEntry(); })
    } else {
        nextQButton.innerText = "Next Question"
    }
}

// check if the user picked the correct answer:
function answerListener() {
    answerBtn[0].addEventListener("click", function () { console.log("clicked 1st answer") })
    answerBtn[1].addEventListener("click", function () { console.log("clicked 2nd answer") })
    answerBtn[2].addEventListener("click", function () { console.log("clicked 3rd answer") })
    answerBtn[3].addEventListener("click", function () { console.log("clicked 4th answer") })
}

// save high scores
var highScoreArray = [];
var userName = "Test"
var userScore = 22;


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
// TODO: add correct answers as integers referring to their index ex: correctAnswer: 1,
// if (userAnswerClicked === questionArray[i].correctAnswer) {
//     addPoints();
// } else {
//     wrongAnswer();
// }

// // TODO: implement addPoints() and wrongAnswer() functions
// function addPoints() {
//     //do something
// }
// function wrongAnswer() {
//     // do something else
// }

// Things to do when the user submits their quiz:
// Save their score (to local storage?)
// Ask the user to input their initials
// Save their score and initials to an array array.push(userName + " - " + userScore)
// display their score on a high score board
// clear high scores when clear button is clicked
