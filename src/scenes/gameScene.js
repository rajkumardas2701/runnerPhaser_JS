/* eslint-disable no-undef */
import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('background', 'src/assets/gameBackground.jpg');
  }

  create() {
    this.add.image(400, 300, 'background').setScrollFactor(1, 0);
  }
}