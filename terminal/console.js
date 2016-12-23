var Console = function (div, width, height) {
	if (width == null)
		width = 500;
	if (height == null)
		height = 300;

	/* Variables */
	var self = this;//Must be used when scope is changed

	this.fontSize = 12;
	this.consoleWidth = width;
	this.consoleHeight = height;

	this.caretPosition = 0;
	this.caretBlink = false;
	this.caretTicks = 1;
	this.caretBlinkTime = 16;

	this.commandHistory = new Array();
	this.currentCommand = "";
	this.commandPosition = 0;
	this.commandHandlers = new Array();

	/* Used Variable */
	this.callback = null;
	/* Styling */
	this.outputForgroundColor = 0xffffff;
	this.outputBackgroundColor = 0x000000;
	this.caretColor = 0x32ff32;

	/* Methods */
	this.resetOutputColors = function() {
		self.outputBackgroundColor = 0x000000;
		self.outputForgroundColor = 0xffffff;
	}

	this.setOutputColors = function(backgroundColor, forgroundColor) {
		self.outputBackgroundColor = backgroundColor;
		self.outputForgroundColor = forgroundColor;
	}

	this.setCaretColor = function(caretColor) {
		self.caretColor = caretColor;
	}

	this.setCallback = function(callback) {
		self.callback = callback;
	}

	this.pushNewLine = function() {
		$(".console-input-container").before("<br>");
	}

	this.pushOutput = function(output) {
		styles = "color: " + self.outputForgroundColor.toString(16) + "; background-color: " + self.outputBackgroundColor.toString(16) + ";"
		$(".console-input-container").before("<span style=\"" + styles + "\">" + output + "</span>");
		scrollToBottom();
	}

	var pushInput = function(input) {
		console.log("'" + input + "' was pushed.");
		clearInput();
		addCommandToHistory(input);
		scrollToBottom();
		self.callback(input);
	}

	var scrollToBottom = function() {
		$(".console").scrollTop($(".console")[0].scrollHeight);
	}

	var addCommandToHistory = function(command) {
		self.currentCommand = "";
		self.commandHistory.push(command);
		self.commandPosition = 0;
	}

	var commandUp = function() {
		if(self.commandPosition == 0) {
			self.currentCommand = getInput();
		}
		self.commandPosition++;
		if(self.commandPosition > self.commandHistory.length)
			self.commandPosition = self.commandHistory.length;
		var realPosition = self.commandHistory.length - self.commandPosition;
		setInput(self.commandHistory[realPosition]);
		moveEnd();
		updateCaret();
	}

	var commandDown = function() {
		self.commandPosition--;
		if(self.commandPosition <= 0) {
			self.commandPosition = 0;
			setInput(self.currentCommand);
		} else {
			var realPosition = self.commandHistory.length - self.commandPosition;
			setInput(self.commandHistory[realPosition]);
		}
		moveEnd();
		updateCaret();
	}

	var setInput = function(text) {
		$(".console-input").text(text);
	}

	var getInput = function() {
		return $(".console-input").text();
	}

	var clearInput = function() {
		$(".console-input").empty();
	}

	var moveLeft = function() {
		self.caretPosition = self.caretPosition - 1;
	}

	var moveRight = function() {
		self.caretPosition = self.caretPosition + 1;
	}

	var moveStart = function() {
		self.caretPosition = 0;
	}

	var moveEnd = function() {
		self.caretPosition = getInput().length;
	}

	var bumpCaret = function() {
		self.caretTicks = 4;
		self.caretBlink = true;
	}

	var updateCaret = function() {
		if(self.caretPosition < 0) {//Change to clamp?
			self.caretPosition = 0;
		}
		if(self.caretPosition > $(".console-input").text().length) {
			self.caretPosition = $(".console-input").text().length;
		}
		var caret = $(".caret");
		caret.css("opacity", (self.caretBlink ? 1 : 0));
		caret.css("left", (self.caretPosition * parseInt(caret.css("width"))));
		caret.text(getInput().charAt(self.caretPosition))//If the caret is over a character, it must be displayed on top of the caret.
		caret.css("color", $(".console").css("background-color"));
		caret.css("background-color", self.caretColor.toString(16));
	}

	/* Initialisation */

	console.log("Injecting console into div.")
	div.html("<div class=\"console-input-container\"><div class=\"caret\" style=\"position: absolute; top: 0px; left: 7px;\"></div><div class=\"console-input\"></div></div></div><textarea class=\"console-input-textarea\" id=\"input\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\"></textarea></div></div>");

	console.log("Modifying CSS.")
	$(".console").css({
		"font-size" : self.fontSize + "px",
		"line-height" : self.fontSize + "px",
		"width" : self.consoleWidth + "px",
		"height" : self.consoleHeight + "px"
	});

	console.log("Initialing caret");
	var updateCaretTimer = function() {
		if($(".console-input-textarea").is(":focus")) {
			self.caretTicks = self.caretTicks + 1;
			if(self.caretTicks > self.caretBlinkTime) {
				self.caretTicks = 0;
				self.caretBlink = !self.caretBlink;
				updateCaret()
			}
		} else if(self.caretBlink) {
			self.caretBlink = false;
			updateCaret();
		}
	}
	$(".caret").css({
		"width"  : "1.5ex",
		"height" : (self.fontSize) + "px",
		"padding-top" : "2px"
	});
	var caretTimer = setInterval(updateCaretTimer, 50);

	console.log("Creating event handlers.");
	$(".console-input-textarea").focus(function(e) {
		bumpCaret();
		updateCaret();
	});
	$(".console-input-textarea").keypress(function(e) {
		switch(e.which) {
			case 13:
				//console.log("'ENTER' was pressed.");
				pushInput($(".console-input").text());
				bumpCaret();
				updateCaret()
				break;
			default:
				//console.log("'" + String.fromCharCode(e.which) + "' was pressed.");
				var position = self.caretPosition;
				var text = $(".console-input").text();
				var output = text.substr(0, position) + String.fromCharCode(e.which) + text.substr(position, text.length);
				$("	.console-input").text(output);
				moveRight();
				bumpCaret();
				updateCaret()
				break;
		}
	});
	$(".console-input-textarea").keydown(function(e) {
		switch(e.which) {
			case 8:
				//console.log("'BACKSPACE' was pressed.");
				var text = $(".console-input").text();
				var position = self.caretPosition;
				var output = text.substr(0, position - 1) + text.substr(position, text.length);
				$("	.console-input").text(output);
				moveLeft();
				bumpCaret();
				updateCaret()
				break;
			case 37: // left
				moveLeft();
				bumpCaret();
				updateCaret()
				break;
			case 38: // up
				commandUp();
				break;
			case 39: // right
				moveRight();
				bumpCaret();
				updateCaret();
				break;
			case 40: // down
				commandDown();
				break;
		}
	});
}
