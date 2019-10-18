// Settings for future expansion.
const cardValues = ['demon', 'fire', 'ghost', 'ice', 'orc', 'slime', 'vampire', 'zombie'],
	cardsToMatch = 2,
	peekSpeed = 2;

// Scoring constants. moveCountPerfect from https://bit.ly/2GyDZBC
const cardsMatchedNeeded = cardValues.length * cardsToMatch / 2,
	moveCountPerfect = cardValues.length * cardsToMatch * 0.8,
	starCountPerfect = 3;

// Sets placeholder variables.
let timer,
	peekActive,
	peekAnimationModifier,
	cardsMatched,
	moveCount,
	starCount,
	activeCards,
	cardStack;

// Run on DOM load.
document.addEventListener('DOMContentLoaded', function () {
	// Add functionality to utility buttons.
	document.querySelector('.repeat').addEventListener('click', gameReady, true);
	document.querySelector('.play-again').addEventListener('click', function () {
		gameReady();
		document.querySelector('.modal-container').classList.add('hidden');
	}, true);
	timer = new clock('.score-panel .time');
	gameReady();
});

// Serves as a game reset or first game function.
function gameReady() {
	peekActive = false;
	cardsMatched = 0;
	moveCount = 0;
	starCount = starCountPerfect;
	activeCards = [];
	cardStack = [];
	timer.reset();
	buildDeck();
	drawBoard();
	scoreUpdate();
}

function buildDeck() {
	// Clear previous deck.
	if (cardStack != []) { cardStack = []; }

	// Make card sets as set in options and shuffle deck.
	for (i = 0; i < cardsToMatch; i++) {
		for (let card = 0; card < cardValues.length; card++){
			cardStack.push(cardValues[card]);
		}//);
	}

	cardStack = shuffle(cardStack);
}

function drawBoard() {
	// Creates 16 card placeholders.
	let deckBuilder = document.createDocumentFragment();

	for (let card = 0; card < cardStack.length; card++){
		// First create the card frame and event listeners.
		let newCardFrame = document.createElement('div');
		newCardFrame.classList.add('card');
		newCardFrame.addEventListener('click', firstClick, true);
		newCardFrame.addEventListener('click', cardFlip, true);

		// Then add the card art.
		let newCard = document.createElement('img');
		newCard.classList.add(cardStack[card], 'mobCard', 'hidden');
		newCard.setAttribute('src', `img/mobs/256/mob_${cardStack[card]}.png`);
		newCard.setAttribute('srcset', `img/mobs/mob_${cardStack[card]}/128.png 128w, img/mobs/mob_${cardStack[card]}/256.png 256w`);
		newCard.setAttribute('sizes', `20vw`);
		newCard.setAttribute('alt', cardStack[card]);

		// Finalize the card and push it to the array.
		newCardFrame.appendChild(newCard);
		deckBuilder.appendChild(newCardFrame);
	}

	// Clear the board if needed and draw the array.
	clearNode('.deck');
	document.querySelector('.deck').appendChild(deckBuilder);
}

function cardFlip(event) {
	// Prevent overlapping clicks.
	event.stopPropagation();
	event.preventDefault();

	// Check to see if a player is currently peeking.
	if (peekActive) {
		return;
	}

	// Add the card to the active list.
	activeCards.push(this);

	// Display the card.
	this.classList.add('open');
	this.querySelector('.mobCard').classList.remove('hidden');
	this.removeEventListener('click', cardFlip, true);

	if (activeCards.length == cardsToMatch) {
		// If a player is peeking cards, disable clicking to avoid spamming the board.
		peekActive = true;
		document.querySelector('body').classList.add('wait');

		moveCount++;

		// Check to see if the cards match.
		cardsMatch = activeCards[0].firstChild.className == activeCards[1].firstChild.className ? true : false;
		if (cardsMatch) {
			for (let card = 0; card < activeCards.length; card++){
				activeCards[card].classList.add('animated', 'infinite', 'rubberBand');
			}
			peekAnimationModifier = 1000;
			playSound('box-correct');
			cardsMatched++;
			victoryCheck();
		} else {
			for (let card = 0; card < activeCards.length; card++){
				activeCards[card].classList.add('animated', 'infinite', 'shake');
			}
			peekAnimationModifier = 500;
			playSound('box-wrong');
		}

		// Clear animation after adjusted peek time.
		setTimeout(function () {
			for (let card = 0; card < activeCards.length; card++){
				activeCards[card].classList.remove('animated', 'infinite', 'shake', 'rubberBand');
			}
		}, peekSpeed * peekAnimationModifier);

		// If cards are not a match hide them and restore click ability.
		setTimeout(function () {
			for (let card = 0; card < activeCards.length; card++){
				if (cardsMatch != true) {
					activeCards[card].classList.remove('open');
					activeCards[card].querySelector('.mobCard').classList.add('hidden');
					activeCards[card].addEventListener('click', cardFlip, true);
				}
			}
			activeCards = [];
			peekActive = false;
			document.querySelector('body').classList.remove('wait');
		}, peekSpeed * 1000);

		// TODO: In some cases the score will lower on a correct match turn which is accurate but feels wrong. Look into delaying the change.
		scoreUpdate();
	}
}

