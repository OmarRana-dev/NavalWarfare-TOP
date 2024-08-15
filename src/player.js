import { Gameboard } from './gameboard';

export class Player {
  constructor(type) {
    this.type = type; // 'real' or 'computer'
    this.gameboard = new Gameboard(); // Each player has their own gameboard
  }

  // Method for the player to take a turn
  // eslint-disable-next-line class-methods-use-this
  sendAttack(opponent, coordinates) {
    // Attack the opponent's gameboard with the given coordinates
    return opponent.gameboard.receiveAttack(coordinates);
  }
}
