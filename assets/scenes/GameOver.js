export default class GameOver extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("GameOver");
  }

  init() {
  
  }

  preload() {
    
    
  }

  create() {
    this.GameOverText = this.add.text(400, 300, "GameOver", {
      fontSize: "50px",
      fill: "#1af",
      
  });
    

    
  }

  update() {
   
  }
}
