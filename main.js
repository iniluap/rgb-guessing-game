var squaresNum = 6;
var colors = randomColorsArr(squaresNum);
var squares = document.querySelectorAll('.box');
var pickedColor = pickColor();
var colorDisplay = document.getElementById('pickedColor');
var message = document.getElementById('message');
var restart = document.getElementById('restart');
var levels = document.querySelectorAll('.level');

//display rgb
colorDisplay.textContent = pickedColor;
//create random color
function randomColor() {
	var randomRed = Math.floor(Math.random() * 256);
	var randomGreen= Math.floor(Math.random() * 256);
	var randomBlue = Math.floor(Math.random() * 256);
	var randomColor = 'rgb(' + randomRed + ', ' + randomGreen + ', ' + randomBlue + ')';
	return randomColor;
}
function randomColorsArr(num) {
	var arr = [];
	for(var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}
//pick random color from the array
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
//game logic
for (var i = 0; i < squares.length; i++) {
	//add initial colors
	squares[i].style.backgroundColor = colors[i];
	//add click listener and feedback
	squares[i].addEventListener('click', function() {
		var clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor) {
			message.style.display = 'block';
			message.textContent = 'correct';
			changeColors(clickedColor);
			restart.textContent = 'play again';
		} else {
			message.style.display = 'block';
			message.textContent = 'try again';
			this.style.backgroundColor = '#29323c';
		}
	})
}
//change all squares colors when win
function changeColors(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}
//restart the game
function reset() {
	colors = randomColorsArr(squaresNum);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = 'block';
		} else {
			squares[i].style.display = 'none';
		}
	};
	message.textContent = '';
	restart.textContent = 'new colors';
}

restart.addEventListener('click', reset);

//set the level
for(var i = 0; i < levels.length; i++) {
	levels[i].addEventListener('click', function() {
		levels[0].classList.remove('selected');
		levels[1].classList.remove('selected');
		this.classList.add('selected');
		this.textContent === 'easy' ? squaresNum = 3 : squaresNum = 6;
		reset();
	});
}
