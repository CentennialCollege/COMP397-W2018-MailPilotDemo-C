/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyboardManager;
    var textureData;
    var textureAtlas;
    assetManifest = [
        { id: "ocean", src: "./Assets/images/ocean.gif" },
        { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "thunder", src: "./Assets/audio/thunder.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" }
    ];
    textureData = {
        "images": [
            ""
            // "./Assets/sprites/textureAtlas.png"
        ],
        "frames": [
            [1, 1, 226, 178, 0, 0, 0],
            [1, 181, 62, 62, 0, 0, 0],
            [65, 181, 62, 51, 0, 0, 0],
            [129, 181, 62, 51, 0, 0, 0],
            [193, 181, 62, 51, 0, 0, 0],
            [1, 245, 200, 60, 0, 0, 0],
            [1, 307, 200, 60, 0, 0, 0],
        ],
        "animations": {
            "cloud": { "frames": [0] },
            "island": { "frames": [1] },
            "plane": {
                "frames": [2, 3, 4],
                "speed": 0.5
            },
            "restartButton": { "frames": [5] },
            "startButton": { "frames": [6] }
        }
    };
    // preloads assets
    function Init() {
        console.log("Initialization Started...");
        assetManager = new createjs.LoadQueue(); // creates the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        textureData.images = [assetManager.getResult("textureAtlas")];
        textureAtlas = new createjs.SpriteSheet(textureData);
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); // turn this on for buttons
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        managers.Game.stage = stage;
        managers.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        keyboardManager = new managers.Keyboard();
        managers.Game.keyboardManager = keyboardManager;
        managers.Game.assetManager = assetManager;
        managers.Game.textureAtlas = textureAtlas;
        Main();
    }
    function Update() {
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != managers.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
    }
    function Main() {
        stage.removeAllChildren();
        switch (managers.Game.currentScene) {
            case config.Scene.START:
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.PlayScene();
                break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene();
                break;
        }
        currentState = managers.Game.currentScene;
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map