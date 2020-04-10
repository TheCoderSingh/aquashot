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

let game = new Game();
game.displayWelcomeMessage();
