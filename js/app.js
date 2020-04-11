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
let randomEnemy;
let highScore = 0;
let enemies = [];

const stepMax = 8;
const stepMin = 3;

/***************************************/
/************** Functions **************/
/***************************************/
const clearScreen = () => {
	ctx.clearRect(0, 0, gameArea.width, gameArea.height);
	redraw();
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

const startEnemies = () => {
	setInterval(() => {
		const prob = Math.floor(Math.random() * 10);

		if (prob < 2) {
			enemies.push(new Enemy());
		}
	}, 800);

	setInterval(() => {
		for (let i = 0; i < enemies.length; i++) {
			enemies[i].moveDown();
		}

		clearScreen();
	}, 100);
}

const redraw = () => {
	player.drawPlayer();

	const playerPosX = player.x;
	const playerPosY = player.y;
	const playerSize = player.size;

	for (let i = 0; i < enemies.length; i++) {
		let enemyPosX = enemies[i].x;
		let enemyPosY = enemies[i].y;
		let enemySize = enemies[i].size;

		if (playerPosX < enemyPosX + enemySize && playerPosX + playerSize > enemyPosX && playerPosY < enemyPosY + enemySize && playerPosY + playerSize > enemyPosY) {
			player.lives--;
			alert('You were blown up! You have ' + player.lives + ' lives left.');
			enemies.splice(i, 1);

			if (player.lives === 0) {
				game.displayGameOverMessage();
				game.resetGame();
				break;
			}
		}

		if (enemyPosY >= gameArea.height) {
			enemies.splice(i, 1);
		} else {
			enemies[i].drawEnemy();
		}
	}
}

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
	startEnemies();
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

	displayGameOverMessage = () => {
		ctx.font = "4em 'Permanent Marker'";
		ctx.textAlign = "center";
		ctx.fillStyle = "red";
		ctx.strokeStyle = "black";
		ctx.fillText(gameOverText, gameArea.width / 2, (gameArea.height / 2) - 100);
	}

	resetGame = () => {
		enemies = [];
		characterFlag = 0;
		nameInputFlag = 0;
		chosenCharacter = undefined;
		chosenName = undefined;
		randomEnemy = undefined;
		highScore = 0;
	};
}

class Player {
	constructor(x, y, step, level, score, lives) {
		this.x = x;
		this.y = y;
		this.step = step;
		this.level = level;
		this.score = score;
		this.lives = lives;
		this.size = 100;
	}

	drawPlayer() {
		let character = new Image();

		character.onload = () => {
			ctx.drawImage(character, this.x, this.y, this.size, this.size);
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
	}

	moveRight() {
		if (this.x + this.step + this.size > gameArea.width) {
			this.x = gameArea.width - this.size;
		} else {
			this.x += this.step;
		}

		clearScreen();
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

class Enemy {
	constructor() {
		this.size = 100;
		this.x = Math.floor(Math.random() * (gameArea.width - this.size));
		this.y = 0;
		this.step = Math.floor(Math.random() * (stepMax - stepMin + 1)) + stepMin;
	}

	moveDown() {
		this.y += this.step;
	}

	drawEnemy() {
		let enemy = new Image();

		enemy.onload = () => {
			ctx.drawImage(enemy, this.x, this.y, this.size, this.size);
		}

		randomEnemy = Math.floor(Math.random() * 2) + 1

		if (randomEnemy === 1)
			enemy.src = "../images/crab.png";
		else if (randomEnemy === 2)
			enemy.src = "../images/crab.png";
	}
}

let game = new Game();
game.displayWelcomeMessage();

let player = new Player(400, 470, 5, 1, 0, 3);
