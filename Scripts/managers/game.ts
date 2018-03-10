module managers {
  export class Game {
    public static stage: createjs.Stage;
    public static assetManager: createjs.LoadQueue;
    public static textureAtlas: createjs.SpriteSheet;
    public static currentScene: number;
    public static scoreBoard: managers.ScoreBoard;
    public static keyboardManager: managers.Keyboard;
    public static HighScore: number = 0;
  }
}
