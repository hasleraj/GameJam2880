/* globals createjs */
/*jshint browser:true */
/*jshint devel:true */
/*jshint esversion: 6 */
/*globals AssetManager */
/* globals manifest */
/*globals Player */
/* globals Fireball */
/* globals Compass */
/* globals IntroScreen */
/* globals ContentScreen */
/* globals InstructionScreen */

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

    //screens
    var introScreen = null;
    var contentScreen = null;
    var instructionScreen = null;

    // ------------------------------------------------------------ event handlers
    function onInit() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("stage");
        // set canvas to as wide/high as the browser window
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.backgroundColor = "#395D33";
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

        introScreen = new IntroScreen(assetManager, stage);
        contentScreen = new ContentScreen(assetManager, stage);
        instructionScreen = new InstructionScreen(assetManager, stage);

        introScreen.showMe();

        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);


        stage.addEventListener("introFinished", onIntroFinished);

        console.log(">> main screen ready");
    }

    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

        // update the stage!
        stage.update();
    }

    function onIntroFinished(e) {
        console.log("intro is finished");
        if (e.buttonNumber === 1) {
            console.log("heading to content screen");
            introScreen.hideMe();
            contentScreen.showMe();

        } else {
            console.log("heading to content screen");

            introScreen.hideMe();
            instructionScreen.showMe();
        }
    }

})();