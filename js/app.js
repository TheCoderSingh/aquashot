/***************************************/
/************** Variables **************/
/***************************************/
const ctx = gameArea.getContext('2d');
const welcomeText = "Welcome to Aqua Shot";
const gameOverText = "Game Over";
const characterText = "Choose a character";
const playerNameText = "Enter your name";

let enemyImage = new Image();
enemyImage.src = "../images/crab.png";
enemyImage.onload = function () { this.ready = true };

let pizzaImage = new Image();
pizzaImage.src = "../images/pizza.png";
pizzaImage.onload = function () { this.ready = true };

let heartImage = new Image();
heartImage.src = "../images/heart.png";
heartImage.onload = function () { this.ready = true };

let char1Image = new Image();
char1Image.src = "../images/character1.png";
char1Image.onload = function () { this.ready = true };

let char2Image = new Image();
char2Image.src = "../images/character2.png";
char2Image.onload = function () { this.ready = true };

let characterFlag = 0;
let nameInputFlag = 0;
let chosenCharacter;
let chosenName;
let randomEnemy;
let randomItem;
let highScore = 0;
let enemies = [];
let items = [];
let createEnemyInterval;
let moveEnemyInterval;
let createItemInterval;
let moveItemInterval;

const stepMax = 3;
const stepMin = 1;

/***************************************/
/************** Functions **************/
/***************************************/
const clearScreen = () => {
	ctx.clearRect(0, 20, gameArea.width, gameArea.height);
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
	createEnemyInterval = setInterval(() => {
		const prob = Math.floor(Math.random() * 10);

		if (prob < 3) {
			enemies.push(new Enemy());
		}
	}, 800);

	moveEnemyInterval = setInterval(() => {
		for (let i = 0; i < enemies.length; i++) {
			enemies[i].moveDown();
		}

		clearScreen();
	}, 20);
}

const startItems = () => {
	createItemInterval = setInterval(() => {
		const prob = Math.floor(Math.random() * 10);

		if (prob < 4) {
			items.push(new Item());

			if (prob < 2)
				items.push(new Heart());
		}
	}, 800);

	moveItemInterval = setInterval(() => {
		for (let i = 0; i < items.length; i++) {
			items[i].moveDown();
		}

		clearScreen();
	}, 20);
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

			ctx.clearRect(0, 0, gameArea.width, 20);
			displayLegend();

			if (player.lives === 0) {
				ctx.clearRect(0, 0, gameArea.width, gameArea.height);
				game.displayGameOverMessage();
				clearInterval(createEnemyInterval);
				clearInterval(moveEnemyInterval);
				clearInterval(createItemInterval);
				clearInterval(moveItemInterval);
				window.removeEventListener();
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

	for (let i = 0; i < items.length; i++) {
		let itemPosX = items[i].x;
		let itemPosY = items[i].y;
		let itemSize = items[i].size;

		if (playerPosX < itemPosX + itemSize && playerPosX + playerSize > itemPosX && playerPosY < itemPosY + itemSize && playerPosY + playerSize > itemPosY) {
			if (items[i].itemType === "Life")
				player.lives++;
			else
				player.score += 5;

			items.splice(i, 1);

			ctx.clearRect(0, 0, gameArea.width, 20);
			displayLegend();
		}

		if (itemPosY >= gameArea.height) {
			items.splice(i, 1);
		} else {
			items[i].drawItem();
		}
	}
}

const displayLegend = () => {
	game.displayLives();
	game.displayName();
	game.displayScore();
	game.displayHighScore();
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
	startItems();
	displayLegend();
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

	displayLives = () => {
		ctx.font = "24px 'Permanent Marker'";
		ctx.textAlign = "left";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.fillText(`Lives: ${player.lives}`, 10, 20);
	}

	displayName = () => {
		ctx.font = "24px 'Permanent Marker'";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.fillText(chosenName, gameArea.width / 2 - 200, 20);
	}

	displayScore = () => {
		ctx.font = "24px 'Permanent Marker'";
		ctx.textAlign = "right";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.fillText(`Score: ${player.score}`, gameArea.width - 300, 20);
	}

	displayHighScore = () => {
		ctx.font = "24px 'Permanent Marker'";
		ctx.textAlign = "right";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.fillText(`High Score: ${highScore}`, gameArea.width - 30, 20);
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

/**************** Player *****************/
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
		if (chosenCharacter === 1) {
			if (char1Image.ready) {
				ctx.drawImage(char1Image, this.x, this.y, this.size, this.size);
			}
		} else if (chosenCharacter === 2) {
			if (char2Image.ready) {
				ctx.drawImage(char2Image, this.x, this.y, this.size, this.size);
			}
		}
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

/**************** Enemies *****************/
class Enemy {
	constructor() {
		this.size = 100;
		// this.x = Math.floor(Math.random() * (gameArea.width - this.size));
		let xPos = Math.floor(Math.floor(Math.random() * 10) + 1);
		this.x = gameArea.width / 8 * xPos - this.size;
		this.y = 15;
		this.step = Math.floor(Math.random() * (stepMax - stepMin + 1)) + stepMin;
		// this.step = 1;
		// this.step = Math.floor(Math.random() * 2) + 1;
	}

	moveDown() {
		this.y += this.step;
	}

	drawEnemy() {
		if (enemyImage.ready) {
			ctx.drawImage(enemyImage, this.x, this.y, this.size, this.size);
		}
	}
}

/**************** Items *****************/
class Item {
	constructor() {
		this.size = 100;
		this.x = Math.floor(Math.random() * (gameArea.width - this.size));
		this.y = 15;
		this.step = Math.floor(Math.random() * (stepMax - stepMin + 1)) + stepMin;
	}

	moveDown() {
		this.y += this.step;
	}

	drawItem() {
		if (pizzaImage.ready) {
			ctx.drawImage(pizzaImage, this.x, this.y, this.size, this.size);
		}
	}
}

class Heart extends Item {
	constructor() {
		super();
		this.itemType = "Life";
	}

	drawItem() {
		if (heartImage.ready) {
			ctx.drawImage(heartImage, this.x, this.y, this.size, this.size);
		}
	}
}

let game = new Game();
game.displayWelcomeMessage();

let player = new Player(400, 470, 5, 1, 0, 3);
