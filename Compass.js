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
    sprite.gotoAndPlay("walkRight");
    var spriteMover = new MoverDiagonal(sprite, stage);


    // --------------------------------------------- private methods
    function randomMe(low, high) {
        return Math.round(Math.random() * (high - low)) + low;
    }

    // ---------------------------------------------- get/set methods
    this.getActive = function () {
        return active;
    };

    this.setActive = function (value) {
        active = value;
    };

    // ---------------------------------------------- public methods
    this.setupMe = function () {
        // random selection of speed of compass
        spriteMover.setSpeed(randomMe(2, 6));

        // get bounds of sprite so we can determine width / height
        var dimensions = sprite.getBounds();

        // compass starts on left or right of stage
        if (randomMe(1, 2) == 1) {
            // move right
            sprite.x = -dimensions.width;
            sprite.y = randomMe(50, 550);
            sprite.rotation = randomMe(45, -45);
        } else {
            // move left
            sprite.x = stage.canvas.width + dimensions.width;
            sprite.y = randomMe(50, 550);
            sprite.rotation = randomMe(135, 225);
        }
    };

    this.releaseMe = function () {
        // fire startMe again to take the new rotation of the compass
        sprite.gotoAndPlay("walkRight");
        spriteMover.startMe();

        stage.addChild(sprite);

    };

    this.updateMe = function () {
        // if compass not moving then nothing to update!
        if ((!spriteMover.getMoving())) return;

        spriteMover.update();

        // Calculate difference between centers
        var a = playerSprite.x - sprite.x;
        var b = playerSprite.y - sprite.y;
        // Get distance with Pythagoras
        var c = Math.sqrt((a * a) + (b * b));

        if (c <= 25) {
            console.log("collision!");
            sprite.dispatchEvent(eventCompassCollected);
            onCollectMe();
        }
    };

    // ----------------------------------------------- event handlers
    function onCollectMe(e) {
        spriteMover.stopMe();
        // play death sequence of compass
        sprite.gotoAndPlay("walkRight");
        sprite.addEventListener("animationend", onCollected);
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