function firstClick() {
	// Start the timer on the first click, then remove its own event listener.
	timer.start();
	let cardButtons = Array.from(document.querySelectorAll('.card'));
	for (let card = 0; card < cardButtons.length; card++){
		cardButtons[card].removeEventListener('click', firstClick, true);
	}
}

function scoreUpdate() {
	/* Simplified scoring system.
	Every quarter of the game check to see if the players correct move average is at least 15%, if not lower a star.
	Do not allow star to go lower than 1. Can also use this to adjust difficulty later.
	*/

	if (moveCount != 0 && starCount > 1 && moveCount % Math.ceil(moveCountPerfect / 4) == 0 && cardsMatched / moveCount < 0.15){
		starCount--;
	}

	let scorePanel = document.querySelector('.score-panel');
	clearNode('.stars', scorePanel);
	for (i = 0; i < starCount; i++) {
		let starContainer = document.createDocumentFragment();
		let aStar = document.createElement('img');
		aStar.classList.add('star');
		aStar.setAttribute('src', 'img/star/128.png');
		aStar.setAttribute('srcset', 'img/star/16.png 16w, img/star/32.png 32w, img/star/64.png 64w, img/star/128.png 128w');
		aStar.setAttribute('sizes', '25px');
		aStar.setAttribute('alt', 'Gold Star');
		starContainer.appendChild(aStar);
		scorePanel.querySelector('.stars').appendChild(starContainer);
	}

	// Update moves.
	scorePanel.querySelector('.moves').innerText = moveCount;

}

// A simple timer with formatted output.
function clock(timeLocation = body) {
	this.running;
	this.time = 0;
	this.tick = function () {
		document.querySelector(timeLocation).innerHTML = `${Math.floor(this.time / 60)}m ${this.time % 60}s`;
		this.time++;
	};
	this.start = function () {
		if (!this.running) {
			// If timer is already running do not double it.
			let target = this;
			this.running = setInterval(function () {target.tick();}, 1000);
			return true;
		} else {
			return false;
		}
	};
	this.stop = function () {
		clearInterval(this.running);
		this.running = false;
		return !this.running;
	};
	this.reset = function () {
		this.stop();
		this.time = 0;
		this.tick();
	};
}

function clearNode(theNode, target = document) {
	// Clears a node.
	let cleanNode = target.querySelector(theNode);
	while (cleanNode.firstChild) {
		cleanNode.removeChild(cleanNode.firstChild);
	}
}

function victoryCheck() {
	// If all cards are matched prints a winning message via madlibs with player stats.
	if (cardsMatched >= cardsMatchedNeeded) {
		timer.stop();
		playSound('win');
		let victoryDefault = `<p>Against all odds you were able to defeat [cardsMatched] foes in only [moveCount] deft strikes! The humble villagers have gathered to promote you to the rank of [starCount] star general. In honor of your victory the common folk now observe a moment of silence for [minutes][seconds] each day.</p>`;
		let victoryCurrent = victoryDefault.replace('[cardsMatched]', cardsMatched);
		victoryCurrent = victoryCurrent.replace('[moveCount]', moveCount);
		victoryCurrent = victoryCurrent.replace('[starCount]', starCount > 0 ? starCount : `first`);
		victoryCurrent = victoryCurrent.replace('[minutes]',Math.floor(timer.time / 60) > 0 ? `${Math.floor(timer.time / 60)} minute${Math.floor(timer.time / 60) > 1 ? `s ` : `` } ` :	` `);
		victoryCurrent = victoryCurrent.replace('[seconds]', timer.time % 60 > 0 ? `${timer.time % 60} second${timer.time % 60 > 1 ? `s` : ``}` : ``);
		document.querySelector('.victory-text').innerHTML = victoryCurrent;
		document.querySelector('.modal-container').classList.remove('hidden');
		return true;
	} else {
		return false;
	}
}

function playSound(sound) {
	let audio = new Audio('sound/' + sound + '.mp3');
	audio.play();
}

function shuffle(array) {
	// Shuffle function from http://stackoverflow.com/a/2450976
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}