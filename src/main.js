// JS modules
import Player from './modules/player';
import {
  renderPlayerBanner,
  removeBoardsCells,
  renderFirstBoard,
  renderSecondBoard,
  hideFirstBoard,
  hideSecondBoard,
  showFirstBoard,
  showSecondBoard,
  addEventListenerFirstBoard,
  addEventListenerSecondBoard,
  removeEventListenerFirstBoard,
  removeEventListenerSecondBoard,
  isCellEmptyOrShip,
  replaceCellClass,
} from './modules/DOMFunctions';
// CSS styles file
import './styles.css';

// global variables
const p1 = new Player(false, "P1");
const p2 = new Player(false, "P2");
let currentPlayer = p1.name;

//  functions
function endGame(winningPlayerName) {
  renderPlayerBanner(`${winningPlayerName} Won!`);
  removeEventListenerSecondBoard(handleFirstPlayerAttack);
  removeEventListenerFirstBoard(handleSecondPlayerAttack);
}

function changeTurn(nextPlayerName) {
  // change global variable
  currentPlayer = nextPlayerName;
  // change banner
  renderPlayerBanner(`${currentPlayer}'s turn`);

  if (currentPlayer === p1.name) {
    // show next player board
    showFirstBoard(); 
    // hide other player board
    hideSecondBoard();
  }
  else {
    // show next player board 
    showSecondBoard();
    // hide other player board
    hideFirstBoard();
  }
}

function handleAttack(attacker, attackedPlayer) {
  return (event) => {
    // Make sure it's current player turn
    if (currentPlayer !== attacker.name) {
      return;
    }
    const curCell = event.target;
    // make sure it's an empty or ship cell
    if (isCellEmptyOrShip(curCell)) {      
      // get index of cell
      const index = Number(curCell.getAttribute('index'));
      // calc x and y coordinates
      const x = Math.floor(index / 10);
      const y = index % 10;
      // Attack second board
      const isHit = attackedPlayer.receiveAttack(x, y);
      if (isHit) { // Hit case
        // replace ship class with hit class
        replaceCellClass(curCell, 'ship', 'hit');
      }
      else { // Miss case
        // replace empty class with miss class
        replaceCellClass(curCell, 'empty', 'miss');
        // change turn
        changeTurn(attackedPlayer.name);
      }
      // check if game ended
      if (attackedPlayer.isLoser()) {
        // call End game function 
        endGame(attacker.name);
      }
    }
  };
}

const handleFirstPlayerAttack = handleAttack(p1, p2);
const handleSecondPlayerAttack = handleAttack(p2, p1);

function startGame() {
  // Add event listeners 
  addEventListenerSecondBoard(handleFirstPlayerAttack);
  addEventListenerFirstBoard(handleSecondPlayerAttack);
  // Remove all cells in game boards
  removeBoardsCells();
  // Render game boards
  renderFirstBoard(p1);
  renderSecondBoard(p2);

  // Hide second board and show first board
  hideSecondBoard();
  showFirstBoard();

  // Display current player turn
  renderPlayerBanner(`${currentPlayer}'s turn`);
}
// Start the game
startGame();



