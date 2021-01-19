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
      imgName: 'instructions',
      xcoord: 850,
      scene: 'Instructions',
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