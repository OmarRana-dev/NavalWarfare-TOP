import { Player } from '../src/player';
import { Ship } from '../src/ship';

describe('Player Class', () => {
  // Test sendAttack for a real player
  describe('sendAttack for real player', () => {
    let human;
    let computer;
    let ship;

    beforeEach(() => {
      human = new Player('real');
      computer = new Player('computer');
      ship = new Ship(3);
      computer.gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
    });

    test('it should receive a hit', () => {
      const hit = human.sendAttack(computer, { x: 0, y: 0 });
      expect(hit).toBe(true);
    });

    test('it should receive a miss', () => {
      const miss = human.sendAttack(computer, { x: 4, y: 2 });
      expect(miss).toBe(false);
    });
  });

  // Test sendAttack for a computer player
  describe('sendAttack for a computer player', () => {
    let human;
    let computer;
    let ship;

    beforeEach(() => {
      human = new Player('real');
      computer = new Player('computer');
      ship = new Ship(3);
      human.gameboard.placeShip(ship, { x: 0, y: 0 }, 'vertical');
    });

    test('it should receive a hit or miss', () => {
      const result = computer.sendAttack(human);
      expect(typeof result).toBe('boolean');
    });
  });
});
