/***************************************/
/************** Variables **************/
/***************************************/
const ctx = gameArea.getContext('2d');
const welcomeText = "Welcome to Aqua Shot";
const gameOverText = "Game Over";

/***************************************/
/************** Functions **************/
/***************************************/
const clearScreen = () => {
	ctx.clearRect(0, 0, gameArea.width, gameArea.height);
};

/***************************************/
/*************** Events ****************/
/***************************************/
playBtn.addEventListener("click", () => {
	clearScreen();
	playBtn.remove();
	// showCharacterScreen();
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
}

let game = new Game();
game.displayWelcomeMessage();
