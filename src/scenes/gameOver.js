import Phaser from 'phaser';
import apiQuery from '../helper/fetchData';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  create() {
    this.add.image(170, 250, 'gameOverImg');
    this.add.text(500, 80, 'Game Over', {
      fontSize: '48px',
      fontFamily: 'cursive',
    }).setOrigin(0.5);
    this.add.image(800, 250, 'gameOverImg');


    this.input.keyboard.once('keydown-SPACE', () => {
      document.getElementById('user-name').remove();
      this.scene.start('game');
    });
    this.add.text(500, 200, `Total Score: ${window.score}`, { fontSize: 36 }).setOrigin(0.5);

    const inputName = document.createElement('input');
    inputName.setAttribute('id', 'user-name');
    inputName.setAttribute('class', 'input-name');
    inputName.setAttribute('placeholder', 'Enter Your Name');
    inputName.type = 'text';
    document.querySelector('.content-section').appendChild(inputName);

    const submitBtn = this.add.image(500, 400, 'submit');
    submitBtn.setScale(1.0);
    submitBtn.setInteractive();

    const callLeaderBoard = () => {
      document.getElementById('user-name').remove();
      this.scene.start('LeaderBoard');
    };

    const sendData = async () => {
      this.name = document.getElementById('user-name').value;
      if (this.name.length < 13 && this.name.length > 1) {
        await apiQuery.pushScore(this.name, window.score);
        callLeaderBoard();
      }
    };

    submitBtn.on('pointerup', () => {
      sendData();
    });


    const playAgain = this.add.image(
      160, 520, 'playAgain',
    ).setScale(0.7);
    playAgain.setInteractive();
    playAgain.on('pointerup', () => {
      document.getElementById('user-name').remove();
      this.scene.start('game');
    });

    const instructions = this.add.image(
      800, 520, 'instructions',
    ).setScale(0.7);
    instructions.setInteractive();

    instructions.on('pointerup', () => {
      document.getElementById('user-name').remove();
      this.scene.start('Instructions');
    });
  }
}