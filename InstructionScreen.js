/* globals createjs */
/*jshint browser:true */
/*jshint devel:true */
/*jshint esversion: 6 */
var InstructionScreen = function (assetManager, stage) {

    //CustomEvent
    var eventScreenComplete = new CustomEvent("instructionFinished");

    //construct container object
    var screen = new createjs.Container();

    var hitAreaSprite = assetManager.getSprite("assets");
    //add play button
    var btnBack = assetManager.getSprite("assets");
    btnBack.gotoAndStop("walkDown");
    btnBack.x = 120;
    btnBack.y = 340;
    btnBack.buttonHelper = new createjs.ButtonHelper(btnBack, "walkDown", "walkDown", "walkDown", false, hitAreaSprite, "hitArea");
    screen.addChild(btnBack);
    btnBack.addEventListener("click", onClick);



    //------------------------------public methods
    this.showMe = function () {
        stage.addChild(screen);
    };

    this.hideMe = function () {
        stage.removeChild(screen);
    };

    //-----------------------------event handlers
    function onClick(e) {
        stage.dispatchEvent(eventScreenComplete);
    }

};