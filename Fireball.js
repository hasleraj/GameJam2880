/* globals createjs */
/*jshint browser:true */
/*jshint devel:true */
/*jshint esversion: 6 */
/* globals MoverDiagonal */
var Fireball = function (stage, assetManager, player) {
    "use strict";

    // initialization
    var playerSprite = player.getSprite();
    // construct custom event objects
    var eventPlayerBurned = new createjs.Event("onPlayerBurned", true);

    // is the bug currently being used?
    var active = false;

    // construct sprite for this object and add to stage
    var sprite = assetManager.getSprite("assets");
    sprite.gotoAndStop("flameOn");
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
            // randomly select starting y location of mower
            sprite.y = randomMe(50, 550);
            sprite.rotation = randomMe(45, -45);
        } else {
            // move left
            sprite.x = stage.canvas.width + dimensions.width;
            sprite.y = randomMe(50, 550);
            sprite.rotation = randomMe(135, 225);
        }

        // listen for when the fireball goes off the screen and kill it if it does
        sprite.addEventListener("onStageExitDiagonal", onKillMe);
    };

    this.releaseMe = function () {
        // fire startMe again to take the new rotation of the flame
        sprite.gotoAndPlay("flameOn");
        spriteMover.startMe();

        // add fireballs so they are below the player (player)
        stage.addChildAt(sprite, stage.getChildIndex(playerSprite));
    };

    this.updateMe = function () {
        // if bug not moving then nothing to update!
        if ((!spriteMover.getMoving()) || (player.getKilled())) return;

        spriteMover.update();

        // Calculate difference between centers
        var a = playerSprite.x - sprite.x;
        var b = playerSprite.y - sprite.y;
        // Get distance with Pythagoras
        var c = Math.sqrt((a * a) + (b * b));
        // flame has a radius of 20
        // player has a radius of 30
        // force the radius of the circle on the player to only be 5
        // sum of 5 + 20 = 25
        if (c <= 25) {
            console.log("collision!");
            sprite.dispatchEvent(eventPlayerBurned);
            onKillMe();
        }
    };

    // ----------------------------------------------- event handlers
    function onKillMe(e) {
        spriteMover.stopMe();
        // play death sequence of bug
        sprite.gotoAndPlay("flameOff");
        sprite.addEventListener("animationend", onKilled);
    }

    function onKilled(e) {
        // cleanup event listeners
        e.remove();
        sprite.removeAllEventListeners();
        // remove displayobject
        stage.removeChild(sprite);
        //used = false;
        console.log("flame destroyed");

        // put fireball back in the pool
        active = false;
    }

};