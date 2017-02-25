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
/* globals InstructionScreen */
var ContentScreen = function (assetManager, stage, myIntroScreen) {

    //construct event, container object and set framerate of the game
    var eventScreenComplete = new CustomEvent("contentFinished");
    var screen = new createjs.Container();
    var frameRate = 24;

    var introScreen;

    // custom player class
    var entity = null;

    // variables for fireball object
    var fireballTimer = null;
    var fireballDelay = 0;
    var fireballMax = 10;
    var fireballPool = [];

    // variables for compass object
    var compassTimer = null;
    var compassDelay = 0;
    var compassMax = 10;
    var compassPool = [];

    //track time alive and score
    var startTime = null;
    var score = null;

    /************** Asset Setup **************/
    var lifeOne = assetManager.getSprite("assets");
    lifeOne.gotoAndStop("heartAlive");
    lifeOne.x = 410;
    lifeOne.y = 520;
    screen.addChild(lifeOne);

    var lifeTwo = assetManager.getSprite("assets");
    lifeTwo.gotoAndStop("heartAlive");
    lifeTwo.x = 470;
    lifeTwo.y = 520;
    screen.addChild(lifeTwo);


    var lifeThree = assetManager.getSprite("assets");
    lifeThree.gotoAndStop("heartAlive");
    lifeThree.x = 530;
    lifeThree.y = 520;
    screen.addChild(lifeThree);

    /*var btnRestart = assetManager.getSprite("assets");
    btnRestart.gotoAndStop("heartAlive");
    btnRestart.x = 530;
    btnRestart.y = 520;
    screen.addChild(btnRestart);

    var btnMainMenu = assetManager.getSprite("assets");
    btnMainMenu.gotoAndStop("heartAlive");
    btnMainMenu.x = 530;
    btnMainMenu.y = 520;
    screen.addChild(btnMainMenu);*/



    /************** Public Methods **************/

    this.onSetup = function () {

        score = new createjs.Text("Hello World", "32px VT323", "#000000");
        score.x = 30;
        score.y = 40;
        score.textBaseline = "alphabetic";
        stage.addChild(score);

        introScreen = myIntroScreen;

        entity = new Player(assetManager, stage, 275, 275);
        entity.showMe();

        entity.resetKeys();

        // fireball object pooling - constructing fireball objects
        for (var i = 0; i < fireballMax; i++) {
            fireballPool.push(new Fireball(stage, assetManager, entity));
        }

        // compass object pooling - constructing compass objects
        for (var j = 0; j < compassMax; j++) {
            compassPool.push(new Compass(stage, assetManager, entity));
        }

        entity.resetKeys();

        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);

        // setup event listener to start game
        document.addEventListener("click", onStartGame);
        console.log(">> game ready");

        startTime = (new Date()).getTime();
    };

    this.showMe = function () {
        this.onSetup();
        stage.addChild(screen);
    };

    this.hideMe = function () {
        stage.removeChild(screen);
    };

    /************** Event Handlers **************/
    function onClick(e) {
        stage.dispatchEvent(eventScreenComplete);
    }

    function onStartGame(e) {

        // construct and setup timers to drop objects on display list
        fireballDelay = 500;
        fireballTimer = window.setInterval(onAddFireball, fireballDelay);

        compassDelay = 500;
        compassTimer = window.setInterval(onAddCompass, compassDelay);

    }

    function onGamePlay(e) {
        // construct and setup timers to drop objects on display list
        fireballDelay = 500;
        fireballTimer = window.setInterval(onAddFireball, fireballDelay);

        compassDelay = 500;
        compassTimer = window.setInterval(onAddCompass, compassDelay);
    }

    function onGameOver(e) {
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

    function onAddCompass(e) {
        // find compass in pool and add to game
        for (var i = 0; i < compassPool.length; i++) {
            var newCompass = compassPool[i];
            if (newCompass.getActive() === false) {
                newCompass.setActive(true);
                newCompass.setupMe();
                newCompass.releaseMe();
                break;
            }
        }
    }

    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

        //remove individual life trackers when player collides with fireball
        if (entity.getLives() === 2) {
            lifeThree.gotoAndStop("heartDead");
        } else if (entity.getLives() === 1) {
            lifeTwo.gotoAndStop("heartDead");
        }

        if (entity.getLives() === 0) {
            var gameOver = assetManager.getSprite("assets");
            gameOver.gotoAndStop("gameOverBg");
            gameOver.x = 0;
            gameOver.y = -2;
            screen.addChildAt(gameOver, 0);
            stage.addChild(score);
            lifeOne.gotoAndStop("heartDead");

        } else {
            // update all fireballs (their mover) in pool if active
            for (var n = 0; n < fireballPool.length; n++) {
                if (fireballPool[n].getActive()) {
                    fireballPool[n].updateMe();
                }
            }

            for (var k = 0; k < compassPool.length; k++) {
                if (compassPool[k].getActive()) {
                    compassPool[k].updateMe();
                }
            }


            // update the score
            var currentTime = (new Date()).getTime();
            var time = Math.floor((currentTime - startTime) / 1000);
            score.text = "Game score: " + (time * 119);

            //update sprite
            entity.update();
            // update the stage!
            stage.update();
        }
    }

};