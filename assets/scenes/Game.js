// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
import {
  PLAYER_MOVEMENTS,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
} from "../scenes/util.js";
export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Game");
  }

  init() {
    this.shapesRecolected = {
      ["Triangulo"]: { count: 0, score: 10 },
      ["Cuadrado"]: { count: 0, score: 20 },
      ["Rombo"]: { count: 0, score: 30 },
    };

    this.isWinner = false;
    this.isGameOver = false;

    this.Timer=30;
  }

  preload() {
    // cargar fondos, plataformas, formas, jugador
    this.load.image("sky", "./assets/images/cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image("player", "./assets/images/Ninja.png");
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
    this.load.image(CUADRADO, "./assets/images/Cuadrado.png");
  }

  create() {
    //sin fisica
    this.add.image(400, 300, "sky").setScale(0.555);

    //agregado de fisica
    this.player = this.physics.add.sprite(100, 200, "player");

    //add plataforms satatic group
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "platform").setScale(2).refreshBody();

    //add Sharpes GRoups
    this.shapesGroup = this.physics.add.group();
    this.physics.add.collider(this.player, this.platforms);

    // add collider between player and platforms
    this.physics.add.collider(this.player, this.platformsGroup);

    // add collider between platforms and shapes
    this.physics.add.collider(this.shapesGroup, this.platforms);

    // add overlap between player and shapes
    this.physics.add.overlap(
      this.player,
      this.shapesGroup,
      this.collectShape, // funcion que llama cuando player choca con shape
      null, //dejar fijo por ahora
      this //dejar fijo por ahora
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    //create vurosrs
    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addshape,
      callbackScope: this,
      loop: this,
    });

    //Add tex
    this.scoreText = this.add.text(16, 16, "T:0 / C:0 / R:0", {
      fontSize: "32px",
      fill: "#1af",
    });

    //agrego eventi temporizador 
    this.time.addEvent({
      delay: 1000,
      callback: this.addTimer,
      callbackScope: this,
      loop: this,
    });

  }

  update() {
    //chek if game over or win
    if (this.isWinner) {
      this.scene.start ("Winner"); 
    }
    if (this.isGameOver) {
      this.scene.start ("GameOver");
    }

      if (this.cursors.left.isDown) {
      this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(PLAYER_MOVEMENTS.x);
    } else {
      this.player.setVelocityX(0);
    }

    //update player jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-PLAYER_MOVEMENTS.y);
    }

    //create event
  }
  collectShape(jugador, figuraChocada) {
    console.log("figura recolectada");
    figuraChocada.disableBody(true, true);

    const ShapeName = figuraChocada.texture.key;
    this.shapesRecolected[ShapeName].count++;

    console.log(this.shapesRecolected);

    this.scoreText.setText (
      "T: "+
      this.shapesRecolected [TRIANGULO].count+
      "/ C: "+
      this.shapesRecolected [CUADRADO].count+
      "/R: "+
      this.shapesRecolected [ROMBO].count
    );

    //Chek if winner
    //take two of each shape
    if (
    this.shapesRecolected [TRIANGULO].count >= 2 &&
    this.shapesRecolected [CUADRADO].count >= 2 &&
    this.shapesRecolected [ROMBO].count >= 2 
    ) {
       this.isWinner = true;
    }
    //add variable desendente
   
  }

  addTimer () {
    this.Timer --
    console.log (this.Timer)
    this.TimerText = this.add.text( 700, 20, "timer:"+ this.Timer, {
      fontSize: "20px",
      fill: "#1af",
    });

    if ( this.Timer <= 0)
    { 
      this.isGameOver = true;
    }
  }
  addshape() {
    console.log(new Date());

    //get ramdom shape
    const randomShape = Phaser.Math.RND.pick(SHAPES);

    //get random position x
    const randomX = Phaser.Math.RND.between(0, 800);

    //add Shape to screen
    this.shapesGroup.create(randomX, 0, randomShape);
    console.log("shape is added", randomX, randomShape);
  }
}
