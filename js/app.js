/***************************************/
/************** Variables **************/
/***************************************/
const ctx = gameArea.getContext('2d');
const welcomeText = "Welcome to Aqua Shot";
const gameOverText = "Game Over";
const characterText = "Choose a character";

let characterFlag = 0;

/***************************************/
/************** Functions **************/
/***************************************/
const clearScreen = () => {
	ctx.clearRect(0, 0, gameArea.width, gameArea.height);
};

const showCharacterScreen = () => {
	game.displayCharacterMessage();
};

/***************************************/
/*************** Events ****************/
/***************************************/
playBtn.addEventListener("click", () => {
	clearScreen();
	playBtn.remove();
	showCharacterScreen();

	if (characterFlag == 0) {
		characters.style.display = "block";
		characterFlag = 1;
	} else {
		characters.style.display = "none";
		characterFlag = 0;
	}
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
}

let game = new Game();
game.displayWelcomeMessage();
