import Phaser from 'phaser';

export default class LoadGame extends Phaser.Scene {
  constructor() {
    super('LoadGame');
  }

  preload() {
    this.load.image('background', 'src/assets/gameBackground.jpg');
    this.load.image('platform1', 'src/assets/ground-big.png/');
    this.load.image('platform2', 'src/assets/ground_small.png/');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.load.image('platform3', 'src/assets/groundgrass_small.png/');
    this.load.spritesheet('avator', 'src/assets/maleAdventurer_sheetHD.png', { frameWidth: 192, frameHeight: 256 }, 3);
    this.load.image('coin', 'src/assets/coin.png');
    this.load.image('gameOverImg', 'src/assets/gameOverImg.png');
    this.load.image('submit', 'src/assets/submit.png');
    this.load.image('playAgain', 'src/assets/playAgain.png');
    this.load.image('instructions', 'src/assets/instructions.png');
    this.load.image('leftarrow', 'src/assets/leftarrow.png');
    this.load.image('rightarrow', 'src/assets/rightarrow.png');
    this.load.image('uparrow', 'src/assets/uparrow.png');
    this.load.image('spacebar', 'src/assets/spacebar.png');
    this.load.image('menu', 'src/assets/menu.png');
    this.load.image('leaderboard', 'src/assets/leaderboard.png');
    this.load.image('play', 'src/assets/play.png');

    this.load.on('complete', () => {
      this.scene.start('Menu');
    });
  }
}