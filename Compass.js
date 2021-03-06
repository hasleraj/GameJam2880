/* globals createjs */
/*jshint browser:true */
/*jshint devel:true */
/*jshint esversion: 6 */
/* globals MoverDiagonal */
var Compass = function (stage, assetManager, player) {
    "use strict";

    // initialization
    var playerSprite = player.getSprite();
    // construct custom event objects
    var eventCompassCollected = new createjs.Event("contentFinished");
    // construct container object
    var screen = new createjs.Container();

    var velX = 0;
    var velY = 0;

    // is the compass currently being used?
    var active = false;

    // construct sprite for this object and add to stage
    var sprite = assetManager.getSprite("assets");
    sprite.gotoAndPlay("compass");

    /************** Private Methods **************/
    function randomMe(low, high) {
        return Math.round(Math.random() * (high - low)) + low;
    }

    /************** Get/Set Methods**************/
    this.getActive = function () {
        return active;
    };

    this.setActive = function (value) {
        active = value;
    };

    /************** Public Methods **************/
    this.setupMe = function () {

        // get bounds of sprite so we can determine width / height
        var dimensions = sprite.getBounds();

        sprite.x = randomMe(50, 550);
        sprite.y = randomMe(50, 550);
        sprite.rotation = randomMe(45, -45);

    };

    this.releaseMe = function () {
        //fire startMe again to take the new rotation of the compass
        sprite.gotoAndPlay("compass");

        stage.addChild(sprite);

    };

    this.updateMe = function () {
        var dimensions = sprite.getBounds();

        // Calculate difference between centers
        var a = playerSprite.x - sprite.x;
        var b = playerSprite.y - sprite.y;
        // Get distance using Pythagorian theorem
        var c = Math.sqrt((a * a) + (b * b));

        if (c <= 51) {
            sprite.dispatchEvent(eventCompassCollected);
            onCollectMe();
            createjs.Sound.play("hitCompass");
        }
    };

    /************** Event Handlers **************/
    function onCollectMe(e) {
        // play end sequence of compass
        sprite.gotoAndPlay("compass");
        //onCollected is not being called
        sprite.addEventListener("animationend", onCollected);

        // compass set the character controls to default
        player.setPhysical(false);
        player.setTimer(5000);
        player.resetTimer();
    }

    function onCollected(e) {
        // cleanup event listeners
        e.remove();
        sprite.removeAllEventListeners();
        // remove displayobject
        stage.removeChild(sprite);
        // put compass back in the pool
        active = false;
    }

};