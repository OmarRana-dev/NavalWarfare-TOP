import { Gameboard } from './gameboard';
import { getRandomCoordinates } from './utils';

export class Player {
  constructor(type = 'real') {
    this.type = type; // 'real' or 'computer'
    this.gameboard = new Gameboard(); // Each player has their own gameboard
  }

  // Method for the player to take a turn
  takeTurn(opponentGameboard, coordinates = null) {
    if (this.type === 'computer') {
      // If the player is a computer, generate random coordinates
      // eslint-disable-next-line no-param-reassign
      coordinates = getRandomCoordinates();
    }

    // Attack the opponent's gameboard with the given coordinates
    return opponentGameboard.receiveAttack(coordinates);
  }
}
