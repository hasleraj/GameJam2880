/* globals createjs */
/*jshint browser:true */
/*jshint devel:true */
/*jshint esversion: 6 */
/*globals AssetManager */
/* globals manifest */

var Player = function (assetManager, stage, myX, myY) {
    "use strict";
    // custom event
    var eventScreenComplete = new createjs.Event("contentFinished");



    // construct container object
    var screen = new createjs.Container();

    // keyboard variables
    var downKey = false;
    var upKey = false;
    var leftKey = false;
    var rightKey = false;

    var velX = 0;
    var velY = 0;

    // stances
    var moving = false;
    var getPhysical = false;
    var lives = 3;

    var speed = 5;
    var direction = MoverDirection.LEFT;
    var lastDirection = MoverDirection.RIGHT;

    var timer = null;
    var timerTimeout = 5000;

    // character sprite variables
    var walkDown = null;
    var walkSide = null;
    var walkUp = null;

    // add player to the screen
    var sprite = assetManager.getSprite("assets");
    sprite.gotoAndStop(walkDown);
    sprite.x = myX;
    sprite.y = myY;
    sprite.regX = sprite.getBounds().width / 2;
    sprite.regY = sprite.getBounds().height / 2;
    screen.addChild(sprite);

    document.addEventListener("keydown", onKeyPress);
    document.addEventListener("keyup", onKeyRelease);


    // ------------------------------------ private methods
    function setVelX(myVelocityX) {
        velX = myVelocityX;
    }

    function setVelY(myVelocityY) {
        velY = myVelocityY;
    }

    function getLives() {
        return lives;
    }

    this.setLives = function (value) {
        lives = value;
    };

    function startMe() {
        if (!moving) {
            sprite.play();
            moving = true;
        }
    }

    function stopMe() {
        sprite.stop();
        moving = false;
    }

    function getPhysics() {
        var ary = [];

        while (ary.length < 4) {
            var randomnumber = Math.ceil(Math.random() * 4);
            if (ary.indexOf(randomnumber) > -1) continue;
            ary[ary.length] = randomnumber;
        }

        //getPhysical = true;

        return ary;
    }

    function monitorKeys() {

        if (leftKey && !moving) {
            if (getPhysical) {
                direction = getPhysics()[0];
            } else {
                direction = MoverDirection.LEFT;
            }

            sprite.gotoAndStop(walkSide);
            startMe();

        } else if (rightKey && !moving) {
            if (getPhysical) {
                direction = getPhysics()[1];
            } else {
                direction = MoverDirection.RIGHT;
            }

            sprite.gotoAndStop(walkSide);
            startMe();

        } else if (downKey && !moving) {
            if (getPhysical) {
                direction = getPhysics()[2];
            } else {
                direction = MoverDirection.DOWN;
            }

            sprite.gotoAndStop(walkDown);
            startMe();

        } else if (upKey && !moving) {
            if (getPhysical) {
                direction = getPhysics()[3];
            } else {
                direction = MoverDirection.UP;
            }

            sprite.gotoAndStop(walkUp);
            startMe();
        }
    }

    // ------------------------------------ gets/sets

    this.getDirection = function () {
        return direction;
    };

    this.getMoving = function () {
        return moving;
    };

    this.getSprite = function () {
        return sprite;
    };

    this.setVelX = function (myVelX) {
        velX = myVelX;
    };

    this.setVelY = function (myVelY) {
        velY = myVelY;
    };

    this.getPhysical = function () {
        return getPhysical;
    };

    this.setPhysical = function (value) {
        getPhysical = value;
    };

    this.getLives = function () {
        return lives;
    };

    this.setTimer = function (value) {
        timerTimeout = value;
    };

    this.setCharacter = function (char) {
        var character = char;

        if (character === 3) {
            walkDown = "walkDownC";
            walkSide = "walkLeftC";
            walkUp = "walkUpC";
        } else if (character === 2) {
            walkDown = "walkDownB";
            walkSide = "walkLeftB";
            walkUp = "walkUpB";
        } else if (character === 1) {
            walkDown = "walkDown";
            walkSide = "walkLeft";
            walkUp = "walkUp";
        } else {
            walkDown = "walkDown";
            walkSide = "walkLeft";
            walkUp = "walkUp";
        }
    };

    // ---------------------------------- public methods
    this.showMe = function () {
        // do other stuff here that needs to be done when screen becomes visible

        this.resetTimer();

        sprite.gotoAndStop(walkDown);


        stage.addChild(screen);
    };

    this.hideMe = function () {
        stage.removeChild(screen);
    };

    this.update = function () {
        monitorKeys();
        sprite.x += velX;
        sprite.y += velY;
        if (moving) {
            // get current width of sprite on this frame
            // we only need to concern ourselves with width in terms of off stage since we rotate sprite up, down, left, and right
            var width = sprite.getBounds().width;
            if (direction == MoverDirection.LEFT) {
                // moving left
                sprite.scaleX = 1;
                sprite.rotation = 0;
                sprite.x = sprite.x - speed;
                if (sprite.x < -width) {
                    sprite.x = stage.canvas.width;
                    sprite.dispatchEvent(eventScreenComplete);
                }
            } else if (direction == MoverDirection.RIGHT) {
                // moving right
                sprite.scaleX = -1;
                sprite.rotation = 0;
                sprite.x = sprite.x + speed;
                if (sprite.x > (stage.canvas.width + width)) {
                    sprite.x = -width;
                    sprite.dispatchEvent(eventScreenComplete);
                }
            } else if (direction == MoverDirection.UP) {
                // moving up
                sprite.scaleX = 1;
                //sprite.rotation = 90;
                sprite.y = sprite.y - speed;
                if (sprite.y < -width) {
                    sprite.y = stage.canvas.height;
                    sprite.dispatchEvent(eventScreenComplete);
                }
            } else if (direction == MoverDirection.DOWN) {
                // moving down
                sprite.scaleX = 1;
                //sprite.rotation = -90;
                sprite.y = sprite.y + speed;
                if (sprite.y > (stage.canvas.height + width)) {
                    sprite.y = -width;
                    sprite.dispatchEvent(eventScreenComplete);
                }
            }
        }
        var dimensions = sprite.getBounds();
        //collision test with walls
        if (sprite.x < 20 /* left  */ ) {
            sprite.x = (dimensions.width) / 2;
        } else if (sprite.x > 580 /* right */ ) {
            sprite.x = 580 - ((dimensions.width) / 2);
        } else if (sprite.y < 20 /* top */ ) {
            sprite.y = (dimensions.height) / 2;
        } else if (sprite.y > 570 /*bottom */ ) {
            sprite.y = 570 - (dimensions.height) / 2;
        }
    };

    this.updateMe = function () {
        var dimensions = sprite.getBounds();
        //collision test with walls
        if (sprite.x < 0 /* left  */ ) {
            sprite.x = (dimensions.width) / 2;
        } else if (sprite.x > 600 /* right */ ) {
            sprite.x = 600 - ((dimensions.width) / 2);
        } else if (sprite.y < 0 /* top */ ) {
            sprite.y = (dimensions.height) / 2;
        } else if (sprite.y > 600 /*bottom */ ) {
            sprite.y = 600 - (dimensions.height) / 2;
        }
    };

    this.resetKeys = function () {
        var ary = [];

        while (ary.length < 4) {
            var randomnumber = Math.ceil(Math.random() * 4);
            if (ary.indexOf(randomnumber) > -1) continue;
            ary[ary.length] = randomnumber;
        }

        return ary;
    };

    this.resetTimer = function () {
        window.clearInterval(timer);
        timer = window.setInterval(timerTester, timerTimeout);
    };

    this.removeLives = function () {
        lives = lives - 1;
        return lives;
    };


    // ------------------------------------ event handlers
    function onKeyPress(e) {

        if (e.keyCode == 87) {
            upKey = true;
        }
        if (e.keyCode == 65) {
            leftKey = true;
        }
        if (e.keyCode == 68) {
            rightKey = true;
        }
        if (e.keyCode == 83) {
            downKey = true;
        }
        if (e.keyCode == 39) {

        }
    }

    function onKeyRelease(e) {
        if (e.keyCode == 65) {
            leftKey = false;
        } else if (e.keyCode == 68) {
            rightKey = false;
        } else if (e.keyCode == 83) {
            downKey = false;
        } else if (e.keyCode == 87) {
            upKey = false;
        }
        stopMe();
    }

    function timerTester(e) {
        getPhysical = true;
        createjs.Sound.play("gameOver");
    }

};

// static constant hacking by adding them on as properties of a generic object
var MoverDirection = {
    "LEFT": 1,
    "RIGHT": 2,
    "UP": 3,
    "DOWN": 4
};