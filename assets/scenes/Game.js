// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
import { PLAYER_MOVEMENTS } from "../scenes/util.js";
export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Game");
  }

  init() {
    let shapesRecolected = [
      { tyipe: "Triangulo", count: 0 },
      { tyipe: "Cuadrado", count: 0 },
      { tyipe: "Rombo", count: 0 },
    ];
  }

  preload() {
    // cargar fondos, plataformas, formas, jugador
    this.load.image("sky", "./assets/images/cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image("player", "./assets/images/Ninja.png");
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
    this.sharpesGroup = this.physics.add.group();
    this.sharpesGroup = this.physics.add.group();
    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  //add collider

  //create vurosrs

  update() {
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
  }
}
