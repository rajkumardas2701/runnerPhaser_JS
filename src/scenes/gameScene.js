/* eslint-disable no-undef */
import Phaser from 'phaser';
import AvatorActions from './avatorActions';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  // /** @type {Phaser.Physics.Arcade.Group} */
  // platforms;

  // /** @type {Phaser.Physics.Arcade.Sprite} */
  // player;

  preload() {
    this.load.image('background', 'src/assets/gameBackground.jpg');
    this.load.image('platform1', 'src/assets/ground-big.png/');
    this.load.image('platform2', 'src/assets/ground_small.png/');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.load.image('platform3', 'src/assets/groundgrass_small.png/');
    this.load.spritesheet('avator', 'src/assets/maleAdventurer_sheetHD.png', { frameWidth: 192, frameHeight: 256 }, 3);
  }

  create() {
    this.add.image(400, 150, 'background').setScrollFactor(1, 0);
    // this.platforms = this.physics.add.group();

    // let curX = 150;
    // for (let i = 0; i < 4; i += 1) {
    //   const pf = Phaser.Math.Between(1, 3);
    //   const platform = this.platforms.create(curX, 450, `platform${pf}`);
    //   platform.scale = 0.7;
    //   curX += Phaser.Math.Between(200, 350);

    //   /** @type {Phaser.Physics.Arcade.StaticBody} */
    //   const body1 = platform.body;
    //   body1.updateFromGameObject();
    // }
    // this.player = this.physics.add.sprite(100, 100, 'avator').setScale(0.3);
    // this.player.setBounce(0.2);

    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.addPlatform(700, 500, 600 * 0.8);

    // number of consecutive jumps made by the player
    // this.playerJumps = 0;

    this.player = new AvatorActions(this, 100, 100, 'avator', 0);

    this.physics.add.collider(this.player, this.platformGroup);

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

    // this.platforms.children.iterate(child => {
    //   /** @type {Phaser.Physics.Arcade.Sprite} */
    //   const platform = child;
    //   const { scrollX } = this.cameras.main;
    //   if (platform.x >= scrollX + 1000) {
    //     platform.x = scrollX - Phaser.Math.Between(50, 100);
    //     platform.setVelocityX(Phaser.Math.Between(-150, -200));
    //     platform.setGravityY(-500);
    //     platform.body.updateFromGameObject();
    //   }
    // });
  }

  addPlatform(platformWidth, posX, posY) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, posY, 'platform1');
      platform.setVelocityX(Phaser.Math.Between(-150, -200));
      platform.setGravityY(-250);
      // platform.setScale(0.7);
      this.platformGroup.add(platform);
      platform.setImmovable(true);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(80, 300);
  }
}