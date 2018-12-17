var series = {
	value: 0,
	currentStep: 0,
	totalSteps: 0,
	lastOperation: {
		type: "start",
		value: null,
	},
	history: [],
	timer: 0,
	gameState: 0,
	operations: {
		add: function() {
			var change = getRandomNumber(gameSettings.addMin, gameSettings.addMax);
			return change;
		},
		subtract: function() {
			var change = getRandomNumber(gameSettings.subMin, gameSettings.subMax);
			return change;
		},		
	},
	startTimer: function() {
		this.timer = setInterval(function(){series.step();}, gameSettings.speed);
		this.gameState = 1;
	},
	stopTimer: function() {
		clearInterval(this.timer);
		this.gameState = 2;
	},
	step: function() {
		var thisOperation = chooseOperation(series.operations);
		var changeString = "";

		// increment step counter
		this.currentStep += 1;
		// randomly select and do math operation
		switch (thisOperation) {
			case "add":
				var change = this.operations.add();
				changeString += "+";
				break;
			case "subtract":
				var change = -1 * this.operations.subtract();
				break;
			default:
				break;
		};
		this.value += change;
		changeString += change;
		this.lastOperation.type = thisOperation;
		this.lastOperation.value = change;
		this.history.push(changeString);
		// if the total number of steps has been reached, stop the timer
		if (this.currentStep >= this.totalSteps) {
			this.stopTimer();
		};
		// refresh the UI
		updateUI(this.gameState);
	},
	reset: function() {
		this.value = 0;
		this.currentStep = 0;
		this.totalSteps = 0;
		this.lastOperation = {type: "start", value: null};
		this.history = [];
		this.stopTimer();
		this.gameState = 0;
	}
}
