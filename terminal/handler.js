var echo = function() {
	var getCommand = function() {
		return "echo";
	}
		
	var shouldTrigger = function(command) {
		if(command.startsWith(getCommand()))
			return true;
		return false;
	}
		
	var trigger = function(command) {
		console.log("test");
	}
}

var createHandlers = function(commandHandlers) {
	console.log("Creating command handlers.");
	commandHandlers.push(echo);
}