/* eslint-disable no-undef */
import Phaser from 'phaser';
import AvatorActions from './avatorActions';
import Helper from '../helper/helper';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  create() {
    window.score = 0;
    this.add.image(400, 150, 'background').setScrollFactor(1, 0);
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

    this.player = new AvatorActions(this, 100, 100, 'avator', 0);

    this.physics.add.collider(this.player, this.platformGroup);

    this.timedEvent = this.time.addEvent({
      delay: 5000,
      callback: this.dropCoins,
      callbackScope: this,
      loop: true,
    });

    this.scoreText = this.add.text(420, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    this.add.text(310, 570, 'Developed by - Rajkumar Das', { fontSize: '24px', fill: '#fff' });
  }

  update() {
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

    if (this.player.y > 600 || this.player.x < -50) {
      this.scene.start('game-over');
    }

    let minDistance = 1000;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = 1000 - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -(platform.displayWidth / 2)) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(90, 300);
      const platformRandomHeight = 10 * Phaser.Math.Between(-10, 10);
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = 600 * 0.4;
      const maxPlatformHeight = 600 * 0.8;
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap,
        minPlatformHeight,
        maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, 1000 + (nextPlatformWidth / 2), nextPlatformHeight);
    }
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
      platform = this.physics.add.sprite(posX, posY, 'platform2');
      platform.setVelocityX(Phaser.Math.Between(-150, -200));
      platform.setGravityY(-250);
      this.platformGroup.add(platform);
      platform.setImmovable(true);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(80, 300);
  }

  collectCoins(player, coin) {
    coin.disableBody(true, true);
    Helper.updateScore(this, 10);
    this.scoreText.setText(`Score: ${window.score}`);
  }

  dropCoins() {
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 4,
      setXY: { x: 150, y: 0, stepX: 170 },
    });

    this.coins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setScale(0.5);
    });

    this.physics.add.collider(this.coins, this.platformGroup);
    this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this);
  }
}