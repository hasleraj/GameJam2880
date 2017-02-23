/* globals createjs */
var Tile = function (x, y, width, height, solid, id) {
    "use strict";

    var velX = 0,
        velY = 0;

    //initialize
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.solid = solid;
    this.id = id;

    this.getBounds = function () {

        var tileGfx = new createjs.Graphics();
        //first 2 params are x,y location
        tileGfx.drawRect(this.getX(), this.getY(), width, height);
        return tileGfx;
    };


    // --------------------------- Getters and Setters

    this.getId = function () {
        return id;
    };

    this.getX = function () {
        return x;
    };

    this.setX = function (x) {
        this.x = x;
    };

    this.getY = function () {
        return y;
    };

    this.setY = function (y) {
        this.y = y;
    };

    this.getVelX = function () {
        return velX;
    };

    this.setVelX = function (velX) {
        this.velX = velX;
    };

    this.getVelY = function () {
        return velY;
    };

    this.setVelY = function (velY) {
        this.velY = velY;
    };

    this.isSolid = function () {
        return solid;
    };

    this.getWidth = function () {
        return width;
    };

    this.setWidth = function (width) {
        this.width = width;
    };

    this.getHeight = function () {
        return height;
    };

    this.setHeight = function (height) {
        this.height = height;
    };

    this.setSolid = function (solid) {
        this.solid = solid;
    };

};