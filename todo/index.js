$(document).ready(function(){
	console.log("Loading javascript");
	$(".task").click(function(e) {
		if($(this).css("text-decoration") == "line-through") {
			$(this).css("text-decoration", "none");
			console.log("Unstriking '" + $(this).text() + "'");
		} else {
			$(this).css("text-decoration", "line-through");
			console.log("Striking '" + $(this).text() + "'");
		}
	});
});
