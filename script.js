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
        answer4: "numbers"
        // how will you identify the correct answer?
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        answer1: "quotes",
        answer2: "curly brackets",
        answer3: "parenthesis",
        answer4: "square brackets"
    },
    {
        question: "Arrays in Javascript can be used to store:",
        answer1: "numbers and strings",
        answer2: "other arrays",
        answer3: "booleans",
        answer4: "all of the above"
    },
    {
        question: "String values must be closed within _____ when being assigned to variables.",
        answer1: "Commas",
        answer2: "Curly Brackets",
        answer3: "Quotes",
        answer4: "Parenthesis"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "Javascript",
        answer2: "Terminal/Bash",
        answer3: "For loops",
        answer4: "console.log"
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
    }

    questionContent.innerText = questionArray[currentQuestion].question;
    answerBtn[0].innerText = questionArray[currentQuestion].answer1;
    answerBtn[1].innerText = questionArray[currentQuestion].answer2;
    answerBtn[2].innerText = questionArray[currentQuestion].answer3;
    answerBtn[3].innerText = questionArray[currentQuestion].answer4;
    currentQuestion++;
    if (questionArray[currentQuestion] == undefined) {
        nextQButton.innerText = "Submit Quiz";
    } else {
        nextQButton.innerText = "Next Question"
    }
}

//check question number and change submit button text
