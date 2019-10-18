'use strict';

const gameState = {
    /*
    The gameState constant contains all variables that may
    change during the course of the game. The settings below
    are set in newGame() but are also specified here for
    reference.
    */
    modal: null,
    score: 0,
    lives: 3,
    speed: 0,
    keyState: false
};

const gameData = {
    /*
    The gameData constant contains all settings for the game.
    This allows multiple functions to use the same adjustments
    across the entirety of the program.
    */
    enemyMaxSpeed: 200,
    enemyMinSpeed: 20,
    enemySpawnDelayMax: 5500,
    enemySpawnDelayMin: 500,
    enemyCountInitial: 4,
    gemSpawnModulo: 3,
    gemCountMax: 2,
    gemHoverSpeed: 15,
    gemHoverDistance: 10,
    gemAlpha: 0.8,
    width: 505,
    height: 606,
    columns: {
        qty: 5,
        size: 101, // Pixel height of the game tiles.
        positions: null // Defined in gameDataMath()
    },
    rows: {
        qty: 6,
        size: 83, // Pixel width of the game tiles.
        positions: null // Defined in gameDataMath()
    },
    playerInfo: {
        sprite: 'img/char-boy.png',
        width: 66,
        height: 75,
        offset: {
            // Offset to start drawing objects on each tile.
            xPos: 16.5,
            yPos: 11
        }
    },
    enemyInfo: {
        sprite: 'img/enemy-bug.png',
        width: 97,
        height: 70,
        offset: {
            // Offset to start drawing objects on each tile.
            xPos: 0,
            yPos: 17
        }
    },
    gemInfo: {
        sprite: 'img/gem-green.png',
        width: 95,
        height: 105,
        offset: {
            // Offset to start drawing objects on each tile.
            xPos: 3,
            yPos: -15
        }
    },
    playerStart: {
        // Defined in gameDataMath()
        xPos: null,
        yPos: null
    }
};

const modalScreen = {
    /*
    This constant contains all the messages used in the game modals.
    They are built sequentially so if content needs to change (for
    example from regular text to bold) the tag should be added.
    However, if the following item retains the same settings then
    you do not need to restate the applicable setting.
    */
    welcome: [{
            type: 'text',
            content: 'Welcome!',
            color: 'black',
            align: 'center',
            font: 'bold 30px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 5
        },
        {
            type: 'text',
            content: 'You are very excited',
            color: 'black',
            align: 'center',
            font: 'bold 22px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 4.2
        },
        {
            type: 'text',
            content: 'to play this game!',
            xPos: gameData.width / 2,
            yPos: gameData.height / 3.7
        },
        {
            type: 'image',
            content: gameData.playerInfo.sprite,
            width: gameData.playerInfo.width,
            height: gameData.playerInfo.height,
            xPos: (gameData.width / 2) - (gameData.playerInfo.width / 2),
            yPos: gameData.height / 3.2
        },
        {
            type: 'text',
            content: 'Control Lil\' Dude with ←↑→↓ or WASD!',
            font: '18px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 2
        },
        {
            type: 'text',
            content: 'Pause the game with P or PAUSE!',
            font: '18px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 1.9
        },
        {
            type: 'text',
            content: 'Press SPACE or RETURN to start!',
            font: 'italic 18px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 1.7
        }
    ],
    paused: [{
            type: 'text',
            content: 'The game is paused!',
            color: 'black',
            align: 'center',
            font: 'bold 30px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 5
        },
        {
            type: 'text',
            content: 'You are very excited',
            color: 'black',
            align: 'center',
            font: 'bold 22px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 4.2
        },
        {
            type: 'text',
            content: 'that the game is paused!',
            xPos: gameData.width / 2,
            yPos: gameData.height / 3.7
        },
        {
            type: 'text',
            content: 'Press P or PAUSE to continue!',
            xPos: gameData.width / 2,
            yPos: gameData.height / 2.7
        },
        {
            type: 'text',
            content: '"The pause screen was magnificent. 10/10"',
            font: '15px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 2
        },
        {
            type: 'text',
            content: '-Gamespot',
            align: 'right',
            font: 'italic 15px Arial',
            xPos: gameData.width / 1.2,
            yPos: gameData.height / 1.9
        },
        {
            type: 'text',
            content: '"AAA pause screen innovation. 5 stars."',
            align: 'center',
            font: '15px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 1.7
        },
        {
            type: 'text',
            content: '-IGN',
            align: 'right',
            font: 'italic 15px Arial',
            xPos: gameData.width / 1.2,
            yPos: gameData.height / 1.62
        },
        {
            type: 'text',
            content: '"This game made us ban Hanzo mains."',
            align: 'center',
            font: '15px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 1.45
        },
        {
            type: 'text',
            content: '-Blizzard Entertainment (probably.)',
            align: 'right',
            font: 'italic 15px Arial',
            xPos: gameData.width / 1.2,
            yPos: gameData.height / 1.38
        }
    ],
    gameOver: [{
            type: 'text',
            content: 'You are dead!',
            color: 'black',
            align: 'center',
            font: 'bold 30px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 5
        },
        {
            type: 'text',
            content: 'You are very excited',
            color: 'black',
            align: 'center',
            font: 'bold 22px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 4.2
        },
        {
            type: 'text',
            content: 'to be dead!',
            xPos: gameData.width / 2,
            yPos: gameData.height / 3.7
        },
        {
            type: 'image',
            content: gameData.playerInfo.sprite,
            width: gameData.playerInfo.width,
            height: gameData.playerInfo.height,
            xPos: (gameData.width / 2) - (gameData.playerInfo.width / 2),
            yPos: gameData.height / 3.2
        },
        {
            type: 'text',
            content: '[ D E A D ]',
            color: 'RED',
            stroke: 'black',
            align: 'center',
            font: 'bold 28px Impact',
            xPos: gameData.width / 2,
            yPos: gameData.height / 2.5
        },
        {
            type: 'text',
            get content() {
                return `You earned ${gameState.score.toLocaleString()} points! That's okay!`;
            },
            color: 'black',
            align: 'center',
            font: 'bold 15px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 2
        },
        {
            type: 'text',
            content: 'Press SPACE or RETURN to stop being dead!',
            xPos: gameData.width / 2,
            yPos: gameData.height / 1.9
        },
        {
            type: 'text',
            content: '"A strange game.',
            font: '15px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 1.6
        },
        {
            type: 'text',
            content: 'The only winning move is not to play."',
            font: '15px Arial',
            xPos: gameData.width / 2,
            yPos: gameData.height / 1.52
        },
        {
            type: 'text',
            content: '-Joshua, WarGames',
            align: 'right',
            font: 'italic 15px Arial',
            xPos: gameData.width / 1.2,
            yPos: gameData.height / 1.45
        }
    ]
};

