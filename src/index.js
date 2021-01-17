/* eslint-disable no-undef */
// import Phaser from './lib/phaser';
import 'phaser';
import GameScene from './scenes/gameScene';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 250,
      },
      debug: false,
    },
  },
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(gameConfig);
// console.log('Game Loaded!!');