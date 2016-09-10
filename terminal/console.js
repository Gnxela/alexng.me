/**
	TODO:	-Commands
				-OO
				-Command history (press up and down)
			-File system (Perhapse make actual files?)
			-Users
				-Delete after 'x' minutes
				-Tie in with file system
			-Text wrapping (and caret)
**/

var Console = function (div) {
	/* Variables */

	var self = this;//Must be used when scope is changed

	this.caretPosition = 0;
	this.caretBlink = true;
	this.caretTicks = 1;
	this.caretBlinkTime = 16;

	this.user = null;
	this.path = "~"

	this.commandHistory = new Array();
	this.currentCommand = "";
	this.commandPosition = 0;
	this.commandHandlers = new Array();

	/* Methods */

	this.pushNewLine = function() {
		$(".console-input-container").before("<br>");
	}

	this.pushBash = function() {
		$(".console-input-container").before(">");
	}

	this.pushOutput = function(output) {
		$(".console-input-container").before(output);
	}

	var pushInput = function(input) {
		console.log("'" + input + "' was pushed.");
		$(".console-input-container").before(" " + input)// Insert input into output 

		clearInput();
		addCommandToHistory(input);
		self.pushNewLine();
		self.pushBash();
		scrollToBottom();
	}

	var scrollToBottom = function() {
		$(".console").scrollTop($(".console")[0].scrollHeight);
	}

	console.log("Initialing caret");
	var updateCaretTimer = function() {
		self.caretTicks = self.caretTicks + 1;
		if(self.caretTicks > self.caretBlinkTime) {
			self.caretTicks = 0;
			self.caretBlink = !self.caretBlink;
			updateCaret()
		}
	}
	var caretTimer = setInterval(updateCaretTimer, 50);

	var addCommandToHistory = function(command) {
		self.commandHistory.push(command);
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
		if(self.caretPosition < 0) {
			self.caretPosition = 0;
		}
		if(self.caretPosition > $(".console-input").text().length) {
			self.caretPosition = $(".console-input").text().length;
		}
		var caret = $(".caret");
		caret.css("opacity", (self.caretBlink ? 1 : 0))
		caret.css("left", (self.caretPosition * 7 + 7))
		caret.text(getInput().charAt(self.caretPosition))//If the caret is over a character, it must be displayed on top on the caret.
		caret.css("color", $(".console").css("background-color"));
	}

	/* Initialisation */

	console.log("Loading saved data.");
	if(document.cookie.length != 0) {
		console.log("Raw cookies: '" + document.cookie + "'.");
		var cookieArray = document.cookie.split(";");
		for(var i = 0; i < cookieArray.length; i++) {
			var name = cookieArray[i].split("=")[0];
			var value = cookieArray[i].split("=")[1];

			switch(name) {
				case "user":
					self.user = value;
					break;
				default:
					console.log("An unknown cookie was read.");
					break;
			}

			console.log("Read cookie '" + name + "' with value '" + value + "'.")
		}
	} else {
		console.log("No save data found. Setting defaults.");
		self.user = "guest";
	}

	console.log("Injecting console into div.")
	div.html("<div class=\"console-input-container\"><div class=\"caret\" style=\"position: absolute; top: 0px; left: 7px;\"></div><div class=\"console-input\"></div></div></div><textarea class=\"console-input-textarea\" id=\"input\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\"></textarea></div></div>");

	console.log("Creating event handlers.");
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
	createHandlers(self.commandHandlers);
}
