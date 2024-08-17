/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { Ship } from './ship';
import { Player } from './player';
import { getRandomCoordinates } from './utils';
import { updateGameBoard } from './ui/displayCells';
import './style/style.css';
// Create two players
const human = new Player('real');
const computer = new Player('computer');

// initialize the game boards
human.gameboard.initializeBoard();
computer.gameboard.initializeBoard();

const shipsForHuman = [
  new Ship(4), // Battleship
  new Ship(3), // Cruiser
  new Ship(3), // Cruiser
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
  new Ship(2), // Submarine
  new Ship(1), // Patrol Boat
  new Ship(1), // Patrol Boat
  new Ship(1), // Patrol Boat
  new Ship(1), // Patrol Boat
];
// Place a ships randomly on the gameboard
human.gameboard.palceShipsRandomly(shipsForHuman);
computer.gameboard.palceShipsRandomly(shipsForComputer);
updateGameBoard(human);
updateGameBoard(computer);

const startGameBtn = document.querySelector('#StartGameBtn');
let turn = 'humanTurn'; // Track whose turn it is

// Start the game
startGameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  startGameBtn.setAttribute('disabled', false);
  console.log('Game started!');
  humanTurn(); // Start with the human's turn
});

function humanTurn() {
  if (turn !== 'humanTurn') return; // Ensure it's the human's turn

  const cellBoard = document.querySelectorAll('.enemyCell');

  console.log('Your Turn');
  cellBoard.forEach((cell) => {
    cell.removeEventListener('click', handleHumanClick); // Ensure no duplicate listeners
    cell.addEventListener('click', handleHumanClick);
  });
}

// Handle the human player's click
function handleHumanClick(event) {
  const cell = event.target;

  if (
    // eslint-disable-next-line operator-linebreak
    cell.classList.contains('attacked') ||
    cell.classList.contains('missed')
  ) {
    console.log('You already attacked this cell');
    return; // Ignore clicks on previously attacked cells
  }

  const attackCoordinates = {
    x: parseInt(cell.dataset.x, 10),
    y: parseInt(cell.dataset.y, 10),
  };

  if (computer.gameboard.isAttacked(attackCoordinates)) {
    console.log(`Attacked [${cell.dataset.x}, ${cell.dataset.y}] coordinates.`);
    const attackResult = human.sendAttack(computer, attackCoordinates);
    updateGameBoard(computer);

    if (attackResult) {
      cell.classList.add('attacked');
      console.log('You hit a ship!');
    } else {
      cell.classList.add('missed');
      console.log('You missed!');
    }

    checkGameOver(); // Check if the game is over

    if (turn !== false) {
      // Only switch turns if the game isn't over
      turn = 'computerTurn'; // End human's turn
      computerTurn(); // Trigger computer's turn
    }
  }
}

function computerTurn() {
  if (turn !== 'computerTurn') return; // Ensure it's the computer's turn

  console.log('Computer player turn');

  setTimeout(() => {
    let successfullyTurned = false;
    while (!successfullyTurned) {
      const attackCoordinates = getRandomCoordinates();
      if (human.gameboard.isAttacked(attackCoordinates)) {
        console.log(
          `Computer attacked [${attackCoordinates.x}, ${attackCoordinates.y}].`,
        );

        const attackResult = computer.sendAttack(human, attackCoordinates);

        successfullyTurned = true;
        if (attackResult) {
          console.log('Computer hit a ship!');
        } else {
          console.log('Computer missed!');
        }

        updateGameBoard(human);
        checkGameOver(); // Check if the game is over

        if (turn !== false) {
          // Only switch turns if the game isn't over
          turn = 'humanTurn'; // Switch back to human's turn
          humanTurn(); // Trigger human's turn
        }
      }
    }
  }, 700); // Delay to simulate computer thinking
}

function checkGameOver() {
  if (computer.gameboard.reportAllShipsSunk()) {
    turn = false; // Stop the game
    console.log('You win!');
  } else if (human.gameboard.reportAllShipsSunk()) {
    turn = false; // Stop the game
    console.log('Computer wins!');
  }
}
