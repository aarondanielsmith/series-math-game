/******** Global Vars ********/

winCount = 0;
loseCount = 0;

/******** Game Flow ********/

function startGame() {	
	numberToStart = parseInt(startValue.value)
	if (isNaN(numberToStart)) {
		alert("Please enter a valid number.");
		resetGame();
	} else {
		series.value = numberToStart;
		series.totalSteps = gameSettings.numberOfSteps;
		series.history.push(series.value);
		updateDisplay();
		showGame();
		series.startTimer();
	}
}

function submitAnswer() {
	var userAns = userAnswer.value;
	if (isCorrectGuess(userAns)) {
		doCorrectAnswerResponse(userAns);
		winCount += 1;
	} else {
		doIncorrectAnswerResponse(userAns);
		loseCount += 1;
	};
	resetGame();
}


function resetGame() {
	series.reset();
	resetUI();
}

/******** Support Functions ********/

function chooseOperation(operationsObj) {
	var operationsList = []
	var selectedKey;

	for (var op in operationsObj) {
		operationsList.push(op);
	}

	selectedKey = Math.floor(Math.random() * operationsList.length);
	return operationsList[selectedKey];
}

function isCorrectGuess(guess) {
	if (parseInt(guess) === series.value) {
		return true;
	} else {
		return false;
	}
}

function doCorrectAnswerResponse(answer) {
	alert("You got it right!");
}

function doIncorrectAnswerResponse(answer) {
	alert("Sorry, wrong answer! You guessed " + answer + ", but the correct answer was " + series.value + ". ");
}

function getRandomNumber(min, max) {
	var range = max - min + 1;

	randomNumber = Math.floor(Math.random() * range) + min;
	return randomNumber;
}

/***** Game Settings *****/

settingsXHR = new XMLHttpRequest();

function saveSettings(speed, steps) {
	if (document.getElementById("stg-hare").checked === true) {
		gameSettings.speed = 1000;
	} else if (document.getElementById("stg-tortoise").checked === true) {
		gameSettings.speed = 3000;
	} else if (document.getElementById("stg-sloth").checked === true) {
		gameSettings.speed = 5000;
	}
	if (isNaN(document.getElementById('stg-steps').value) === false) {
		gameSettings.numberOfSteps = document.getElementById('stg-steps').value;
	} else {
		alert("Please enter a valid number.");
		document.getElementById('stg-steps').focus();
		return false;
	}
	showStart();
	return true;
}