$(document).ready(function(){
	console.log("Loading JavaScript.");
	$(".tasks").on("click", ".task", function(e) {
		if($(this).hasClass("invincible")) {
			return;
		}
		var name = $(".login").text().substr(0, $(".login").text().length - 9);
		if($(this).hasClass("strike")) {
			$(this).removeClass("strike");
			$(this).detach().appendTo(".todo");
			console.log("Unstriking '" + $(this).text() + "'");
			$.post("update.php", {mode: "update", name: name, postID: $(this).attr('id'), striked: 0}, function(data) {
                                if(data.length > 0)
					alert(data);
                        });

		} else {
			$(this).addClass("strike");
			$(this).detach().prependTo(".complete");
			console.log("Striking '" + $(this).text() + "'");
			$.post("update.php", {mode: "update", name: name, postID: $(this).attr('id'), striked: 1}, function(data) {
                                if(data.length > 0)
                                	alert(data);
                        });
		}
	});
	$("#INPUT").keypress(function (e) {
		if($(".login").text().indexOf("(logout)") == -1) //Inspect element will kill this, but it's just a basic check.
			$(this).unbind();
		if(e.which == 13) {
			var task = $(this).val();
			if(task.trim().length == 0)
				return;
			if(task.length >= 255) {
				alert("Maximum length reached (255).");
				return;
			}
			$(".todo").append("<div class=\"task\">" + task + "</div>");
			$(this).val("");
			e.preventDefault();
			var name = $(".login").text().substr(0, $(".login").text().length - 9);
			$.post("update.php", {mode: "add", name: name, content: task}, function(data) {
                                if(data.length > 0)
					alert(data);
			});
		}
	});
	console.log("Finished loading JavaScript.");

});
