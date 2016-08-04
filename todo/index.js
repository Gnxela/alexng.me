$(document).ready(function(){
	console.log("Loading javascript");
	$(".task").click(function(e) {
		if($(this).hasClass("strike")) {
			$(this).removeClass("strike");
			console.log("Unstriking '" + $(this).text() + "'");
		} else {
			$(this).addClass("strike");
			console.log("Striking '" + $(this).text() + "'");
		}
	});
});
