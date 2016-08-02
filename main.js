$(document).ready(function() {
	colorChange();
	setInterval(colorChange, 5000);
});
function colorChange() {
        var color = "rgb(" + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ")";
        $('.colorChange').css("backgroundColor", color);
        $('.colorChange2').css("color", color);
	console.log(1);
}

