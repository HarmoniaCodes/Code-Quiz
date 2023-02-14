// define the DOM elements that we will work with
const quizArea = document.getElementById("quizArea");
const nextQButton = document.getElementById("nextQButton");
const buttonArea = document.getElementById("buttonArea");
const answerBtn = buttonArea.children;
const questionContent = document.getElementById("questionContent");
const answerStatus = document.getElementById("answerStatus");
const timeLeftArea = document.getElementById("timeLeftArea");
// create an array to store the high scores in local storage.
// if it doesn't exist, create empty array
const highScoreArray = JSON.parse(localStorage.getItem("highScores")) || [];

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

// set currentQuestion = 0 to load default message
var currentQuestion = 0;

// create timer for quiz
var timeLeft;
function startTimer() {
    console.log("starting timer")
    timeLeft = 75;
    var countdown = setInterval(function () {
        timeLeft--;
        timeLeftArea.innerText = timeLeft;
        if (currentQuestion > 5) {
            clearInterval(countdown);
        } else if (document.getElementById("highScoreList") !== null) { clearInterval(countdown); timeLeftArea.innerText = "" }
        else if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time's up! You failed the quiz. Try again!")
            window.location.reload();
        }
    }, 1000);
}


// add event listener to the nextQButton element
nextQButton.addEventListener("click", function () { startQuiz() });
// add listener for correct/incorrect answer
answerBtn.addEventListener("click", validateAnswer());

// if the user starts the first question, start the timer
// otherwise, load next question
function startQuiz() {
    nextQButton.remove();
    if (currentQuestion === 0) { startTimer(); currentQuestion++; loadQuestion() }
    else { currentQuestion++; loadQuestion() }
}
// load the current question
function loadQuestion() {
    if (currentQuestion < 6 ? createQuizButtons() : createScoreEntry());
    if (currentQuestion < 6) {
        questionContent.innerText = questionArray[currentQuestion].question;
        answerBtn[0].innerText = questionArray[currentQuestion].a;
        answerBtn[1].innerText = questionArray[currentQuestion].b;
        answerBtn[2].innerText = questionArray[currentQuestion].c;
        answerBtn[3].innerText = questionArray[currentQuestion].d;
    }
}
// create the quiz answer buttons
function createQuizButtons() {
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

//check if the user answered correctly
function validateAnswer() {
    buttonArea.addEventListener("click", function (event) {
        const userAnswer = event.target;
        if (userAnswer.type === "submit" && currentQuestion < 6 && userAnswer.id === questionArray[currentQuestion].correctAnswer) {
            console.log("Correct answer clicked")
            answerStatus.innerText = "Correct!";
            currentQuestion++;
            loadQuestion();
        } else if (userAnswer.type === "submit" && currentQuestion < 6 && userAnswer.id !== questionArray[currentQuestion].correctAnswer) {
            document.getElementById(userAnswer.id).style.backgroundColor = "red";
            console.log("incorrect answer clicked")
            answerStatus.innerText = "Wrong! -10 points.";
            timeLeft = (timeLeft - 10);
        }
    })
}

// remove quiz elements, create the "save high score" screen
function createScoreEntry() {
    timeLeftArea.remove();
    nextQButton.remove();
    questionContent.innerText = "All done!";
    buttonArea.innerText = "Your final score is " + (timeLeft - 1) + ". Enter your initials.";
    scoreButton = document.createElement("button")
    initialsForm = document.createElement("input");
    buttonArea.appendChild(initialsForm);
    initialsForm.setAttribute("id", "initialsForm");
    buttonArea.appendChild(scoreButton);
    scoreButton.setAttribute("id", "submitScoreBtn");
    scoreButton.innerText = "Submit Score";
    scoreButton.addEventListener("click", function (event) { event.preventDefault(); saveHighScore(); });
}
// push user name entry and score into the highScoreArray
function saveHighScore() {
    console.log("a high score was saved");
    scoreboardEntry = {
        username: initialsForm.value.trim(),
        userscore: timeLeft
    }
    console.log(scoreboardEntry);
    highScoreArray.push(scoreboardEntry);
    localStorage.setItem("highScores", JSON.stringify(highScoreArray));
    displayScores();
}

// set up high scores page
function displayScores() {
    // if ( && document.getElementById("nextQButton") !== null) {
    //     nextQButton.remove();
    // }
    if (document.getElementById("highScoreList") == null && localStorage.getItem("highScores") === null) {
        alert("No high scores yet! Play a game first.")
    } else if (document.getElementById("highScoreList") == null) {
        // create high score page elements
        buttonArea.innerHTML = "";
        questionContent.innerText = "High Scores";
        const highScoreList = document.createElement("section");
        highScoreList.setAttribute("id", "highScoreList");
        quizArea.appendChild(highScoreList);
        //remove score submission elements
        if (document.getElementById("initialsForm") !== null) {
            initialsForm.remove();
            scoreButton.remove();
        } else { console.log("displaying high scores"); nextQButton.remove(); }


        // loop through all entries and create a span element for them
        // then place the highscoreList entry inside of the span
        for (let i = 0; i < highScoreArray.length; i++) {
            var scoreEntry = document.createElement("span");
            var nameAndScore = document.createTextNode(JSON.stringify(highScoreArray[i].username) + "-" + JSON.stringify(highScoreArray[i].userscore));
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
    } else {
        console.log("already viewing high scores")
    }
}
// clear the high score list
function clearScores() {
    localStorage.clear("highscoreList");
    alert("Cleared Scores");
    window.location.reload();
}

