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
    var btnBack = assetManager.getSprite("assets");
    btnBack.gotoAndStop("walkDown");
    btnBack.x = 200;
    btnBack.y = 340;
    btnBack.buttonHelper = new createjs.ButtonHelper(btnBack, "btnBackUp", "btnBackDown", "btnBackDown", false, hitAreaSprite, "hitArea");
    screen.addChild(btnBack);
    btnBack.addEventListener("click", onClick);

    var lblInstructions = assetManager.getSprite("assets");
    lblInstructions.gotoAndStop("instructions");
    lblInstructions.x = 70;
    lblInstructions.y = 40;
    screen.addChild(lblInstructions);



    //------------------------------public methods
    this.showMe = function () {
        stage.addChild(screen);
    };

    this.hideMe = function () {
        stage.removeChild(screen);
    };

    //-----------------------------event handlers
    function onClick(e) {
        eventScreenComplete.buttonNumber = 0;
        stage.dispatchEvent(eventScreenComplete);
    }

};