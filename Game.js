/* globals createjs */
/*jshint browser:true */
/*jshint devel:true */
/*jshint esversion: 6 */
/*globals AssetManager */
/* globals manifest */
/*globals Player */
/* globals Fireball */

(function () {
    "use strict";

    window.addEventListener("load", onInit);

    // game variables
    var stage = null;
    var canvas = null;

    // frame rate of game
    var frameRate = 24;
    // game objects
    var assetManager = null;
    // custom player class
    var entity = null;

    // keyboard variables
    var downKey = false;
    var upKey = false;
    var leftKey = false;
    var rightKey = false;
    var moving = null;

    // fireball timer to add gameplay
    var fireballTimer = null;
    var fireballDelay = 0;
    // object pooling
    var fireballMax = 50;
    var fireballPool = [];

    // ------------------------------------------------------------ private methods


    // ------------------------------------------------------------ event handlers
    function onInit() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("stage");
        // set canvas to as wide/high as the browser window
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.backgroundColor = "#FFFFFF";
        // create stage object
        stage = new createjs.Stage(canvas);

        // construct preloader object to load spritesheet and sound assets
        assetManager = new AssetManager(stage);
        stage.addEventListener("onAllAssetsLoaded", onSetup);
        // load the assets
        assetManager.loadAssets(manifest);
    }

    function onSetup(e) {
        console.log(">> adding sprites to game");
        stage.removeEventListener("onAllAssetsLoaded", onSetup);

        downKey = false;
        upKey = false;
        leftKey = false;
        rightKey = false;

        entity = new Player(assetManager, stage, 275, 275);
        entity.showMe();

        entity.resetKeys();

        // fireball object pooling - constructing fireball objects
        for (var i = 0; i < fireballMax; i++) {
            fireballPool.push(new Fireball(stage, assetManager, entity));
        }

        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);

        // setup event listener to start game
        document.addEventListener("click", onStartGame);
        console.log(">> game ready");
    }

    function onStartGame(e) {

        // construct and setup fireballtimer to drop fireballs on display list
        fireballDelay = 500;
        console.log("Into start game");
        fireballTimer = window.setInterval(onAddFireball, fireballDelay);

        // current state of keys
        leftKey = false;
        rightKey = false;
        upKey = false;
        downKey = false;

    }

    function onGameOver(e) {
        // gameOver
        clearInterval(fireballTimer);

    }

    function onAddFireball(e) {
        // find fireball in pool and add to game
        for (var i = 0; i < fireballPool.length; i++) {
            var newFireball = fireballPool[i];
            if (newFireball.getActive() === false) {
                newFireball.setActive(true);
                newFireball.setupMe();
                newFireball.releaseMe();
                break;
            }
        }
    }

    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

        // game loop code here
        // update all fireballs (their mover) in pool if active
        for (var n = 0; n < fireballPool.length; n++) {
            if (fireballPool[n].getActive()) fireballPool[n].updateMe();
        }

        entity.update();
        // update the stage!
        stage.update();
    }

})();