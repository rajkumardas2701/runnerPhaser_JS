import Phaser from 'phaser';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.add.text(500, 80, 'LeaderBoard', {
      fontSize: '48px',
      fontFamily: 'cursive',
    }).setOrigin(0.5);
  }
}