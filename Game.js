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
    var myMusic = null;

    //screens
    var introScreen = null;
    var contentScreen = null;
    var instructionScreen = null;

    //add in background
    var background = null;

    /************** Event Handlers **************/
    function onInit() {
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
        stage.removeEventListener("onAllAssetsLoaded", onSetup);

        // construct game objects
        background = assetManager.getSprite("assets");
        background.gotoAndStop("backgroundTwo");
        stage.addChild(background);

        introScreen = new IntroScreen(assetManager, stage);
        contentScreen = new ContentScreen(assetManager, stage, introScreen);
        instructionScreen = new InstructionScreen(assetManager, stage);

        //Repeat background music on continuous loop
        myMusic = new Audio('lib/gameMusic.ogg');
        myMusic.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
        myMusic.play();

        introScreen.showMe();

        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);

        stage.addEventListener("introFinished", onIntroFinished);
        stage.addEventListener("instructionFinished", onInstructionFinished);
        stage.addEventListener("contentFinished", onContentFinished);

    }

    function onTick(e) {
        // update the stage!
        stage.update();
    }

    function onIntroFinished(e) {
        if (e.buttonNumber === 1) {
            introScreen.hideMe();
            contentScreen.showMe();
        } else if (e.buttonNumber === 2) {
            introScreen.hideMe();
            instructionScreen.showMe();
        }
    }

    function onInstructionFinished(e) {
        if (e.buttonNumber === 0) {
            introScreen.showMe();
            instructionScreen.hideMe();
        }
    }

    function onContentFinished(e) {
        if (e.buttonNumber === 0) {
            introScreen.showMe();
            contentScreen.hideMe();
        }
    }

})();