
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
    
    function monitorKeys(){
        console.log(player.mover.getMoving());
        if((leftKey)){
            player.mover.setDirection(MoverDirection.LEFT);
            player.mover.startMe();
            player.gotoAndStop("walkLeft");
        }else if(rightKey){
            player.mover.setDirection(MoverDirection.RIGHT);
            player.mover.startMe();
            player.gotoAndStop("walkLeft");
        }else if(downKey){
            player.mover.setDirection(MoverDirection.DOWN);
            player.mover.startMe();
            player.gotoAndStop("walkDown");
        }else if(upKey){
            player.mover.setDirection(MoverDirection.UP);
            player.mover.startMe();
            player.gotoAndStop("walkUp");
        }else {
            player.gotoAndStop("standDown");
            player.mover.stopMe();
        }
        
    }
    
    
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
        
        // construct game object sprites
        player = assetManager.getSprite("assets");
        player.x = 275;
        player.y = 275;
        player.regX = player.getBounds().width/2;
        player.regY = player.getBounds().height/2;
        player.mover = new Mover(player, stage);
        player.mover.setSpeed(4);
        player.gotoAndStop("standDown");
        //stage.addChild(player);

        entity = new Player(assetManager, stage, 275, 275);
        entity.showMe();
        
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);

        moving = player.mover.getMoving();

        console.log(">> game ready");
    }

    function onKeyDown(e){
        console.log("key was pressed " + e.keyCode);
        if(e.keyCode == 65){
            leftKey = true;
        }else if(e.keyCode == 68){
           rightKey = true;
        }else if(e.keyCode == 83){
            downKey = true;
        }else if(e.keyCode == 87){
            upKey = true;
        } 
       
    }
    
    function onKeyUp(e){
        console.log("key was pressed " + e.keyCode);
        if(e.keyCode == 65){
            leftKey = false;
        }else if(e.keyCode == 68){
           rightKey = false;
        }else if(e.keyCode == 83){
            downKey = false;
        }else if(e.keyCode == 87){
            upKey = false;
        } 
        //snake.mover.stopMe();
    }
    
    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

        monitorKeys();
        
        // game loop code here
        player.mover.update();
        entity.update();
        // update the stage!
        stage.update();
    }

})();