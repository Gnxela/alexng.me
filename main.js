$(document).ready(function() {
	var fps = 30;
	var frames = 0;
	var changeTime = 150;//Change time in frames
	var ored = 255, ogreen = 250, oblue = 255;//Original values
	var red = ored, green = ogreen, blue = oblue;//Current values
	var tred = 25, tgreen = 100, tblue = 255;//Target values

	var myFunction = function() {
		if(frames == changeTime) {
			frames = 0;
			ored = tred;
			ogreen = tgreen;
			oblue = tblue;
			tred = Math.floor(Math.random() * 256);
			tgreen = Math.floor(Math.random() * 256);
			tblue = Math.floor(Math.random() * 256);
		} else {
			frames++;
			red = red + (tred - ored) / changeTime;
			green = green + (tgreen - ogreen) / changeTime;
			blue = blue + (tblue - oblue) / changeTime;
			$('.colorChange').css("backgroundColor", "rgb(" + Math.round(red) + ", " + Math.round(green) + ", " + Math.round(blue) + ")");
			$('.colorChange2').css("color", "rgb(" + Math.round(red) + ", " + Math.round(green) + ", " + Math.round(blue) + ")");
		}
	};
	setInterval(myFunction, (1000 / fps));
});