(function gameDataMath() {
    /*
    Additional settings to be calculated after initial setup.
    I do not use get/set in gameData to save calculations during the game.
    */

    gameData.columns.position = buildPositions(gameData.columns);
    gameData.rows.positions = buildPositions(gameData.rows);
    gameData.playerStart = {
        xPos: gameData.columns.position[Math.floor(gameData.columns.position.length / 2)] + gameData.playerInfo.offset.xPos,
        yPos: gameData.rows.positions[gameData.rows.positions.length - 1] + gameData.playerInfo.offset.yPos
    };

    function buildPositions(settings) {
        // Takes settings and converts them to an array containing possible positions on the board.
        let positionArray = [];
        for (let i = 0; i < settings.qty; i++) {
            positionArray.push(i * settings.size);
        }
        return positionArray;
    }
})();

class Unit {
    /*
    A generic class for all units in the game.
    */
    constructor(loc = [0, 0], sprite = 'img/rock.png') {
        this.xPos = loc[0];
        this.yPos = loc[1];
        this.sprite = sprite;
    }

    render(alphaValue = 1) {
        // Draw the unit to the screen.
        if (alphaValue != 1) ctx.globalAlpha = alphaValue;
        ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
        if (alphaValue != 1) ctx.globalAlpha = 1;
    }

    static randomPosition(type, offset = 0) {
        if (type == 'row') {
            // Generate a number between 1 and the maximum amount of rows available.
            // Then use that number to get the appropriate pixel height from yRows.
            let safeZoneTotal = 2;
            let safeZoneBottom = 1;
            return gameData.rows.positions[Math.floor(Math.random() * (gameData.rows.qty - safeZoneTotal) + safeZoneBottom)] + offset;
        } else if (type == 'column') {
            // Similar to above, but all columns are valid.
            return gameData.columns.position[Math.floor(Math.random() * gameData.columns.qty)] + offset;
        }
    }
}

class PlayerUnit extends Unit {
    /*
    Player unit subclass.
    Although there is only one player I used a class incase I would
    like to make the game multi-player later.
    */
    constructor(loc = [gameData.playerStart.xPos, gameData.playerStart.yPos], sprite = gameData.playerInfo.sprite) {
        super(loc, sprite);
        this.keyPause = false;
    }

