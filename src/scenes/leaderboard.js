import Phaser from 'phaser';
import apiQuery from '../helper/fetchData';
import 'regenerator-runtime/runtime';

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

    this.loading = this.add.text(500, 300, 'Fetching...', { fontSize: 26 }).setOrigin(0.5);

    const showScores = async (results) => {
      this.loading.text = '';
      let y = 0;
      for (let i = 0; i < 8; i += 1) {
        this.add.text(340, 240 + y, `${i + 1}.`, { fontSize: 20 });
        this.add.text(375, 240 + y, `${results[i].user}`, { fontSize: 20 });
        this.add.text(510, 240 + y, `${results[i].score}`, { fontSize: 20 });
        y += 25;
      }
    };
    const retrieveScore = async () => {
      const response = await apiQuery.getScore();
      const scores = response.sort((x, y) => y.score - x.score);
      if (scores.empty) {
        this.loading.text = 'No Data found!';
      } else {
        showScores(scores);
      }
    };

    retrieveScore();

    for (let i = 0; i < actions.length; i += 1) {
      const btn = this.add.image(actions[i].xcoord, 550, actions[i].imgName).setScale(0.7);
      btn.setInteractive();
      btn.on('pointerup', () => {
        this.scene.start(`${actions[i].scene}`);
      });
    }
  }
}