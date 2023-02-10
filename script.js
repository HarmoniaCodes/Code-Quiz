// define the DOM elements that we will work with
const quizArea = document.getElementById("quizArea");
const nextQButton = document.getElementById("nextQButton");
const buttonArea = document.getElementById("buttonArea");
const answerBtn = buttonArea.children;
const questionContent = document.getElementById("questionContent");
const highScoreList = document.getElementById("scoresList");

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
        // when the user clicks "submit quiz", the finishQuiz() function will be called
        nextQButton.addEventListener("click", function () { finishQuiz(); })
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



function finishQuiz() {
    nextQButton.remove();
    var userScore = 22;
    questionContent.innerText = "All done!";
    buttonArea.innerText = "Your final score is " + userScore + ". Enter your initials.";
    scoreButton = document.createElement("button")
    initialsForm = document.createElement("input");
    buttonArea.appendChild(initialsForm);
    buttonArea.appendChild(scoreButton);
    scoreButton.setAttribute("id", "submitScoreBtn");
    scoreButton.innerText = "Submit Score";
    scoreButton.addEventListener("click", function (event) { event.preventDefault(); saveHighScore(); console.log("user score submitted") });
    // nextQButton.innerText = "Submit Score";

}

function saveHighScore() {
    highScoreArray.push(userName + " - " + userScore);
}
// TODO: need to define what the user clicked
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



// save the user score to the highScoreArray when the submit score button is clicked.


document.getElementById("clearScores").addEventListener("click", function () { clearScores() });

function clearScores() {
    highScoreArray = [];
    highScoreList.innerHTML = "";
}

//event listener for scoreBoard Button
document.getElementById("displayScoreboard").addEventListener("click", function () { displayScores() });
//display each item in the array within a span item
function displayScores() {
    for (let i = 0; i < highScoreArray.length; i++) {
        var scoreEntry = document.createElement("span");
        var nameAndScore = document.createTextNode(highScoreArray[i]);
        highScoreList.appendChild(scoreEntry);
        scoreEntry.appendChild(nameAndScore);
    }
}