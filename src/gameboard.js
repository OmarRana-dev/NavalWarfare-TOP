/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

export class Gameboard {
  constructor() {
    this.board = []; // You can initialize this as a 2D array if you want to represent the grid
    this.ships = []; // Array to store all the ships placed on the board
    this.attacked = []; // Array to store all the hits on the board
    this.missedAttacks = []; // Array to store the coordinates of missed attacks
  }

  // Method to place a ship on the gameboard
  placeShip(ship, startCoordinates, orientation) {
    // Assuming startCoordinates is an object like {x: 0, y: 0}
    const { x, y } = startCoordinates;

    if (orientation === 'horizontal') {
      // Place the ship horizontally
      for (let i = 0; i < ship.length; i += 1) {
        this.board.push({ x: x + i, y, ship });
      }
    } else if (orientation === 'vertical') {
      // Place the ship vertically
      for (let i = 0; i < ship.length; i += 1) {
        this.board.push({ x, y: y + i, ship });
      }
    }

    this.ships.push(ship); // Add ship to the list of ships
  }

  // Method to receive an attack on the board
  receiveAttack(coordinates) {
    // Check if the given coordinates are already attacked
    if (
      this.attacked.some(
        (attacked) =>
          attacked.x === coordinates.x && attacked.y === coordinates.y,
      )
    ) {
      return false; // Attack was already registered
    }

    // Check if the given coordinates are already missed
    if (
      this.missedAttacks.some(
        (missed) => missed.x === coordinates.x && missed.y === coordinates.y,
      )
    ) {
      return false; // Attack was already missed
    }

    // Find the cell on the board corresponding to the given coordinates
    const attack = this.board.find(
      (cell) => cell.x === coordinates.x && cell.y === coordinates.y,
    );

    if (attack && attack.ship) {
      attack.ship.hit(); // Register a hit on the ship
      this.attacked.push(coordinates); // Record the attacked cell
      return true; // Attack was a hit
    }
    this.missedAttacks.push(coordinates); // Record the missed attack
    return false; // Attack missed
  }

  // Method to check if all ships are sunk
  reportAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
