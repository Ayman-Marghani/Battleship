// JS modules
import Player from './modules/player';
import {
  renderBanner,
  initialRender,
  resetDOM,
  renderGameModeScreen,
  renderPlayerNamesFormScreen,
  renderGameScreen,
  renderSideShipsFirst,
  renderSideShipsSecond,
  changeSideShipsAxisFirst,
  changeSideShipsAxisSecond,
  renderFirstBoard,
  renderSecondBoard,
  hideFirstBoard,
  hideSecondBoard,
  showFirstBoard,
  showSecondBoard,
  hideShipPlacementBtns,
} from './modules/DOMFunctions';
import {
  addEventListenersFirstBoard,
  removeEventListenersFirstBoard,
  addEventListenersSecondBoard,
  removeEventListenersSecondBoard,
  addEventListenersForAttack,
  removeEventListenersForAttack,
} from './modules/eventListeners';
import {
  isCellEmptyOrShip,
  replaceCellClass,
} from './modules/boardCellFunctions';
// CSS styles file
import './styles.css';

// Global variables
let computerMode = null;
let curPlayer = null;
let firstPlayer = null;
let secondPlayer = null;

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
function startNewGame() {
  // Reset global variables
  computerMode = null;
  curPlayer = null;
  firstPlayer = null;
  secondPlayer = null;
  // TODO: reset DOM

  renderGameModeScreen();
}

function initGameScreen() {
  // TODO: render game Screen
  renderGameScreen();
  // First player place ships
  placeFirstPlayerShips();
}
function continueGameAfterShipsPlacement() {
  // Remove second board event Listeners
  removeEventListenersSecondBoard(handleSecondPlayerPlaceShip, handleChangeAxis(secondPlayer), handleRandomize(secondPlayer));
  // Remove ship placement buttons
  hideShipPlacementBtns();
  // Render Second board
  renderSecondBoard(secondPlayer);
  // Hide second board and show first board
  setTimeout(() => {
    hideSecondBoard();
    showFirstBoard();
    // Display current player turn
    renderBanner(`${curPlayer}'s turn`);
    // Add Attack event listeners for each board
    addEventListenersForAttack(handleFirstPlayerAttack, handleSecondPlayerAttack);
  }, 1000);
}
function switchPlayerTurn(nextPlayerName) {
  // change global variable
  curPlayer = nextPlayerName;
  // change player turn banner
  renderBanner(`${curPlayer}'s turn`);

  if (curPlayer === firstPlayer.name) {
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
  renderBanner(`${winningPlayerName} Won!`);
  // TODO: show play again button
  // addEventListener for play again button
  // write handlePlayAgainClick
    // remove eventlistener for play again button
    // start the game again
  // Remove attack event listener for all boards
  removeEventListenersForAttack(handleFirstPlayerAttack, handleSecondPlayerAttack);
}

// ## Game mode screen functions
function handleGameModeClick() {
  return (event) => {
    computerMode = event.target.classlist.contains('computer-mode-btn');
    // TODO: removeEventListenerGameModeBtns();
    renderPlayerNamesFormScreen(computerMode);
    // TODO: addEventListnerPlayerNamesForm 
  };
}

function handlePlayerNamesFormSubmit() {
  return (event) => {
    // TODO: getFirstPlayerName();
    // init firstPlayer
    if (computerMode) {
      // TODO: init second player
      // Player(true);
    }
    else {
      // TODO: getSecondPlayerName();
      // init second player
    }
    // TODO: removeEventListnerPlayerNamesForm 
    // initGameScreen
  };
}

// ## Player attack functions
function handlePlayerAttack(attacker, attackedPlayer) {
  return (event) => {
    // Make sure it's current player turn
    if (curPlayer !== attacker.name) {
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
        if (attackedPlayer === firstPlayer) {
          renderFirstBoard(firstPlayer);
        }
        else {
          renderSecondBoard(secondPlayer);
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
const handleFirstPlayerAttack = handlePlayerAttack(firstPlayer, secondPlayer);
const handleSecondPlayerAttack = handlePlayerAttack(secondPlayer, firstPlayer);

// ## Ships placement functions
function placeFirstPlayerShips() {
  // First player turn to place Ships
  renderBanner(`${firstPlayer.name}'s turn to place ships`);
  // Event listener for first board
  addEventListenersFirstBoard(handleFirstPlayerPlaceShip, handleChangeAxis(firstPlayer), handleRandomize(firstPlayer));
}
function placeSecondPlayerShips() {
  // Remove first board event Listeners
  removeEventListenersFirstBoard(handleFirstPlayerPlaceShip, handleChangeAxis(firstPlayer), handleRandomize(firstPlayer));
  // Render First board
  renderFirstBoard(firstPlayer);
  // Hide first board from the second player
  setTimeout( () => {
    hideFirstBoard();
    // Second player turn to place Ships
    renderBanner(`${secondPlayer.name}'s Place Ships`);
    // Event listener for second board
    addEventListenersSecondBoard(handleSecondPlayerPlaceShip, handleChangeAxis(secondPlayer), handleRandomize(secondPlayer));
  }, 1000);
}
function handlePlaceShip(playerObj) {
  return (event) => {
    // Get the clicked cell and get its coordinates
    const curCell = event.target;
    const [x, y] = getCellCoordinates(curCell);
    // Place the ship in the clicked cell
    const isShipPlaced = playerObj.placeShip(x, y) 
    if (isShipPlaced) {
      // Render current player board and rerender ships on the side
      if (playerObj === firstPlayer) {
        renderFirstBoard(firstPlayer);
        renderSideShipsFirst(firstPlayer.getIsShipPlacedArr());
      }
      else {
        renderSecondBoard(secondPlayer);
        renderSideShipsSecond(secondPlayer.getIsShipPlacedArr());
      }
    }
    else {
      // Display ship placement error
      renderBanner("Invalid Placement! Try Again");
    }
    // If all ships are placed start the game
    if (playerObj.isAllShipsPlaced()) {
      if (playerObj === firstPlayer) {
        placeSecondPlayerShips();
      }
      else {
        continueGameAfterShipsPlacement();
      } 
    }
  };
}
const handleFirstPlayerPlaceShip = handlePlaceShip(firstPlayer);
const handleSecondPlayerPlaceShip = handlePlaceShip(secondPlayer);

// ### Handle change axis and randomize buttons functions
function handleChangeAxis(playerObj) {
  return () => {
    playerObj.changeShipAxis();
    if (playerObj === firstPlayer) {
      changeSideShipsAxisFirst();
    }
    else {
      changeSideShipsAxisSecond();
    }
  }
}
function handleRandomize(playerObj) {
  return () => {
    playerObj.randomizeShips();
    if (playerObj === firstPlayer) {
      renderSideShipsFirst(firstPlayer.getIsShipPlacedArr());
      placeSecondPlayerShips();
    }
    else {
      renderSideShipsSecond(secondPlayer.getIsShipPlacedArr());
      continueGameAfterShipsPlacement();
    } 
  };
}

// Initial render for creating board cells and ships on the side
initialRender();
// Start the game
startNewGame();