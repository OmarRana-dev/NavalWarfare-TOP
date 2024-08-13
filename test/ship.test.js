import { Ship } from '../src/ship';

test('Ship hit method increments hits', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
});

test('Ship isSunk method returns false when ship is not sunk', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('Ship isSunk method returns true when ship is sunk', () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
