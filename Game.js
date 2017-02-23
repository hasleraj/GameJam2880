
(function() {
    "use strict";

    window.addEventListener("load", onInit);

    // game variables
    var stage = null;
    var canvas = null;

    // frame rate of game
    var frameRate = 24;
    // game objects
    var assetManager = null;
    var player = null;

    // custom player class
    var entity = null;
    
    // keyboard variables
    var downKey = false;
    var upKey = false;
    var leftKey = false;
    var rightKey = false;
    var moving = null;

    // ------------------------------------------------------------ private methods
    

    // ------------------------------------------------------------ event handlers
    function onInit() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("stage");
        // set canvas to as wide/high as the browser window
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.backgroundColor = "#FFFFFF";
        // create stage object
        stage = new createjs.Stage(canvas);

        // construct preloader object to load spritesheet and sound assets
        assetManager = new AssetManager(stage);
        stage.addEventListener("onAllAssetsLoaded", onSetup);
        // load the assets
        assetManager.loadAssets(manifest);
    }

    function onSetup(e) {
        console.log(">> adding sprites to game");
        stage.removeEventListener("onAllAssetsLoaded", onSetup);

        downKey = false;
        upKey = false;
        leftKey = false;
        rightKey = false;
        
        entity = new Player(assetManager, stage, 275, 275);
        entity.showMe();
        
        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);

        console.log(">> game ready");
    }

    
    
    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

        // game loop code here
        entity.update();
        // update the stage!
        stage.update();
    }

})();