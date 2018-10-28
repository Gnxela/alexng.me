$(document).ready(function() {
	let params = getParams();
	let numColumns = params['cols'] ? params['cols'] : 3;
	let numImages = params['num'] ? params['num'] : 25;

	let columns = []
	let images = [];

	//Adds the columns to the gallery.
	for (let i = 0; i < numColumns; i++) {
		let column = $('<div class="column"></div>');
		column.css("width", (100 / numColumns) + "%");
		$(".gallery").append(column)
		columns.push(column);
	}

	//Loads the images into the columns.
	/*for (let index = 0; index < numImages; index++) {
		loadImage(index, "http://via.placeholder.com/" + (800 + Math.floor(Math.random() * 500)) + "x" +  (800 + Math.floor(Math.random() * 500)) + "/" + (Math.random()*0xFFFFFF<<0).toString(16) + "?text=." + index + ".");
	}*/
	for (let index = 1; index <= 71; index++) {
		loadImage(index - 1, "res/" + index + ".jpg");
	}

	function loadImage(position, src) {
		let image = $("<img src=\"" + src + "\"/>")
		let element = image.get(0);
		let interval = setInterval(() => {
			if (element.naturalWidth) {//Rather than the load event. This allows us to add the image to the DOM as soon as we load it's dimentions.
				if (position == 0 || images[position - 1]) {//Insure that the image is only added after it's predecessor.
					clearInterval(interval);
					images[position] = addImage(image, position);
				}
			}
		}, 10);
	}

	function addImage(image, position) {
		let wrapper = image.wrap("<div class=\"image\"></div>").parent().appendTo(getSmallestColumn())

		wrapper.data("position", position);

		wrapper.get(0).offsetHeight;//Forces a CSS update. This forces the transition to always work. Without it most of the time the commands are batched together and don't work (I think?). So I think JS batches the wrapping of the image class and the css update, voiding the transiton. Something about micro and macro event queues.
		image.on("load", () => {
			wrapper.css("opacity", 1);
		});

		image.get(0).draggable = false;

		wrapper.on('click', (e) => {
			let position = $(e.currentTarget).data("position");
			openImage(position);
		});

		return wrapper;
	}

	function openImage(position) {
		let clone = images[position].clone();
		let controlLeft = $('<div class="control left"></div>');
		let controlRight = $('<div class="control right"></div>');

		function keyControl(e) {
			if (e.which === 39) {//Right arrow
				openImage(Math.min(numImages - 1, position + 1));//Max index is numImages - 1
			} else if (e.which === 37) {//Left arrow
				openImage(Math.max(0, position - 1));
			}
			close();
		}

		$(document).on("keydown", keyControl);

		controlLeft.on('click', () => {
			openImage(Math.max(0, position - 1));
			close();
		});
		controlRight.on('click', () => {
			openImage(Math.min(numImages, position + 1));
			close();
		});

		clone.addClass("fullscreen").appendTo($(".gallery"));
		clone.on('click', (e) => {
			close();
		});

		let image = clone.find("img");
		image.get(0).draggable = true;
		let wrapper = image.wrap("<div class=\"wrapper\"></div>").parent();
		wrapper.prepend(controlLeft);
		wrapper.append(controlRight);
		wrapper.on('click', (e) => {
			e.stopPropagation();
		});

		function close() {
			$(document).off("keydown", keyControl);
			clone.remove();
		}

		return close;
	}

	function getSmallestColumn() {
		let smallest = -1;
		let smallestValue = -1;

		for (let i = 0; i < numColumns; i++) {
			let height = 0;
			let elems = columns[i].children();
			for (let j = 0; j < elems.length; j++) {
				height += $(elems[j]).height();
			}
			if (smallestValue == -1 || height < smallestValue) {
				smallest = i;
				smallestValue = height;
			}
		}
		return columns[smallest];
	}

	function getParams() {//getGETParams?
		let object = {};
		location.search.substr(1).split("&").forEach((param) => {
			let parts = param.split("=");
			object[parts[0]] = decodeURIComponent(parts[1]);
		});
		return object;
	}
});