    update(dt) {
        /*
        Check player has reached the other side, if so lock
        the controls and play a short animation before warping
        them back to the start area.
        */
        if (this.keyPause == false && this.yPos <= gameData.rows.positions[0] + gameData.playerInfo.offset.yPos) {
            this.keyPause = true;
            const bounce = setInterval(() => this.yPos >= gameData.rows.positions[0] - 25 ? this.yPos-- : this.yPos = gameData.rows.positions[0] + gameData.playerInfo.offset.yPos, dt * 600);
            playSound('levelup');
            setTimeout(() => {
                this.reset();
                PlayerUnit.playerAction('crossed');
                clearInterval(bounce);
                this.keyPause = false;
            }, 1000);
        }

        // Check for enemy collisions and if so, reset the player.
        for (let i = 0; i < gameData.enemyUnits.length; i++) {
            let enemy = gameData.enemyUnits[i];
            if (this.keyPause == false && enemy.xPos < this.xPos + gameData.playerInfo.width && enemy.xPos + gameData.enemyInfo.width > this.xPos && enemy.yPos < this.yPos + gameData.playerInfo.height && gameData.enemyInfo.height + enemy.yPos > this.yPos) {
                this.keyPause = true;
                this.posSnapshot = {
                    xPos: this.xPos,
                    yPos: this.yPos
                };
                const blink = setInterval(() => this.xPos >= this.posSnapshot.xPos ? this.xPos = -10000 : this.xPos = this.posSnapshot.xPos, dt * 500);
                playSound('hit');
                setTimeout(() => {
                    this.reset();
                    PlayerUnit.playerAction('death');
                    clearInterval(blink);
                    delete this.posSnapshot;
                    this.keyPause = false;
                }, 1000);
            }
        }
    }

    reset() {
        // Returns the player to the bottom center tile, rounding if necessary.
        this.xPos = gameData.playerStart.xPos;
        this.yPos = gameData.playerStart.yPos;
    }
    static playerAction(status) {
        switch (status) {
            case 'crossed':
                // Against all odds, the player has crossed. Penalize appropriately (and maybe spawn a gem.)
                gameState.score <= 1 ? gameState.score++ : gameState.score *= gameState.speed;
                gameState.speed++;
                if (gameState.speed % gameData.gemSpawnModulo == 0 && gameData.gemUnits.length < gameData.gemCountMax) GemUnit.spawn();
                break;
            case 'death':
                gameState.score = Math.floor(gameState.score * 0.9);
                gameState.lives--;
                if (gameState.lives < 1) {
                    playSound('dead');
                    gameState.modal = modalScreen.gameOver;
                }
                break;
            case 'gem':
                gameState.lives++;
                break;
        }
    }
}

class EnemyUnit extends Unit {
    /*
    Enemy unit subclass.
    When called and enemy will be  spawned on a random row and drawn
    off-screen a distance equal to the negative width of it's sprite.
    Each enemy will have a random speed assigned as set in gameData.
    The speed is dynamically increased as the player levels up.
    */
    constructor(loc = [-gameData.enemyInfo.width, Unit.randomPosition('row', gameData.enemyInfo.offset.yPos)], sprite = gameData.enemyInfo.sprite) {
        super(loc, sprite);
        this.baseSpeed = Math.floor(Math.random() * gameData.enemyMaxSpeed) + gameData.enemyMinSpeed;
        this.enemySpeed = () => this.baseSpeed * gameState.speed;
    }
    update(dt) {
        /*
        Move the enemy according to its individual speed adjusted by
        the enemySpeed, delta time, and gameSpeed. An additional
        Math.random() is added to create an irregular crawling effect.
        */
        this.xPos += this.enemySpeed() * dt * Math.random();

        // If the enemy has cleared the board, destroy it.
        if (this.xPos >= gameData.columns.position[gameData.columns.position.length - 1] + gameData.enemyInfo.width) {
            this.destroy();
        }
    }
    destroy() {
        // Get index of self and delete.
        gameData.enemyUnits.splice(gameData.enemyUnits.indexOf(this), 1);
    }
    static spawn(loc) {
        // Spawn a unit, if location is not specified it will be chosen at random.
        gameData.enemyUnits.push(new EnemyUnit(loc));
    }
    static newSpawn() {
        /*
        Fill the board with random enemies.
        First generate a new random location on the board, then
        check it against the previously generated enemies. If a
        duplicate is found break the check loop and regenerate.
        Note: enemyInitialCount can not exceed the grid area or
        the loop will never exit.
        */

        while (gameData.enemyUnits.length < gameData.enemyCountInitial) {
            let newEnemyUnit = [Unit.randomPosition('column') - gameData.enemyInfo.width, Unit.randomPosition('row') + gameData.enemyInfo.offset.yPos];
            let isDuplicate = false;
            for (let i = 0; i < gameData.enemyUnits.length; i++) {
                if ([gameData.enemyUnits[i].xPos, gameData.enemyUnits[i].yPos].toString() == newEnemyUnit.toString()) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) EnemyUnit.spawn(newEnemyUnit);
        }
    }
}

