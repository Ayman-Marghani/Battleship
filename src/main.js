// JS modules
import Player from './modules/player';
import {
  initialRender,
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
  addEventListenerChangeAxisFirstBoard,
  addEventListenerChangeAxisSecondBoard,
  removeEventListenerChangeAxisFirstBoard,
  removeEventListenerChangeAxisSecondBoard,
  addEventListenerRandomizeFirstBoard,
  addEventListenerRandomizeSecondBoard,
  removeEventListenerRandomizeFirstBoard,
  removeEventListenerRandomizeSecondBoard,
  isCellEmptyOrShip,
  replaceCellClass,
} from './modules/DOMFunctions';
// CSS styles file
import './styles.css';

// Global variables
const p1 = new Player(false, "P1");
const p2 = new Player(false, "P2");
let currentPlayer = p1.name;

// Helper functions
// Returns the x and y coordinates of a cell based on its index.
function getCellCoordinates(cell) {
  // Get index of cell
  const index = Number(cell.getAttribute('index'));
  // Calc x and y coordinates
  const x = Math.floor(index / 10);
  const y = index % 10;
  return [x, y];
}

// # Main functions
// ## Game flow functions
function initGame() {
  // Remove all cells in the game boards
  removeBoardsCells();
  // Render empty boards
  initialRender();
  // First player place ships
  placeFirstPlayerShips();
}

function continueGame() {
  removeEventListenerChangeAxisSecondBoard(handleChangeAxis(p2));
  removeEventListenerRandomizeSecondBoard(handleRandomize(p2));
  removeEventListenerSecondBoard(handleSecondPlayerPlaceShip);
  // Add Attack event listeners for each board
  addEventListenerSecondBoard(handleFirstPlayerAttack);
  addEventListenerFirstBoard(handleSecondPlayerAttack);

  // Hide second board and show first board
  setTimeout(hideSecondBoard, 1000);
  showFirstBoard();

  // Display current player turn
  renderPlayerBanner(`${currentPlayer}'s turn`);
}

function switchPlayerTurn(nextPlayerName) {
  // change global variable
  currentPlayer = nextPlayerName;
  // change player turn banner
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

function endGame(winningPlayerName) {
  renderPlayerBanner(`${winningPlayerName} Won!`);
  // Remove event listener for all boards
  removeEventListenerSecondBoard(handleFirstPlayerAttack);
  removeEventListenerFirstBoard(handleSecondPlayerAttack);
}

// ## Player attack functions
function handlePlayerAttack(attacker, attackedPlayer) {
  return (event) => {
    // Make sure it's current player turn
    if (currentPlayer !== attacker.name) {
      return;
    }
    const curCell = event.target;
    // make sure it's an empty or ship cell
    if (isCellEmptyOrShip(curCell)) {      
      // Get x and y coordinates
      const [x, y] = getCellCoordinates(curCell);
      // Attack second board
      const isHit = attackedPlayer.receiveAttack(x, y);
      if (isHit) { // Hit case
        // replace ship class with hit class
        replaceCellClass(curCell, 'ship', 'hit');
        if (attackedPlayer === p1) {
          renderFirstBoard(p1);
        }
        else {
          renderSecondBoard(p2);
        }
      }
      else { // Miss case
        // replace empty class with miss class
        replaceCellClass(curCell, 'empty', 'miss');
        // change turn
        switchPlayerTurn(attackedPlayer.name);
      }
      // check if game ended
      if (attackedPlayer.isLoser()) {
        // call End game function 
        endGame(attacker.name);
      }
    }
  };
}
const handleFirstPlayerAttack = handlePlayerAttack(p1, p2);
const handleSecondPlayerAttack = handlePlayerAttack(p2, p1);

// ## Ships placement functions
function placeFirstPlayerShips() {
  // TODO: render ships on the side of first board

  // First player turn to place Ships
  renderPlayerBanner(`${p1.name}'s turn to place ships`);
  addEventListenerFirstBoard(handleFirstPlayerPlaceShip);
  // Event listener for change axis and randomize buttons
  addEventListenerChangeAxisFirstBoard(handleChangeAxis(p1));
  addEventListenerRandomizeFirstBoard(handleRandomize(p1));
}

function placeSecondPlayerShips() {
  // TODO: render ships on the side of second board

  // Hide first board from the second player
  setTimeout(hideFirstBoard, 1000);
  removeEventListenerFirstBoard(handleFirstPlayerPlaceShip);
  removeEventListenerChangeAxisFirstBoard(handleChangeAxis(p1));
  removeEventListenerRandomizeFirstBoard(handleRandomize(p1));
  // Second player turn to place Ships
  renderPlayerBanner(`${p2.name}'s Place Ships`);
  addEventListenerSecondBoard(handleSecondPlayerPlaceShip);
  // Event listener for change axis and randomize buttons
  addEventListenerChangeAxisSecondBoard(handleChangeAxis(p2));
  addEventListenerRandomizeSecondBoard(handleRandomize(p2));
}

function handlePlaceShip(playerObj) {
  return (event) => {
    // Get the clicked cell and get its coordinates
    const curCell = event.target;
    const [x, y] = getCellCoordinates(curCell);
    // Place the ship in the clicked cell
    const isShipPlaced = playerObj.placeShip(x, y) 
    if (isShipPlaced) {
      // Render current player board
      if (playerObj === p1) {
        renderFirstBoard(p1);
      }
      else {
        renderSecondBoard(p2);
      }
      // TODO: remove placed ship from UI
    }
    else {
      // Display ship placement error
      // TODO: displayShipPlacementError();
      console.log("CAN NOT place ship in this position");
    }
    // If all ships are placed start the game
    if (playerObj.isAllShipsPlaced()) {
      if (playerObj === p1) {
        placeSecondPlayerShips();
      }
      else {
        continueGame();
      } 
    }
  };
}
const handleFirstPlayerPlaceShip = handlePlaceShip(p1);
const handleSecondPlayerPlaceShip = handlePlaceShip(p2);

// ### Handle change axis and randomize buttons functions
function handleChangeAxis(playerObj) {
  return () => {
    playerObj.changeShipAxis();
  }
}

function handleRandomize(playerObj) {
  return () => {
    playerObj.randomizeShips();
  }
}


// Start the game
initGame();



