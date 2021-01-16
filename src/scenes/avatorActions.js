import Phaser from 'phaser';

export default class AvatorActions extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame = 0) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.setScale(0.3);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.generateMoves();
  }

  generateMoves() {
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('avator', { start: 0, end: 0 }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('avator', { start: 24, end: 26 }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNumbers('avator', { start: 1, end: 2 }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'dead',
      frames: this.scene.anims.generateFrameNumbers('avator', { start: 44, end: 44 }),
      frameRate: 20,
      repeat: -1,
    });
  }
}