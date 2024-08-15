/* eslint-disable no-console */
import { Ship } from './ship';
import { Player } from './player';
import { getRandomCoordinates } from './utils';
import './style/style.css';
// Create two players
const human = new Player('real');
const computer = new Player('computer');

const shipsForHuman = [
  new Ship(4), // Battleship
  new Ship(3), // Cruiser
  new Ship(3), // Cruiser
  new Ship(2), // Destroyer
  new Ship(2), // Destroyer
  new Ship(2), // Destroyer
  new Ship(2), // Submarine
  new Ship(1), // Patrol Boat
  new Ship(1), // Patrol Boat
  new Ship(1), // Patrol Boat
  new Ship(1), // Patrol Boat
];
const shipsForComputer = [
  new Ship(4), // Battleship
  new Ship(3), // Cruiser
  new Ship(3), // Cruiser
  new Ship(2), // Destroyer
  new Ship(2), // Destroyer
  new Ship(2), // Destroyer
  new Ship(2), // Submarine
  new Ship(1), // Patrol Boat
  new Ship(1), // Patrol Boat
  new Ship(1), // Patrol Boat
  new Ship(1), // Patrol Boat
];
// Place a ships randomly on the gameboard
human.gameboard.palceShipsRandomly(shipsForHuman);
computer.gameboard.palceShipsRandomly(shipsForComputer);

const startGameBtn = document.querySelector('#StartGameBtn');

// Play the game
startGameBtn.addEventListener('click', () => {
  let turn = true;
  while (
    // eslint-disable-next-line operator-linebreak
    !human.gameboard.reportAllShipsSunk() &&
    !computer.gameboard.reportAllShipsSunk()
  ) {
    if (turn) {
      console.log('Human player turn');
      const attackCoordinates = getRandomCoordinates();
      if (computer.gameboard.isAttacked(attackCoordinates)) {
        console.log(
          `Attacked [${attackCoordinates.x}, ${attackCoordinates.y}] coordinates by Human.`,
        );
        const attackResult = human.sendAttack(computer, attackCoordinates);
        if (attackResult) {
          console.log('You Hit a shot boy, wow!');
          turn = true;
        } else {
          console.log('You Miss it, boy');
          turn = false;
        }
      }
    }
    if (!turn) {
      console.log('Computer player turn');
      const attackCoordinates = getRandomCoordinates();
      if (human.gameboard.isAttacked(attackCoordinates)) {
        console.log(
          `Attacked [${attackCoordinates.x}, ${attackCoordinates.y}] coordinates by Computer.`,
        );
        const attackResult = computer.sendAttack(human, attackCoordinates);
        if (attackResult) {
          console.log('Computer Hit a Ship');
          turn = false;
        } else {
          console.log('Computer Missed Shot!');
          turn = true;
        }
      }
    }
  }
  if (computer.gameboard.reportAllShipsSunk()) {
    console.log('You wins!');
  }
  if (human.gameboard.reportAllShipsSunk()) {
    console.log('Computer wins!');
  }
});