class GemUnit extends Unit {
    /*
    Gem unit subclass.
    When called a gem will have a % chance of spawning randomly
    on the grid. These chances can be adjusted in gameData.
    */
    constructor(loc = [Unit.randomPosition('column') + gameData.gemInfo.offset.xPos, Unit.randomPosition('row') + gameData.gemInfo.offset.yPos], sprite = gameData.gemInfo.sprite) {
        super(loc, sprite);
        this.touched = false;
        this.xPosBase = loc[0];
        this.yPosBase = loc[1];
        this.hover = 1;
    }
    update(dt) {
        // Give gems a hover animation, settings in gameData.
        this.yPos += gameData.gemHoverSpeed * dt * this.hover;
        if (this.yPos >= this.yPosBase) {
            this.hover = -1;
        } else if (this.yPos <= this.yPosBase - gameData.gemHoverDistance) {
            this.hover = 1;
        }

        // Check for gem collision and if so punish them with extra lives.
        let thePlayer = gameData.playerUnit;
        if (this.touched == false && thePlayer.xPos < this.xPos + gameData.playerInfo.width && thePlayer.xPos + gameData.playerInfo.width > this.xPos && thePlayer.yPos < this.yPos + gameData.gemInfo.height && gameData.playerInfo.height + thePlayer.yPos > this.yPos) {
            this.touched = true;
            this.posSnapshot = {
                xPos: this.xPos,
                yPos: this.yPos
            };
            const blink = setInterval(() => this.xPos >= this.posSnapshot.xPos ? this.xPos = -10000 : this.xPos = this.posSnapshot.xPos, dt * 500);
            playSound('gem-get');
            setTimeout(() => {
                this.collect();
                PlayerUnit.playerAction('gem');
                clearInterval(blink);
                delete this.posSnapshot;
            }, 1000);
        }
    }
    collect() {
        // Get index of self and delete.
        gameData.gemUnits.splice(gameData.gemUnits.indexOf(this), 1);
    }
    static spawn() {
        /*
        Generate a gem in a random location. If the location is a duplicate
        it will regenerate. Only should be called with gemCountMax or can lock.
        */
        let isDuplicate = true;
        let newGemUnit = new GemUnit();

        while (isDuplicate && gameData.gemUnits.length > 0) {
            isDuplicate = false;
            for (let i = 0; i < gameData.gemUnits.length; i++) {
                if ([gameData.gemUnits[i].xPosBase, gameData.gemUnits[i].yPosBase].toString() == [newGemUnit.xPos, newGemUnit.yPos].toString()) {
                    isDuplicate = true; // A duplicate is found!
                    break;
                }
            }
            if (isDuplicate) newGemUnit = new GemUnit(); // Try again...
        }
        /*
        Now that we know it's good, determine where to place it so it
        overlaps correctly with other gems. If empty just place it.
        */
        playSound('gem-spawn');
        gameData.gemUnits.push(newGemUnit); // It's good!
        gameData.gemUnits.sort((a, b) => a.yPos == b.yPos ? 0 : (a.yPos > b.yPos ? 1 : -1));
    }
}

/* Adds keyboard functionality and spam protection */
document.addEventListener('keydown', keyHelper.bind(this.event));
document.addEventListener('keyup', keyGuard.bind(this.event));

function newGame() {
    /*
    Resets the game to it's default ready-to-play values.
    */
    gameData.playerUnit = new PlayerUnit();
    gameData.enemyUnits = [];
    gameData.gemUnits = [];
    gameState.modal = modalScreen.welcome;
    gameState.score = 0;
    gameState.lives = 3;

    EnemyUnit.newSpawn();
}

