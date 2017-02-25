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


    var background = assetManager.getSprite("assets");
    background.gotoAndStop("selectACharacter");
    screen.addChild(background);

    /************** Play Button Setup **************/
    var btnPlay = assetManager.getSprite("assets");
    btnPlay.gotoAndStop("btnPlayUp");
    btnPlay.x = 100;
    btnPlay.y = 340;
    btnPlay.buttonHelper = new createjs.ButtonHelper(btnPlay, "btnPlayUp", "btnPlayDown", "btnPlayDown", false, hitAreaSprite, "hitArea");
    screen.addChild(btnPlay);
    btnPlay.addEventListener("click", onClickPlay);

    /************** Instruction Button Setup **************/
    var btnInstruction = assetManager.getSprite("assets");
    btnInstruction.gotoAndStop("btnInstructionsUp");
    btnInstruction.x = 300;
    btnInstruction.y = 340;
    btnInstruction.buttonHelper = new createjs.ButtonHelper(btnInstruction, "btnInstructionsUp", "btnInstructionsDown", "btnInstructionsDown", false, hitAreaSprite, "hitArea");
    screen.addChild(btnInstruction);
    btnInstruction.addEventListener("click", onClickInstruction);

    /************** Character Tile Setup **************/
    var firstCharacterTile = assetManager.getSprite("assets");
    firstCharacterTile.gotoAndStop("deselectedCharacter");
    firstCharacterTile.x = 40;
    firstCharacterTile.y = 170;
    firstCharacterTile.buttonHelper = new createjs.ButtonHelper(firstCharacterTile, "deselectedCharacter", "selectedCharacter", "selectedCharacter", false, hitAreaSprite, "hitArea");
    screen.addChild(firstCharacterTile);
    firstCharacterTile.addEventListener("click", onClickSelection);


    var secondCharacterTile = assetManager.getSprite("assets");
    secondCharacterTile.gotoAndStop("deselectedCharacter");
    secondCharacterTile.x = 230;
    secondCharacterTile.y = 170;
    secondCharacterTile.buttonHelper = new createjs.ButtonHelper(secondCharacterTile, "deselectedCharacter", "selectedCharacter", "selectedCharacter", false, hitAreaSprite, "hitArea");
    screen.addChild(secondCharacterTile);

    var thirdCharacterTile = assetManager.getSprite("assets");
    thirdCharacterTile.gotoAndStop("deselectedCharacter");
    thirdCharacterTile.x = 410;
    thirdCharacterTile.y = 170;
    thirdCharacterTile.buttonHelper = new createjs.ButtonHelper(thirdCharacterTile, "deselectedCharacter", "selectedCharacter", "selectedCharacter", false, hitAreaSprite, "hitArea");
    screen.addChild(thirdCharacterTile);

    /************** Character Setup **************/
    var firstCharacter = assetManager.getSprite("assets");
    firstCharacter.gotoAndPlay("walkDown");
    firstCharacter.x = 78;
    firstCharacter.y = 210;
    screen.addChild(firstCharacter);

    var secondCharacter = assetManager.getSprite("assets");
    secondCharacter.gotoAndPlay("walkDownB");
    secondCharacter.x = 268;
    secondCharacter.y = 210;
    screen.addChild(secondCharacter);

    var thirdCharacter = assetManager.getSprite("assets");
    thirdCharacter.gotoAndPlay("walkDownC");
    thirdCharacter.x = 448;
    thirdCharacter.y = 210;
    screen.addChild(thirdCharacter);




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

    function onClickSelection(e) {

    }

};