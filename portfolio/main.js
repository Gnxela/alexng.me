$(document).ready(function() {
	colorChange();
	setInterval(colorChange, 5000);

	var image = new Image();
	image.src = 'http://www.alexng.me/portfolio/res/frontpage.jpg';
	if(image.complete) {//Simple cache detection. More testing requited.
		console.log("Loaded from cache!");
		$(".frontpage").css({"background-image": "url(" + image.src + ")", "opacity": 1})
	} else {
		$(image).on('load', function() {
			console.log("Loaded image!");
			$('.frontpage').css("background-image", "url(" + $(this).attr("src") + ")").animate({
				opacity: 1
			}, 1000);
		});
	}
});
function colorChange() {
        var color = "rgb(" + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ")";
        $('.colorChange').css("color", color);
}
