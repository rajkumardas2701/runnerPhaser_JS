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
    this.load.image('menu1', 'src/assets/menu1.png');
    this.load.image('menu2', 'src/assets/menu2.png');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(270, 300, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    const loadingText = this.make.text({
      x: width / 2 - 65,
      y: height / 2 - 30,
      text: 'Loading Game!!...',
      style: {
        font: '15px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2 - 65,
      y: height / 2 + 25,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(280, 310, 300 * value, 30);
    });

    this.load.on('complete', () => {
      this.scene.start('Menu');
    });
  }
}