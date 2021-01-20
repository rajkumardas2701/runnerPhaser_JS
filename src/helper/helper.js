export default class Helper {
  static updateScore(scene, point) {
    window.score += point;
    return window.score;
  }
}