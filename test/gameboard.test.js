import { Ship } from '../src/ship';
import { Gameboard } from '../src/gameboard';

describe('Gameboard before Upgrade', () => {
  let ship;
  let gameboard;

  beforeEach(() => {
    ship = new Ship(3);
    gameboard = new Gameboard();
    gameboard.initializeBoard();
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
    //* NOTE: we don't need these 2 tests now because we eliminate them and add them to index file for some reason

    // test('returns false when attack is already registered', () => {
    //   gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
    //   gameboard.initializeBoard();
    //   gameboard.receiveAttack({ x: 0, y: 0 });

    //   expect(gameboard.receiveAttack({ x: 0, y: 0 })).toBe(false);
    // });

    // test('returns false when attack is already missed', () => {
    //   gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
    //   gameboard.receiveAttack({ x: 3, y: 0 });

    //   expect(gameboard.receiveAttack({ x: 3, y: 0 })).toBe(false);
    // });

    test('returns true when attack hits a ship', () => {
      gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

      expect(gameboard.receiveAttack({ x: 0, y: 0 })).toBe(true);
    });
  });
});

describe('Gameboard after Upgrade', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.initializeBoard();
  });

  // Test for initializeBoard
  test('initializes the board with 10x10 cells', () => {
    expect(gameboard.board).toHaveLength(100); // 10x10 grid
    expect(gameboard.board[0]).toEqual({ x: 0, y: 0, ship: false });
    expect(gameboard.board[99]).toEqual({ x: 9, y: 9, ship: false });
  });

  // Test for placeShip (Valid placement)
  test('places a ship horizontally on the board without overlapping', () => {
    const ship = new Ship(3); // Create a ship of length 3
    const result = gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
    expect(result).toBe(true);

    // Check that the ship occupies the correct cells
    expect(gameboard.board[0].ship).toBe(ship);
    expect(gameboard.board[1].ship).toBe(ship);
    expect(gameboard.board[2].ship).toBe(ship);
  });

  // Test for placeShip (Invalid placement)
  test('fails to place a ship horizontally when it exceeds board boundaries', () => {
    const ship = new Ship(5);
    const result = gameboard.placeShip(ship, { x: 8, y: 0 }, 'horizontal');
    expect(result).toBe(false);
  });

  // Test for placeShip (Overlap placement)
  test('fails to place a ship that overlaps with another ship', () => {
    const ship1 = new Ship(4);
    const ship2 = new Ship(3);

    // Place the first ship
    gameboard.placeShip(ship1, { x: 0, y: 0 }, 'horizontal');

    // Attempt to place the second ship overlapping the first
    const result = gameboard.placeShip(ship2, { x: 1, y: 0 }, 'horizontal');
    expect(result).toBe(false); // Ship overlaps with ship1
  });

  // Test for receiveAttack (Hit)
  test('registers a hit when attacking a cell with a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

    const hit = gameboard.receiveAttack({ x: 0, y: 0 });
    expect(hit).toBe(true);
    expect(gameboard.attacked).toContainEqual({ x: 0, y: 0 });
  });

  // Test for receiveAttack (Miss)
  test('registers a miss when attacking an empty cell', () => {
    const miss = gameboard.receiveAttack({ x: 5, y: 5 });
    expect(miss).toBe(false);
    expect(gameboard.missedAttacks).toContainEqual({ x: 5, y: 5 });
  });

  // Test for isAttacked (Already attacked)
  test('returns false if the cell has already been attacked', () => {
    gameboard.receiveAttack({ x: 0, y: 0 });
    const result = gameboard.isAttacked({ x: 0, y: 0 });
    expect(result).toBe(false);
  });

  // Test for isAttacked (Not yet attacked)
  test('returns true if the cell has not been attacked yet', () => {
    const result = gameboard.isAttacked({ x: 5, y: 5 });
    expect(result).toBe(true);
  });

  // Test for reportAllShipsSunk
  test('correctly reports when all ships are sunk', () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);

    gameboard.placeShip(ship1, { x: 0, y: 0 }, 'horizontal');
    gameboard.placeShip(ship2, { x: 1, y: 1 }, 'vertical');

    // Simulate sinking all ships
    gameboard.receiveAttack({ x: 0, y: 0 });
    gameboard.receiveAttack({ x: 1, y: 0 });
    ship1.hit();
    ship1.hit();

    gameboard.receiveAttack({ x: 1, y: 1 });
    gameboard.receiveAttack({ x: 1, y: 2 });
    gameboard.receiveAttack({ x: 1, y: 3 });
    ship2.hit();
    ship2.hit();
    ship2.hit();

    const allSunk = gameboard.reportAllShipsSunk();
    expect(allSunk).toBe(true);
  });
});
