/* globals createjs */
/*jshint browser:true */
/*jshint devel:true */
/*jshint esversion: 6 */
var IntroScreen = function (assetManager, stage) {

    //CustomEvent
    var eventScreenComplete = new CustomEvent("introFinished");

    //construct container object
    var screen = new createjs.Container();

    var hitAreaSprite = assetManager.getSprite("assets");
    //add play button
    var btnPlay = assetManager.getSprite("assets");
    btnPlay.gotoAndStop("btnPlayUp");
    btnPlay.x = 100;
    btnPlay.y = 340;
    btnPlay.buttonHelper = new createjs.ButtonHelper(btnPlay, "btnPlayUp", "btnPlayDown", "btnPlayDown", false, hitAreaSprite, "hitArea");
    screen.addChild(btnPlay);
    btnPlay.addEventListener("click", onClickPlay);

    //add instruction button
    var btnInstruction = assetManager.getSprite("assets");
    btnInstruction.gotoAndStop("btnInstructionsUp");
    btnInstruction.x = 300;
    btnInstruction.y = 340;
    btnInstruction.buttonHelper = new createjs.ButtonHelper(btnInstruction, "btnInstructionsUp", "btnInstructionsDown", "btnInstructionsDown", false, hitAreaSprite, "hitArea");
    screen.addChild(btnInstruction);
    btnInstruction.addEventListener("click", onClickInstruction);


    //------------------------------public methods
    this.showMe = function () {
        stage.addChild(screen);
    };

    this.hideMe = function () {
        stage.removeChild(screen);
    };

    //-----------------------------event handlers
    function onClickPlay(e) {
        eventScreenComplete.buttonNumber = 1;

        stage.dispatchEvent(eventScreenComplete);
    }

    function onClickInstruction(e) {
        eventScreenComplete.buttonNumber = 2;

        stage.dispatchEvent(eventScreenComplete);
    }

};