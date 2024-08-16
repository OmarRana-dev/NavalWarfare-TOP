export const updateGameBoard = (player) => {
  // Update the game boards on the webpage
  const humanBoard = document.getElementById('yourBoard');
  const computerBoard = document.getElementById('enemyBoard');

  if (player.type === 'real') {
    humanBoard.innerHTML = '';
  } else if (player.type === 'computer') {
    computerBoard.innerHTML = '';
  }

  // console.log('Game board updated');

  player.gameboard.board.forEach((cell) => {
    const cellDiv = document.createElement('div');

    const coordinate = { x: cell.x, y: cell.y };

    if (cell.ship) {
      cellDiv.classList.add('ship');
    }
    if (
      player.gameboard.attacked.some(
        (hit) => hit.x === coordinate.x && hit.y === coordinate.y,
      )
    ) {
      // console.log('attacked cell already');
      cellDiv.classList.add('attacked');
    }
    if (
      player.gameboard.missedAttacks.some(
        (missed) => missed.x === coordinate.x && missed.y === coordinate.y,
      )
    ) {
      // console.log('missed cell already');
      cellDiv.classList.add('missed');
    }
    cellDiv.dataset.x = cell.x;
    cellDiv.dataset.y = cell.y;

    if (player.type === 'real') {
      cellDiv.classList.add('yourCell');
      humanBoard.appendChild(cellDiv);
    }
    if (player.type === 'computer') {
      cellDiv.classList.add('enemyCell');
      computerBoard.appendChild(cellDiv);
    }
  });
};
