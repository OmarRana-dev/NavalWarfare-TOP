/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { getRandomCoordinates } from './utils';

export class Gameboard {
  constructor() {
    this.board = []; // You can initialize this as a 2D array if you want to represent the grid
    this.ships = []; // Array to store all the ships placed on the board
    this.attacked = []; // Array to store all the hits on the board
    this.missedAttacks = []; // Array to store the coordinates of missed attacks
  }

  // Method to initialize the gameboard with empty cells
  initializeBoard() {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        this.board.push({ x: j, y: i, ship: false });
      }
    }
  }

  // Method to place a ship on the gameboard
  placeShip(ship, startCoordinates, orientation) {
    // Assuming startCoordinates is an object like {x: 0, y: 0}
    const { x, y } = startCoordinates;

    // Check if the ship can be placed on the board
    const shipLength = ship.length;
    const shipCoordinates = [];

    // Check if the ship can fit horizontally on the board
    if (orientation === 'horizontal') {
      if (x + shipLength > 10) {
        return false; // Ship cannot fit on the board
      }
      // Check if any other ship overlaps with the new ship
      if (
        this.board.some(
          (cell) =>
            cell.x >= x && cell.x < x + shipLength && cell.y === y && cell.ship,
        )
      ) {
        return false; // Ship overlaps with another ship
      }
      for (let i = 0; i < ship.length; i += 1) {
        shipCoordinates.push({ x: x + i, y, ship });
      }
    }

    // Check if the ship is fit vertically on the board
    if (orientation === 'vertical') {
      if (y + shipLength > 10) {
        return false; // Ship cannot fit on the board
      }
      // Check if any other ship overlaps with the new ship
      if (
        this.board.some(
          (cell) =>
            cell.x === x && cell.y >= y && cell.y < y + shipLength && cell.ship,
        )
      ) {
        return false; // Ship overlaps with another ship
      }
      for (let i = 0; i < ship.length; i += 1) {
        shipCoordinates.push({ x, y: y + i, ship });
      }
    }

    // Helper function to check if any ship is around a given cell
    const isShipNearby = (cellX, cellY) => {
      // List of relative positions to check around the current cell (8 directions)
      const directions = [
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 }, // Right
        { dx: 0, dy: -1 }, // Up
        { dx: 0, dy: 1 }, // Down
        { dx: -1, dy: -1 }, // Top-Left
        { dx: 1, dy: -1 }, // Top-Right
        { dx: -1, dy: 1 }, // Bottom-Left
        { dx: 1, dy: 1 }, // Bottom-Right
      ];

      // Check each neighboring cell
      return directions.some(({ dx, dy }) => {
        const neighborX = cellX + dx;
        const neighborY = cellY + dy;

        // Find the neighboring cell on the board and check if it contains a ship
        const neighboringCell = this.board.find(
          (cell) => cell.x === neighborX && cell.y === neighborY,
        );
        return neighboringCell && neighboringCell.ship;
      });
    };

    const anyShipAround = shipCoordinates.some((coordinate) => {
      const { x: cellx, y: celly } = coordinate; // Destructure the properties
      return isShipNearby(cellx, celly); // Return the boolean value from isShipNearby
    });

    if (anyShipAround) {
      return false; // Ship cannot be placed near another ship
    }

    // Place the ship on the board by replacing the `ship: false` property
    shipCoordinates.forEach((shipCell) => {
      const { x: shipX, y: shipY } = shipCell;

      // Find the corresponding cell on the board and replace `ship: false` with the ship object
      this.board.forEach((cell) => {
        if (cell.x === shipX && cell.y === shipY && cell.ship === false) {
          // eslint-disable-next-line no-param-reassign
          cell.ship = ship; // Replace `false` with the ship object
        }
      });
    });

    this.ships.push(ship); // Add ship to the list of ships
    return true; // Ship placed successfully
  }

  // Method to place the ships randomly on the board
  palceShipsRandomly(ships) {
    ships.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const startCoordinates = getRandomCoordinates();
        placed = this.placeShip(ship, startCoordinates, orientation);
      }
    });
  }

  // Method to receive an attack on the board
  receiveAttack(coordinates) {
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

  // Check if the given coordinates are already attacked
  isAttacked(coordinates) {
    if (
      this.attacked.some(
        (attacked) =>
          attacked.x === coordinates.x && attacked.y === coordinates.y,
      )
    ) {
      console.log('attacked');
      return false; // Attack was already registered
    }

    // Check if the given coordinates are already missed
    if (
      this.missedAttacks.some(
        (missed) => missed.x === coordinates.x && missed.y === coordinates.y,
      )
    ) {
      console.log('missed');
      return false; // Attack was already registered
    }
    return true; // Attack was not registered yet
  }

  // Method to check if all ships are sunk
  reportAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
