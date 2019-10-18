/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */
var Engine = (function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = gameData.width;
    canvas.height = gameData.height;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        newGame();
        lastTime = Date.now();
        main();
        enemySpawnLoop();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        for (i = 0; i < gameData.enemyUnits.length; i++) {
            gameData.enemyUnits[i].update(dt);
        };
        for (i = 0; i < gameData.gemUnits.length; i++) {
            gameData.gemUnits[i].update(dt);
        };
        gameData.playerUnit.update(dt);
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'img/grass-block.png', // Top row is water
                'img/stone-block.png', // Row 1 of 3 of stone
                'img/stone-block.png', // Row 2 of 3 of stone
                'img/stone-block.png', // Row 3 of 3 of stone
                'img/stone-block.png', // Row 1 of 2 of grass
                'img/grass-block.png' // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        gameState.modal ? renderModal(gameState.modal) : renderEntities();

        renderScoreboard();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        for (i = 0; i < gameData.enemyUnits.length; i++) {
            gameData.enemyUnits[i].render();
        };

        for (i = 0; i < gameData.gemUnits.length; i++) {
            gameData.gemUnits[i].render(gameData.gemAlpha);
        };

        gameData.playerUnit.render();
    }

    function renderModal(content) {
        // Draws a semi-transparent square and fills it with selected content.
        const modalW = gameData.width * 0.8;
        const modalH = gameData.height * 0.7;
        const modalX = gameData.width * 0.1;
        const modalY = gameData.height * 0.1;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(modalX, modalY, modalW, modalH);

        // Goes through selected object and renders individual pieces to the modal.
        // Later this can be optimized and cached.
        for (i = 0; i < content.length; i++) {
            let cont = content[i];
            switch (content[i].type) {
                case 'text':
                    // If setting does not exist use setting from last.
                    if (cont.font) ctx.font = cont.font;
                    if (cont.color) ctx.fillStyle = cont.color;
                    if (cont.align) ctx.textAlign = cont.align;
                    if (cont.stroke) {
                        ctx.strokeStyle = cont.stroke;
                        ctx.lineWidth = 4;
                        ctx.strokeText(cont.content, cont.xPos, cont.yPos);
                    }
                    ctx.fillText(cont.content, cont.xPos, cont.yPos);
                    break;
                case 'image':
                    ctx.drawImage(Resources.get(cont.content), cont.xPos, cont.yPos);
                    break;
            }
        };
    }

    function renderScoreboard() {
        // Provides scoreboard display.
        const score = {
            points: `Score: ${gameState.score.toLocaleString()}`,
            lives: `Lives: ${gameState.lives.toLocaleString()}`,
            xPos: 10,
            yPos: 50
        };
        ctx.font = '28px Impact';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.strokeText(score.points, score.xPos, score.yPos);
        ctx.fillText(score.points, score.xPos, score.yPos);

        ctx.textAlign = 'right';
        ctx.strokeText(score.lives, gameData.width - score.xPos, score.yPos);
        ctx.fillText(score.lives, gameData.width - score.xPos, score.yPos);
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        //'img/heart.png',
        //'img/key.png',
        'img/rock.png',
        //'img/star.png',
        //'img/char-cat-girl.png',
        //'img/char-horn-girl.png',
        //'img/char-pink-girl.png',
        //'img/char-princess-girl.png',
        'img/char-boy.png',
        'img/enemy-bug.png',
        'img/gem-blue.png',
        'img/gem-green.png',
        'img/gem-orange.png',
        'img/grass-block.png',
        //'img/selector.png',
        //'img/water-block.png',
        'img/stone-block.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);