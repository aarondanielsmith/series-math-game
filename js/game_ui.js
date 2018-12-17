/***** UI variable declarations *****/

var startValue = document.getElementById("start-value");
var btnStart = document.getElementById("start-button");
var btnStep = document.getElementById("step");
var btnAnswer = document.getElementById("user-answer-button");
var btnReset = document.getElementById("reset");
var displayOperation = document.getElementById("currentOperation");
var userAnswer = document.getElementById("user-answer-text");
var divStart = document.getElementById("start");
var divGame = document.getElementById("game");
var divDisplay = document.getElementById("display");
var divInput = document.getElementById("user-input");
var divSettings = document.getElementById("settings");
var winCounter = document.getElementById("win-counter");
var loseCounter = document.getElementById("lose-counter");

/***** Event Listeners *****/

startValue.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        btnStart.click();
    }	
});

userAnswer.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        btnAnswer.click();
    }
});

/***** Game Play *****/

function setStartValueFocus() {
	startValue.focus();
}

function setUserAnswerFocus() {
	userAnswer.focus();
}

function showStart() {
	divStart.style.display = "block";
	divGame.style.display = "none";
	divSettings.style.display = "none"
	setStartValueFocus();
}

function showGame() {
	divStart.style.display = "none";
	divSettings.style.display = "none";	
	divGame.style.display = "block";
}

function showAnswerInput(delay) {
	if (isNaN(delay)) {
		delay = 0;
	}

	setTimeout(function() {divInput.style.display = "block";}, delay);
}

function hideAnswerInput() {
	divInput.style.display = "none";
}

function updateUI(gameState) {
	// if the game has started

	switch (gameState) {
		case 0: // game reset
			resetUI();
			break;
		case 1: // doing operations
			updateDisplay();
			break;
		case 2: // waiting for answer
			updateDisplay();
			showAnswerInput(gameSettings.speed);
			setUserAnswerFocus();
			break;
		default:
			break;
	};
}

function updateDisplay() {
	displayOperation.innerHTML = series.history[series.history.length - 1];
	displayOperation.style.color = getDisplayColor(series.lastOperation.type);
	var clearDisplayTime = gameSettings.speed - gameSettings.blankOutInterval;
	setTimeout(function(){clearDisplay()}, clearDisplayTime);
}

function clearDisplay() {
	displayOperation.innerHTML = "";
}

function getDisplayColor(operationType) {
	return gameSettings.displayColors[operationType]
}

function resetUI() {
	clearDisplay();
	updateScores();
	startValue.value = "";
	userAnswer.value = "";
	hideAnswerInput();
	showStart();
}

setStartValueFocus();

/***** Settings Page *****/

function showSettings() {
	// load control values
	switch (gameSettings.speed) {
		case 1000:
			document.getElementById("stg-hare").checked = true;
			break;
		case 3000:
			document.getElementById("stg-tortoise").checked = true;
			break;
		case 5000:
			document.getElementById("stg-sloth").checked = true;
			break;
		default:
			break;
	}
	document.getElementById("stg-steps").value = gameSettings.numberOfSteps;

	// show page
	divGame.style.display = "none";
	divStart.style.display = "none";
	divSettings.style.display = "block";
}

function updateScores() {
	winCounter.innerHTML = winCount;
	loseCounter.innerHTML = loseCount;
}


















