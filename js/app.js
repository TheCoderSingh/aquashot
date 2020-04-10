/***************************************/
/************** Variables **************/
/***************************************/
const ctx = gameArea.getContext('2d');
const welcomeText = "Welcome to Aqua Shot";
const gameOverText = "Game Over";
const characterText = "Choose a character";
const playerNameText = "Enter your name";

let characterFlag = 0;
let nameInputFlag = 0;
let chosenCharacter;
let chosenName;

let highScore = 0;

/***************************************/
/************** Functions **************/
/***************************************/
const clearScreen = () => {
	ctx.clearRect(0, 0, gameArea.width, gameArea.height);
};

const showCharacterScreen = () => {
	game.displayCharacterMessage();
};

const toggleCharacters = () => {
	if (characterFlag == 0) {
		characters.style.display = "block";
		characterFlag = 1;
	} else {
		characters.style.display = "none";
		characterFlag = 0;
	}
};

const toggleNameInput = () => {
	if (nameInputFlag == 0) {
		playerName.style.display = "block";
		nameInputFlag = 1;
	} else {
		playerName.style.display = "none";
		nameInputFlag = 0;
	}
}

const showPlayerNameScreen = () => {
	toggleNameInput();
	game.displayPlayerNameMessage();
};

/***************************************/
/*************** Events ****************/
/***************************************/
playBtn.addEventListener("click", () => {
	clearScreen();
	playBtn.remove();
	showCharacterScreen();

	toggleCharacters();
});

character1.addEventListener("click", () => {
	chosenCharacter = 1;
	clearScreen();
	toggleCharacters();
	showPlayerNameScreen();
});

character2.addEventListener("click", () => {
	chosenCharacter = 2;
	clearScreen();
	toggleCharacters();
	showPlayerNameScreen();
});

startGameBtn.addEventListener("click", () => {
	clearScreen();
	toggleNameInput();
	chosenName = playerNameInput.value;
	player.init();
});

/***************************************/
/************ Game Objects *************/
/***************************************/

/**************** Game *****************/
class Game {
	constructor() {

	}

	displayWelcomeMessage = () => {
		ctx.font = "4em 'Permanent Marker'";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.fillText(welcomeText, gameArea.width / 2, gameArea.height / 2);
	}

	displayGameOverMessage = () => {
		ctx.font = "4em 'Permanent Marker'";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.fillText(gameOverText, gameArea.width / 2, gameArea.height / 2);
	}

	displayCharacterMessage = () => {
		ctx.font = "4em 'Permanent Marker'";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.fillText(characterText, gameArea.width / 2, (gameArea.height / 2) - 100);
	}

	displayPlayerNameMessage = () => {
		ctx.font = "4em 'Permanent Marker'";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.fillText(playerNameText, gameArea.width / 2, (gameArea.height / 2) - 100);
	}
}

class Player {
	constructor(x, y, step, level, score, lives) {
		this.x = x;
		this.y = y;
		this.step = step;
		this.level = level;
		this.score = score;
		this.lives = lives;
	}

	drawPlayer() {
		let character = new Image();

		character.onload = () => {
			ctx.drawImage(character, this.x, this.y, 100, 100);
		}

		if (chosenCharacter === 1)
			character.src = "../images/character1.png";
		else if (chosenCharacter === 2)
			character.src = "../images/character2.png";
	}

	moveLeft() {
		if (this.x - this.step < 0) {
			this.x = 0;
		} else {
			this.x -= this.step;
		}

		clearScreen();
		player.drawPlayer();
	}

	moveRight() {
		if (this.x + this.step + 100 > gameArea.width) {
			this.x = gameArea.width - 100;
		} else {
			this.x += this.step;
		}

		clearScreen();
		player.drawPlayer();
	}

	init() {
		this.drawPlayer();
		window.addEventListener(
			'keydown',
			function (e) {
				if (e.keyCode === 37) {
					this.moveLeft();
				} else if (e.keyCode === 39) {
					this.moveRight();
				}
			}.bind(this)
		);
	}
}

let game = new Game();
game.displayWelcomeMessage();

let player = new Player(400, 470, 5, 1, 0, 3);
