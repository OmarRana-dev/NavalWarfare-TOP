import { Ship } from '../src/ship';
import { Gameboard } from '../src/gameboard';

describe('Gameboard', () => {
  let ship;
  let gameboard;

  beforeEach(() => {
    ship = new Ship(3);
    gameboard = new Gameboard();
  });

  // Test ship placement
  describe('ship placement', () => {
    test('place a ship horizontally on the board', () => {
      gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
      expect(gameboard.board).toEqual(
        expect.arrayContaining([
          { x: 0, y: 0, ship },
          { x: 1, y: 0, ship },
          { x: 2, y: 0, ship },
        ]),
      );
    });

    test('place a ship vertically on the board', () => {
      gameboard.placeShip(ship, { x: 0, y: 0 }, 'vertical');
      expect(gameboard.board).toEqual(
        expect.arrayContaining([
          { x: 0, y: 0, ship },
          { x: 0, y: 1, ship },
          { x: 0, y: 2, ship },
        ]),
      );
    });

    test('adds the ship to the ships array after placement', () => {
      gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

      expect(gameboard.ships).toContain(ship);
    });
  });

  // Test Receive Attack
  describe('Receive Attack', () => {
    test('returns false when attack is already registered', () => {
      gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
      gameboard.receiveAttack({ x: 0, y: 0 });

      expect(gameboard.receiveAttack({ x: 0, y: 0 })).toBe(false);
    });

    test('returns false when attack is already missed', () => {
      gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
      gameboard.receiveAttack({ x: 3, y: 0 });

      expect(gameboard.receiveAttack({ x: 3, y: 0 })).toBe(false);
    });

    test('returns true when attack hits a ship', () => {
      gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

      expect(gameboard.receiveAttack({ x: 0, y: 0 })).toBe(true);
    });
  });
});
