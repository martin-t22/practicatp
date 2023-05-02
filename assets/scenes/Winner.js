export default class Winner extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Winner");
  }
 
  init() {
  
  }

  preload() {
    
    
  }

  create() {
    this.WinnerText = this.add.text(400, 300, "Winner", {
      fontSize: "50px",
      fill: "#1af", 
    });
    

    
  }

  update() {
   
  }
}