function keyHelper(event) {
    /*
    Assigns functionality to all keys used in the game.
    */
    event.preventDefault();
    if (gameState.keyState) return;
    gameState.keyState = true;

    const allowedKeys = {
        37: 'key_left',
        38: 'key_up',
        39: 'key_right',
        40: 'key_down',
        65: 'key_a',
        87: 'key_w',
        68: 'key_d',
        83: 'key_s',
        32: 'key_space',
        13: 'key_return',
        19: 'key_pause',
        80: 'key_p'
    };
    const playerTarget = gameData.playerUnit;
    const allowMove = gameState.speed > 0 && gameState.modal == null && gameData.playerUnit.keyPause == false;

    switch (allowedKeys[event.keyCode]) {
        case 'key_right':
        case 'key_d':
            if (allowMove) playerTarget.xPos >= gameData.columns.position[gameData.columns.position.length - 1] - gameData.playerInfo.offset.xPos ? playSound('wall') : (playerTarget.xPos += gameData.columns.size);
            break;
        case 'key_left':
        case 'key_a':
            if (allowMove) playerTarget.xPos <= gameData.columns.position[0] + gameData.playerInfo.offset.xPos ? playSound('wall') : (playerTarget.xPos -= gameData.columns.size);
            break;
        case 'key_down':
        case 'key_s':
            if (allowMove) playerTarget.yPos >= gameData.rows.positions[gameData.rows.positions.length - 1] - gameData.playerInfo.offset.yPos ? playSound('wall') : (playerTarget.yPos += gameData.rows.size);
            break;
        case 'key_up':
        case 'key_w':
            if (allowMove) playerTarget.yPos <= gameData.rows.positions[0] + gameData.playerInfo.offset.yPos ? playSound('wall') : (playerTarget.yPos -= gameData.rows.size); // Technically this should never fail due to resetting position but you know how that goes...
            break;
        case 'key_space':
        case 'key_return':
            modalHelper();
            break;
        case 'key_p':
        case 'key_pause':
            pauseToggle();
            break;
    }

    function modalHelper() {
        /*
        Assigns specific actions to various modal screens.
        Pause is not defined here as it is a special case.
        In the future they can be combined.
        */
        switch (gameState.modal) {
            case modalScreen.welcome:
                gameState.modal = null;
                gameState.speed = 1;
                break;
            case modalScreen.gameOver:
                newGame();
                break;
        }
    }

    function pauseToggle() {
        if (gameState.speed > 0) {
            // Stop game loop.
            gameState.speedPaused = gameState.speed;
            gameState.speed = 0;
            gameState.modal = modalScreen.paused;
        } else {
            // Restart game loop.
            gameState.modal = null;
            gameState.speed = gameState.speedPaused;
            delete gameState.speedPaused;
        }
    }
}

function keyGuard(event) {
    /*
    Prevents spamming the game by simply holding down a key.
    */
    event.preventDefault();
    gameState.keyState = false;
}

(function cacheSound() {
    /*
    Temporary cache function until updating
    resources.js to include multiple file types.
    */

    window.playSound = (sound) => {
        gameData.audio[sound].play();
    }

    const loadAudio = [
        'dead',
        'gem-get',
        'gem-spawn',
        'hit',
        'levelup',
        'select-down',
        'select-up',
        'wall'
    ];
    gameData.audio = {};

    for (let i = 0; i < loadAudio.length; i++) {
        gameData.audio[loadAudio[i]] = new Audio(`snd/${loadAudio[i]}.mp3`);
    }

})();

function enemySpawnLoop() {
    /*
    Loops random spawning, decreases spawn time as game speed increases.
    Will skip cycle(s) if the game is paused.
    */
    setTimeout(function () {
        if (gameState.speed > 0) EnemyUnit.spawn();
        enemySpawnLoop();
    }, (Math.floor(Math.random() * (gameData.enemySpawnDelayMax - gameData.enemySpawnDelayMin)) + gameData.enemySpawnDelayMin) / gameState.speed);
}

/*
TODO: Fix: When window loses focus it sometimes causes a bug frenzy?
TODO: Fix: Animations do not follow dynamic DT once set.
TODO: Feat: Player avatar select.
TODO: Refactor: Animation functions from PlayerUnit into Unit.
TODO: Feat: Game reset button (possibly on pause screen.)
TODO: Feat: Combine audio cache into resources.js
TODO: Refactor: Get column, row, playerInfo, enemyInfo size dynamically using buildSpriteInfo().
TODO: Refactor: Merge PAUSE modal functionality into modalHelper()
*/