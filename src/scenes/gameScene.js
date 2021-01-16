/* eslint-disable no-undef */
import Phaser from 'phaser';
import AvatorActions from './avatorActions';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  /** @type {Phaser.Physics.Arcade.Group} */
  platforms;

  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;

  preload() {
    this.load.image('background', 'src/assets/gameBackground.jpg');
    this.load.image('platform1', 'src/assets/ground-big.png/');
    this.load.image('platform2', 'src/assets/ground_small.png/');
    this.load.image('platform3', 'src/assets/groundgrass_small.png/');
    this.load.spritesheet('avator', 'src/assets/maleAdventurer_sheetHD.png', { frameWidth: 192, frameHeight: 256 }, 3);
  }

  create() {
    this.add.image(400, 150, 'background').setScrollFactor(1, 0);
    this.platforms = this.physics.add.staticGroup();

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
    // this.player = this.physics.add.sprite(100, 100, 'avator').setScale(0.3);
    // this.player.setBounce(0.2);
    this.player = new AvatorActions(this, 100, 100, 'avator', 0);
    this.physics.add.collider(this.player, this.platforms);

    this.player.setCollideWorldBounds(true);
  }

  update() {
    // const touchingDown = this.player.body.touching.down;
    // if (touchingDown) {
    //   this.player.setVelocityX(100);
    // }
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown) {
      this.player.move('left');
    } else if (this.cursors.right.isDown) {
      this.player.move('right');
    } else {
      this.player.idle();
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.jump();
    }
  }
}