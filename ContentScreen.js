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
var ContentScreen = function (assetManager, stage) {

    //CustomEvent
    var eventScreenComplete = new CustomEvent("contentFinished");

    //construct container object
    var screen = new createjs.Container();
    // frame rate of game
    var frameRate = 24;

    var hitAreaSprite = assetManager.getSprite("assets");

    // custom player class
    var entity = null;

    // fireball timer to add gameplay
    var fireballTimer = null;
    var fireballDelay = 0;
    // object pooling
    var fireballMax = 10;
    var fireballPool = [];

    // compass timer to add gameplay
    var compassTimer = null;
    var compassDelay = 0;
    // object pooling
    var compassMax = 10;
    var compassPool = [];

    var startTime = null;
    var score = null;


    /************** Public Methods **************/

    this.onSetup = function () {

        score = new createjs.Text("Hello World", "32px VT323", "#000000");
        score.x = 30;
        score.y = 40;
        score.textBaseline = "alphabetic";
        stage.addChild(score);

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

        if (entity.getLives() === 0) {
            var gameOver = assetManager.getSprite("assets");
            gameOver.gotoAndStop("gameOverBg");
            gameOver.x = 0;
            gameOver.y = -2;
            screen.addChildAt(gameOver, 0);
            stage.addChild(score);

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
            currentTime = (new Date()).getTime();
            var time = Math.floor((currentTime - startTime) / 1000);
            score.text = "Game score: " + (time * 119);

            //update sprite
            entity.update();
            // update the stage!
            stage.update();
        }
    }

};