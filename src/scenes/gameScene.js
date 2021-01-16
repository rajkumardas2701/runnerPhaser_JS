/* eslint-disable no-undef */
import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  /** @type {Phaser.Physics.Arcade.Group} */
  platforms;

  preload() {
    this.load.image('background', 'src/assets/gameBackground.jpg');
    this.load.image('platform1', 'src/assets/ground-big.png/');
    this.load.image('platform2', 'src/assets/ground_small.png/');
    this.load.image('platform3', 'src/assets/groundgrass_small.png/');
  }

  create() {
    this.add.image(400, 150, 'background').setScrollFactor(1, 0);
    // this.physics.add.staticImage(170, 450, 'platform1').setScale(0.7);
    // this.physics.add.staticImage(450, 450, 'platform2').setScale(0.7);
    // this.physics.add.staticImage(670, 450, 'platform3').setScale(0.7);
    // this.physics.add.staticImage(850, 450, 'platform2').setScale(0.7);

    this.platforms = this.physics.add.staticGroup();

    /** @type {Phaser.Physics.Arcade.Sprite} */
    // const platform = this.platforms.create(170, 450, 'platform1');
    let curX = 150;
    for (let i = 0; i < 4; i += 1) {
      const pf = Phaser.Math.Between(1, 3);
      const platform = this.platforms.create(curX, 450, `platform${pf}`);
      platform.scale = 0.7;
      curX += Phaser.Math.Between(200, 350);

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body1 = platform.body;

      body1.updateFromGameObject();
    }
  }
}