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
    btnBack.x = 65;
    btnBack.y = 360;
    btnBack.buttonHelper = new createjs.ButtonHelper(btnBack, "btnBackUp", "btnBackDown", "btnBackDown", false);
    screen.addChild(btnBack);
    btnBack.addEventListener("click", onClick);

    var lblInstructions = assetManager.getSprite("assets");
    lblInstructions.gotoAndStop("instructions");
    lblInstructions.x = 70;
    lblInstructions.y = 40;
    screen.addChild(lblInstructions);


    /************** Public Methods**************/
    this.showMe = function () {
        stage.addChild(screen);
    };

    this.hideMe = function () {
        stage.removeChild(screen);
    };

    /************** Event Handlers **************/
    function onClick(e) {
        eventScreenComplete.buttonNumber = 0;
        stage.dispatchEvent(eventScreenComplete);
        createjs.Sound.play("buttonClick");
    }

};