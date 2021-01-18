import Phaser from 'phaser';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    const actions = [{
      imgName: 'play',
      ycoord: 220,
      scene: 'game',
    },
    {
      imgName: 'instructions',
      ycoord: 320,
      scene: 'Instructions',
    },
    {
      imgName: 'leaderboard',
      ycoord: 420,
      scene: 'LeaderBoard',
    }];

    this.add.text(500, 80, 'To Infinity And Beyond', {
      fontSize: '48px',
      fontFamily: 'cursive',
    }).setOrigin(0.5);

    for (let i = 0; i < actions.length; i += 1) {
      const btn = this.add.image(500, actions[i].ycoord, actions[i].imgName).setScale(0.7);
      btn.setInteractive();
      btn.on('pointerup', () => {
        this.scene.start(`${actions[i].scene}`);
      });
    }

    this.add.image(180, 350, 'menu1').setScale(1);
    this.add.image(780, 350, 'menu2').setScale(1);
  }
}