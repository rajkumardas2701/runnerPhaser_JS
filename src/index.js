/* eslint-disable no-undef */
// import Phaser from './lib/phaser';
import 'phaser';
import GameScene from './scenes/gameScene';
import GameOver from './scenes/gameOver';
import Instructions from './scenes/instructions';
import Menu from './scenes/menu';
import LeaderBoard from './scenes/leaderboard';
import LoadGame from './scenes/loadGame';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scene: [
    LoadGame,
    Menu,
    GameScene,
    GameOver,
    Instructions,
    LeaderBoard,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 250,
      },
      debug: true,
    },
  },
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(gameConfig);
// console.log('Game Loaded!!');