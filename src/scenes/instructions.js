import Phaser from 'phaser';

export default class Instructions extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  create() {
    this.add.text(500, 75, 'Instructions', {
      fontSize: '48px',
      fontFamily: 'cursive',
    }).setOrigin(0.5);
    this.add.image(350, 170, 'leftarrow').setScale(0.5);
    this.add.image(350, 250, 'uparrow').setScale(0.5);
    this.add.image(350, 330, 'rightarrow').setScale(0.5);
    this.add.image(350, 410, 'spacebar').setScale(0.5);
    this.add.text(500, 75, 'Instructions', {
      fontSize: '48px',
      fontFamily: 'cursive',
    }).setOrigin(0.5);
    this.add.text(600, 170, 'Run left', {
      fontSize: '28px',
      fontFamily: 'cursive',
    }).setOrigin(0.5);
    this.add.text(600, 250, 'Jump', {
      fontSize: '28px',
      fontFamily: 'cursive',
    }).setOrigin(0.5);
    this.add.text(600, 330, 'Run right', {
      fontSize: '28px',
      fontFamily: 'cursive',
    }).setOrigin(0.5);
    this.add.text(600, 410, 'Restart game', {
      fontSize: '28px',
      fontFamily: 'cursive',
    }).setOrigin(0.5);

    const actions = [{
      imgName: 'menu',
      xcoord: 150,
      scene: 'Menu',
    },
    {
      imgName: 'play',
      xcoord: 500,
      scene: 'game',
    },
    {
      imgName: 'leaderboard',
      xcoord: 850,
      scene: 'LeaderBoard',
    }];

    for (let i = 0; i < actions.length; i += 1) {
      const btn = this.add.image(actions[i].xcoord, 550, actions[i].imgName).setScale(0.7);
      btn.setInteractive();
      btn.on('pointerup', () => {
        this.scene.start(`${actions[i].scene}`);
      });
    }
  }
}