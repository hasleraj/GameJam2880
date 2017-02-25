/* globals createjs */
/*jshint browser:true */
/*jshint devel:true */
/*jshint esversion: 6 */
/*globals MoverDiagonal */
var Fireball = function (stage, assetManager, player) {
    "use strict";

    // initialization
    var playerSprite = player.getSprite();
    // construct custom event objects
    var eventPlayerBurned = new createjs.Event("contentFinished");
    // construct container object
    var screen = new createjs.Container();

    var velX = 0;
    var velY = 0;

    // is the fireball currently being used?
    var active = false;

    // construct sprite for this object and add to stage
    var sprite = assetManager.getSprite("assets");
    sprite.gotoAndPlay("ballOfire");
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
        // random selection of speed of fireball
        spriteMover.setSpeed(randomMe(2, 6));

        // get bounds of sprite so we can determine width / height
        var dimensions = sprite.getBounds();

        // fireball starts on left or right of stage
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

        sprite.addEventListener("onStageExitDiagonal", onKillMe);
    };

    this.releaseMe = function () {
        // fire startMe again to take the new rotation of the fireball
        sprite.gotoAndPlay("ballOfire");
        spriteMover.startMe();

        stage.addChild(sprite);

    };

    this.updateMe = function () {
        var dimensions = sprite.getBounds();

        // if fireball not moving then nothing to update!
        if ((!spriteMover.getMoving())) return;

        spriteMover.update();

        // Calculate difference between centers
        var a = playerSprite.x - sprite.x;
        var b = playerSprite.y - sprite.y;

        // Get distance using Pythagorian theorem
        var c = Math.sqrt((a * a) + (b * b));

        if (c <= 65) {
            sprite.dispatchEvent(eventPlayerBurned);
            player.removeLives();
            console.log("- one life");
            onKillMe();
        }
    };

    // ----------------------------------------------- event handlers
    function onKillMe(e) {
        spriteMover.stopMe();
        // play death sequence of fireball
        sprite.gotoAndPlay("ballOfire");
        sprite.addEventListener("animationend", onKilled);
    }

    function onKilled(e) {
        // cleanup event listeners
        e.remove();
        sprite.removeAllEventListeners();
        // remove displayobject
        stage.removeChild(sprite);
        // put fireball back in the pool
        active = false;
    }

};