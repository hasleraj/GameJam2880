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
  
    var speed = 5;
    var direction = MoverDirection.LEFT;
    var lastDirection = MoverDirection.RIGHT;

    // add sirius to the screen
    var sprite = assetManager.getSprite("assets");
    sprite.gotoAndPlay("standDown");
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

        while(ary.length < 4) {
            var randomnumber = Math.ceil(Math.random()*4);
            if(ary.indexOf(randomnumber) > -1) continue;
            ary[ary.length] = randomnumber;
        }

        console.log(ary);

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

            sprite.gotoAndStop("walkLeft");
            startMe();

        } else if (rightKey && !moving) {
            if (getPhysical) {
                direction = getPhysics()[1];
            } else {
                direction = MoverDirection.RIGHT;
            }       

            sprite.gotoAndStop("walkLeft");
            startMe();

        } else if (downKey && !moving) {
            if (getPhysical) {
                direction = getPhysics()[2];
            } else {
                direction = MoverDirection.DOWN;
            }

            sprite.gotoAndStop("walkDown");
            startMe();

        } else if (upKey && !moving) {
            if (getPhysical) {
                direction = getPhysics()[3];
            } else {
                direction = MoverDirection.UP;
            }       

            sprite.gotoAndStop("walkUp");
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

    // ---------------------------------- public methods
    this.showMe = function () {
        // do other stuff here that needs to be done when screen becomes visible
        // ....




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
                    sprite.dispatchEvent(eventOffStage);
                }

            } else if (direction == MoverDirection.RIGHT) {
                // moving right
                sprite.scaleX = -1;
                sprite.rotation = 0;
                sprite.x = sprite.x + speed;
                if (sprite.x > (stage.canvas.width + width)) {
                    sprite.x = -width;
                    sprite.dispatchEvent(eventOffStage);
                }

            } else if (direction == MoverDirection.UP) {
                // moving up
                sprite.scaleX = 1;
                //sprite.rotation = 90;
                sprite.y = sprite.y - speed;
                if (sprite.y < -width) {
                    sprite.y = stage.canvas.height;
                    sprite.dispatchEvent(eventOffStage);
                }

            } else if (direction == MoverDirection.DOWN) {
                // moving down
                sprite.scaleX = 1;
                //sprite.rotation = -90;
                sprite.y = sprite.y + speed;
                if (sprite.y > (stage.canvas.height + width)) {
                    sprite.y = -width;
                    sprite.dispatchEvent(eventOffStage);
                }
            }
        }


    };

    this.resetKeys = function() {
        var ary = [];

        while(ary.length < 4) {
            var randomnumber = Math.ceil(Math.random()*4);
            if(ary.indexOf(randomnumber) > -1) continue;
            ary[ary.length] = randomnumber;
        }

        console.log(ary);

        //getPhysical = true;

        return ary;
    };

    // ------------------------------------ event handlers


    function onKeyPress(e) {
        //console.log("key was pressed " + e.keyCode);

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
        //console.log("key was pressed " + e.keyCode);
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

    function brokenPhysics(e) {
        var ary = [];

        while(ary.length < 4) {
            var randomnumber = Math.ceil(Math.random()*4);
            if(ary.indexOf(randomnumber) > -1) continue;
            ary[ary.length] = randomnumber;
        }

        console.log(ary);

        for (var i = 0; i < 4; i++) {
            switch(arr[i]) {
            case 1:
                console.log("I'm a 1");
                break;
            case 2:
                console.log("I'm a 2");
                break;
            case 3:
                console.log("I'm a 3");
                break;
            default:
                console.log("I'm a 4");
            } 
        }
        
    }
};


// static constant hacking by adding them on as properties of a generic object
var MoverDirection = {
    "LEFT": 1,
    "RIGHT": 2,
    "UP": 3,
    "DOWN": 4
};